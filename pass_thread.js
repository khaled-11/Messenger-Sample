// Function to pass thread control
const rp = require('request-promise');

module.exports = async (sender_psid) => {
appID = 263902037430900;
token = process.env.PAGE_ACCESS_TOKEN;
// Construct the message body
var request_body;
var state;
// Create a request Body.
request_body = {
  "recipient": {
  "id": sender_psid
  },
  "target_app_id":appID
}
 
  // Try the request after setting up the request_body.
  try{
    var options = {
      method: 'POST',
      uri: `https://graph.facebook.com/v7.0/me/pass_thread_control?access_token=${token}`,
      body: request_body,
      json: true
    };
  state = await rp(options);
  console.log(`User: ${sender_psid} moved to page inbox.`);
  }
  catch (e){
    console.log(e.message)
  }
   return state;
}