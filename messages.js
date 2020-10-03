// Function to handle Text Messages
const callSendAPI = require("./callSendAPI");

module.exports = async (sender_psid, webhook_event) => {
  console.log(webhook_event)
      response = {"text": webhook_event.message.text};
      action = null;
      await callSendAPI(sender_psid, response);   

  }