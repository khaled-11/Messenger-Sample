// Function to handle the Postbacks //
const callSendAPI = require("./callSendAPI"),
fs = require ('fs'),
req_data = require("./req_data");
const pass_thread = require("./pass_thread");

module.exports = async (sender_psid, webhook_event) => {
  // Sending Read and typing effects.
  state = await senderEffect(sender_psid, "mark_seen");
  state = await senderEffect(sender_psid, "typing_on");
  // Get the postback responses from the config file.
  const appResponses = (JSON.parse(fs.readFileSync('./config.json', {encoding:'utf8', flag:'r'}))).postbacks; 
  // Check if the payload is get started from the web plugin.
  if(webhook_event.message && webhook_event.message.quick_reply){
    payload = webhook_event.message.quick_reply.payload;
  }
  else if (!webhook_event.pass_thread_control && webhook_event.postback.payload === "GET_STARTED" && webhook_event.postback.referral){
    if (webhook_event.postback.referral.source === "CUSTOMER_CHAT_PLUGIN"){
      // If the user is coming from the website.
      payload = `GET_STARTED_WEB_PLUGIN`;
    } else{
      // If the user is coming from ref Link.
      payload = `GET_STARTED_REF_${webhook_event.postback.referral.ref}`;
    }
  } else if(!webhook_event.pass_thread_control && webhook_event.postback.payload === "CS"){
    var userData = require(`./users/${sender_psid}_data.json`);
    if (userData.first_name === "Guest"){
      payload = `GUEST_TO_INBOX`;
    } else {
      await pass_thread(sender_psid);
      payload = `HANDOVER_TO_INBOX`;
    }
  } else if(webhook_event.pass_thread_control){
    payload = `HANDOVER_FROM_INBOX`;
    console.log(`User: ${sender_psid} is back from page inbox.`);
  }
   else {
    // Get the payload for postbacks and quick replies.
    payload = webhook_event.postback.payload;
  }

  // If this is the user first visit, request his data and save it.
  if (!fs.existsSync(`./users/${sender_psid}_data.json`)){
    var data = await req_data(sender_psid);
    fs.writeFile(`./users/${sender_psid}_data.json`, JSON.stringify(data), async function(err) {
      if (err) {
          return console.log(err)
      }
      console.log("The user data file was saved!")
    });
  // Sleep to make sure the file is saved.
  await sleep (800);
  }


  // Loop over the response in the config file to send multiple reponses if any.
  for ( i = 0 ; i < appResponses[payload].length ; i++){
    // Send sender effect before each message.
    state = await senderEffect(sender_psid, "typing_on");
    // Check if the message contains user first name and replace.
    display_message = appResponses[payload][i].response;
    if (appResponses[payload][i].response.text && appResponses[payload][i].response.text.includes("{{user_first_name")){
      var userData = require(`./users/${sender_psid}_data.json`);
      display_message.text = display_message.text.replace("{{user_first_name}}",`${userData.first_name}`);
    }
    // Sending the response.
    var action = null;
    await callSendAPI(sender_psid, display_message, action, action);
  }

  // Function to send Sender Effects //
  async function senderEffect(sender_psid, action_needed){
    try{
      response = null;
      action = action_needed;
      state = await callSendAPI(sender_psid, response, action, response);   
    }
    catch(e){
      throw (e);
    }
    return state;
  }
  
  // Sleep Funtion to put the App to wait //
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}