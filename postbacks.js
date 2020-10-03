// Function to handle the Postbacks //
const callSendAPI = require("./callSendAPI"),
req_data = require("./req_data");

module.exports = async (sender_psid, webhook_event) => {
  payload = webhook_event.postback.payload;

  // If the payload is get started (first entry for all)
  if (payload === "GET_STARTED"){
    console.log(webhook_event);
    // Get and send the response with user name
    data = req_data(sender_psid);
    response = { "text":"test"};
    action = null;
    await callSendAPI(sender_psid, response);
  } 
}
