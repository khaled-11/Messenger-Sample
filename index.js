const express = require('express'),
bodyParser = require('body-parser');
const page_subscribe = require('./page_subscribe');
const m_setup = require('./m_setup');
const req_data = require('./req_data');
const Postbacks = require('./postbacks');
const Messages = require('./messages');
const get_started = require('./get_started');
require('dotenv').config();

app = express(); app.use(bodyParser.json());

// Calling Functions to Setup the App
m_setup();
page_subscribe();
get_started();

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
            Messages(sender_psid, webhook_event);  
        } else if (webhook_event.postback || (webhook_event.message && webhook_event.message.quick_reply)) {
            // Calling Function to handle Postbacks
            Postbacks(sender_psid, webhook_event);
        }
      }});

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  });
  
  // Adds support for GET requests to our webhook
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