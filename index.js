const express = require('express'),
bodyParser = require('body-parser'),
fs = require("fs"),
path = require("path"),
http = require("http"),
subscribePage = require('./page_subscribe'),
setUpCallbackURL = require('./messenger_setup'),
handlePostbacks = require('./handle_postbacks'),
handleMessages = require('./handle_messages'),
setGetStarted = require('./get_started'),
setPersistentMenu = require('./persistent_menu'),
whiteListURL = require('./whitelist_domain'),
setGreeting = require('./set_greeting');
require('dotenv').config();

// Create App object in epress and use bodyparser to read the webhook body.
app = express(); app.use(bodyParser.json());

// Setting Views & Public Files folders. 
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Using EJS engine to render pages.
app.set("view engine", "ejs");

// Reading greeting messages in the config file and setup the Messenger App.
const appConfig = (JSON.parse(fs.readFileSync('./config.json', {encoding:'utf8', flag:'r'}))).greetings; 

// Ping the App to keep Glitch awake.
setInterval(() => {
  http.get(`http://${process.env.URL.substring(8)}/`);
}, 88000);

// Calling ASYNC function to Setup the App in order.
appStart();
async function appStart(){
// Activate Get Started Button and subscribe the page to App & Events.
await setGetStarted();
await subscribePage();
// Set the Greeting Message.
await setGreeting(appConfig.greeting);
// Whitelist the App domain to send attachments.
await whiteListURL();
// Set the persistent menu
await setPersistentMenu();
// Set Callback URL
await setUpCallbackURL();
}

var i = 0;
// The landing page for the server
app.get("/", function (req, res){
  i++;
  // Send Index Page with greeting message for web plugin
  res.render("index",{web_greeting_logged_in:appConfig.web_greeting_logged_in, web_greeting_logged_out:appConfig.web_greeting_logged_out})
});

///////////////////////////////////////////////////////
/// Webhook Endpoint For the Facebook Messenger App ///
///////////////////////////////////////////////////////
app.post('/webhook', (req, res) => {  
    let body = req.body;
    if (body.object === 'page') {
      // Iterates over each entry - there may be multiple if batched
      body.entry.forEach(function(entry) {
      // Gets the body of the webhook event
      if(entry.messaging){
        webhook_event = entry.messaging[0];
        // Get the sender PSID
        let sender_psid = webhook_event.sender.id;
        // Pass the event to handlePostBack function if Quick Reply or Postback.
        // Otherwise, pass the event to handleMessage function.
        if (webhook_event.message && !webhook_event.message.quick_reply) {
            // Calling Function to handle Messages.
            handleMessages(sender_psid, webhook_event);  
        } else {
            // Calling Function to handle Postbacks
            handlePostbacks(sender_psid, webhook_event);
        }
      }});
    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  });
  
  // Adds support for GET requests to the webhook
  app.get('/webhook', (req, res) => {    
    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];      
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
      // Checks the mode and token sent is correct
      if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {   
        // Responds with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);  
      } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
      }
    }
  });
  
// listen for webhook events //
app.listen(process.env.PORT || 3370, () => console.log('webhook is listening'));
