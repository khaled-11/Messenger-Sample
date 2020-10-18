// Function to handle Text Messages
const fs = require("fs"),
callSendAPI = require("./callSendAPI"),
convertAudio = require("./convert_audio"),
readAudio = require("./read_audio"),
postSpeech = require("./wit_post_speech"),
witResolve = require("./wit_resolve");

module.exports = async (sender_psid, webhook_event) => {
  // Sending Read and typing effects.
  await senderEffect(sender_psid, "mark_seen");
  await senderEffect(sender_psid, "typing_on");
  // Get the postback responses from the config file.
  var appResponses = (JSON.parse(fs.readFileSync('./config.json', {encoding:'utf8', flag:'r'}))).intents; 
  var userData = require(`./users/${sender_psid}_data.json`);

  if (webhook_event.message.text){
    var myNLP = await witResolve(webhook_event.message.text);
  } else if (webhook_event.message.attachments){
    attachmentUrl = webhook_event.message.attachments[0].payload.url;
      if (attachmentUrl.includes("mp4")){
        read = await readAudio(`${sender_psid}`, attachmentUrl);
        await sleep(2000);
        convert = await convertAudio(`${sender_psid}`);
        await sleep(1000);
        witSpeech = await postSpeech(`${sender_psid}`);
        if(!witSpeech.text){
          response = {"text": "I didn't hear any words"}
          var action = null;
          await callSendAPI(sender_psid, response, action, action);
        } else if (witSpeech.text && !witSpeech.text.includes("the voice is not set up yet")){
          var myNLP = await witResolve(witSpeech.text);
        } else if (witSpeech.text) {
          response = {"text": "The voice is not set up properly!"}
          var action = null;
          await callSendAPI(sender_psid, response, action, action);
        }
      } else {
        response = {"text": "we accept only voice"}
        var action = null;
        await callSendAPI(sender_psid, response, action, action);
      }
    }
  // Get the intent from Wit App
  if (myNLP){
  if (myNLP.intents[0]){
    var intentName = await myNLP.intents[0].name;
    if (appResponses[intentName] && appResponses[intentName].responses){
      // Loop over the response in the config file to send multiple reponses if any.
      for ( i = 0 ; i < appResponses[intentName].responses.length ; i++){
        // Send sender effect before each message.
        await senderEffect(sender_psid, "typing_on");
        // Check if the message contains user first name and replace.
        var display_message = appResponses[intentName].responses[i].response;
        if (appResponses[intentName].responses[i].response.text && appResponses[intentName].responses[i].response.text.includes("{{user_first_name")){
          display_message.text = display_message.text.replace("{{user_first_name}}",`${userData.first_name}`);
        }
        // Sending the response.
        var action = null;
        await callSendAPI(sender_psid, display_message, action, action);
      }
    }
    else if (appResponses[intentName] && appResponses[intentName].entities){
      for ( i = 0 ; i < appResponses[intentName].entities.length; i++){
        check = appResponses[intentName].entities[i].entity;
        if (myNLP.entities[`${check}:${check}`]){
          i = appResponses[intentName].entities.length + 1;
          for ( p = 0 ; p < appResponses[intentName].entities.length ; p ++){
            if (myNLP.entities[`${check}:${check}`][0].value.includes(appResponses[intentName].entities[p].name) || appResponses[intentName].entities[p].name.includes(myNLP.entities[`${check}:${check}`][0].value)){
              // Loop over the response in the config file to send multiple reponses if any.
              for ( j = 0 ; j < appResponses[intentName].entities[p].responses.length ; j++){
                // Send sender effect before each message.
                state = await senderEffect(sender_psid, "typing_on");
                // Check if the message contains user first name and replace.
                display_message = appResponses[intentName].entities[p].responses[j].response
                if (display_message.text && display_message.text.includes("{{user_first_name")){
                  display_message.text = display_message.text.replace("{{user_first_name}}",`${userData.first_name}`);
                }
                /// Sending the response.
                var action = null;
                await callSendAPI(sender_psid, display_message, action, action);
              }
              p = appResponses[intentName].entities.length + 1;
              i = appResponses[intentName].entities.length + 1;
            } else {
              var error_message = appResponses[intentName].not_in_config_errors;
              if (error_message.text && error_message.text.includes("{{user_first_name")){
                error_message.text = error_message.text.replace("{{user_first_name}}",`${userData.first_name}`);
              }
              var action = null;
            }
          }
        } else{
          if (i = appResponses[intentName].entities.length){
            var error_message = appResponses[intentName].type_not_found_error;
            var action = null;
        }}
        if(error_message){
          await callSendAPI(sender_psid, error_message, action, action);
        }
      }
    } else {
      var error_message = appResponses.Intent_not_found_error.responses.response;
      var userData = require(`./users/${sender_psid}_data.json`);
      error_message.text = error_message.text.replace("{{user_first_name}}",`${userData.first_name}`);
      var action = null;
      await callSendAPI(sender_psid, error_message, action, action);
    }
  } else {
    for(u = 0  ; u < appResponses.out_of_scope.responses.length ; u++){
      var response = appResponses.out_of_scope.responses[u].response;
      if (response.text && response.text.includes("{{user_first_name}}") || response.text && response.text.includes("{{text}}")){
        response.text = response.text.replace("{{user_first_name}}",`${userData.first_name}`);
        response.text = response.text.replace("{{text}}",`${myNLP.text}`);
      }
      var action = null;
      await callSendAPI(sender_psid, response, action, action);
    }}

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