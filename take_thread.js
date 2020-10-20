//   Function to Take Thread Control   //
const rp = require('request-promise'),
firstMessages = require("./handle_messages");

module.exports = async (sender_psid) => {
token = process.env.PAGE_ACCESS_TOKEN;
// Construct the message body
var request_body;
var state;
// Create a request Body.
request_body = {
  "recipient": {
  "id": sender_psid
  }}
 
  // Try the request after setting up the request_body.
  try{
    var options = {
      method: 'POST',
      uri: `https://graph.facebook.com/v8.0/me/take_thread_control?access_token=${token}`,
      body: request_body,
      json: true
    };
  state = await rp(options);
  console.log("Took Thread Control was" , state);
  }
  catch (e){
    console.log(e.message)
  }
  console.log("user is back"); 
  return state;
}