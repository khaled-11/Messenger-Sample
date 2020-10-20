// Function to handle Text Messages
const fs = require("fs"),
callSendAPI = require("./callSendAPI"),
convertAudio = require("./convert_audio"),
readAudio = require("./read_audio"),
postSpeech = require("./wit_post_speech"),
witResolve = require("./wit_resolve");

module.exports = async (sender_psid, webhook_event) => {
  // Sending Read and typing effects before we get the responses.
  await senderEffect(sender_psid, "mark_seen");
  await senderEffect(sender_psid, "typing_on");

  // Get the Intents responses from the config file to use.
  var appResponses = (JSON.parse(fs.readFileSync('./config.json', {encoding:'utf8', flag:'r'}))).intents; 
  
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
  // If not, get the user data from the JSON file.
  } else {
    var userData = require(`./users/${sender_psid}_data.json`);
  }
  
  // If the event is text message.
  if (webhook_event.message.text){
    // Get the NLP from the Wit App.
    var myNLP = await witResolve(webhook_event.message.text);
  }
  
  // If the event is attachment
  else if (webhook_event.message.attachments){
    // Get the attachment URL to use to request the data.
    attachmentUrl = webhook_event.message.attachments[0].payload.url;
    // If the attachment is "MP4" which will have audio.
    if (attachmentUrl.includes("mp4")){
      // Read the Audio File, and sleep before we open the filw again.
      read = await readAudio(`${sender_psid}`, attachmentUrl);
      await sleep(1500);
      // Call function to convert this audio file to "MP3" format.
      convert = await convertAudio(`${sender_psid}`);
      await sleep(1500);
      // Send the "MP3" file to Wit App to get text.
      witSpeech = await postSpeech(`${sender_psid}`);
      // If the request was not successful.
      if(!witSpeech){
        // Get the error message and send it to the user.
        response = appResponses.voice_read_error.response;
        var action = null;
        fileN = null;
        // Variable to terminate future error messages.
        var ch = true;
        await callSendAPI(sender_psid, response, action, fileN);
        // If the request was successful, but there is no text.
      } else if(!witSpeech.text){
        response = appResponses.no_sound.response
        var action = null;
        fileN = null;
        var ch = true;
        await callSendAPI(sender_psid, response, action, fileN);
        // If the request was successful, and there is text.
      } else if (witSpeech.text){
        // If there is text, and everything was okay!
        if (!witSpeech.text.includes("the voice is not set up yet")){
          var myNLP = await witResolve(witSpeech.text);
        // If it is the blank file which Wit App will read if no files.
        } else {
            response = appResponses.setup_needed.response
            var action = null;
            fileN = null;
            var ch = true;
            await callSendAPI(sender_psid, response, action, fileN);
        }
      } 
    // If the user send any message not in "MP4" format.
    } else {
      response = appResponses.non_audio.response
      var action = null;
      fileN = null;
      var ch = true;
      await callSendAPI(sender_psid, response, action, fileN);
    }
  }

  // If there NLP response from the Wit App
  if (myNLP){
    // If the Wit App identifies an Intent.
    if (myNLP.intents[0]){
      // Get the intent name to search responses.
      var intentName = await myNLP.intents[0].name;
      // If it is an intent without entity
      if (appResponses[intentName] && appResponses[intentName].responses){
        // Loop over the response in the config file to send multiple reponses if any.
        for ( i = 0 ; i < appResponses[intentName].responses.length ; i++){
          // Send sender effect before each message.
          await senderEffect(sender_psid, "typing_on");
          // If the response is text or quick replies.
          if (appResponses[intentName].responses[i].response.text){
            // Check if the message contains user first name and replace.
            if (appResponses[intentName].responses[i].response.text.includes("{{user_first_name")){
              var display_message = appResponses[intentName].responses[i].response;
              display_message.text = display_message.text.replace("{{user_first_name}}",`${userData.first_name}`);
              fileN  = null;
            // If the response does not have the user first name
            } else {
              var display_message = appResponses[intentName].responses[i].response;
              fileN  = null;
            }
          // If the response is an attachment or template.
          } else if (appResponses[intentName].responses[i].response.attachment){
            display_message = appResponses[intentName].responses[i].response;
            fileN = null;
          // If the response is file from the server.
          } else {
            display_message  = null;
            var fileN = appResponses[intentName].responses[i].response.file;
          }
          // Sending the response.
          var action = null;
          await callSendAPI(sender_psid, display_message, action, fileN);
        }
      }

      // If it is intent with entity
      else if (appResponses[intentName] && appResponses[intentName].entities){
        // Loop over the entities to check for the entity type.
        // This is extra step to catch missing configuration errors.
        for ( i = 0 ; i < appResponses[intentName].entities.length; i++){
          check = appResponses[intentName].entities[i].entity;
          // If this entity name matches the NLP response.
          if (myNLP.entities[`${check}:${check}`]){
            // Terminate the loop
            i = appResponses[intentName].entities.length + 1;
            // Loop over the entities again to get this entity name
            for ( p = 0 ; p < appResponses[intentName].entities.length ; p ++){
              // If this is the matching entity name.
              if (myNLP.entities[`${check}:${check}`][0].value.includes(appResponses[intentName].entities[p].name) || appResponses[intentName].entities[p].name.includes(myNLP.entities[`${check}:${check}`][0].value)){
                // Loop over the response in the config file to send multiple reponses if any.
                for ( j = 0 ; j < appResponses[intentName].entities[p].responses.length ; j++){
                  // Send sender effect before each message.
                  state = await senderEffect(sender_psid, "typing_on");
                  // Check if the message contains user first name and replace.
                  // As before... Will update to have global function for responses!
                  if (appResponses[intentName].entities[p].responses[j].response.text){
                    if (appResponses[intentName].entities[p].responses[j].response.text.includes("{{user_first_name")){
                      display_message = appResponses[intentName].entities[p].responses[j].response;
                      display_message.text = display_message.text.replace("{{user_first_name}}",`${userData.first_name}`);
                      fileN  = null;
                    } else {
                      display_message = appResponses[intentName].entities[p].responses[j].response;
                      fileN  = null;
                    }
                  } 
                  else if(appResponses[intentName].entities[p].responses[j].response.attachment){
                    display_message = appResponses[intentName].entities[p].responses[j].response;
                    fileN  = null;
                  }
                  else {
                    display_message  = null;
                    var fileN = appResponses[intentName].entities[p].responses[j].response.file;
                  }
                  // Sending the response.
                  var action = null;
                  await callSendAPI(sender_psid, display_message, action, fileN);
                }
                // boolean to terminate any future responses.
                var zCheck = true;
                // Terminate the loop
                p = appResponses[intentName].entities.length + 1;
              // If the entity name is not in the configuration file.
              } else {
                var error_message = appResponses[intentName].entity_not_in_config_errors;
                if (error_message.text && error_message.text.includes("{{user_first_name")){
                  error_message.text = error_message.text.replace("{{user_first_name}}",`${userData.first_name}`);
                }
                var action = null;
                // This case will send error.
                var zCheck = false;
              }
            }
          }
          // If the entity type is not in the configuration file.
          else{
            if (i = appResponses[intentName].entities.length){
              var error_message = appResponses[intentName].entity_type_not_found_error;
              var action = null;
              var zCheck = false;
          }}
        }
        // Send the error message
        if(error_message && zCheck == false){
          await callSendAPI(sender_psid, error_message, action, action);
        }
      }

      // If the intent was not found in the configuration file.
      else {
        var error_message = appResponses.Intent_not_found_error.responses.response;
        error_message.text = error_message.text.replace("{{user_first_name}}",`${userData.first_name}`);
        var action = null;
        await callSendAPI(sender_psid, error_message, action, action);
      }
    }

    // If there is no intent in the NLP response
    else {
      for(u = 0  ; u < appResponses.out_of_scope.responses.length ; u++){
        response = appResponses.out_of_scope.responses[u].response;
        if (response.text){
          if (response.text.includes("{{user_first_name}}") || response.text.includes("{{text}}")){
            response.text = response.text.replace("{{user_first_name}}",`${userData.first_name}`);
            response.text = response.text.replace("{{text}}",`${myNLP.text}`);
            display_message = response;
            fileN = null;
          } else {
            display_message = response;
            fileN = null;
          }
        } else if (response.attachment){
          display_message = response;
          fileN = null;
        } else {
          display_message  = null;
          fileN = response.file;
        }
        var action = null;
        await callSendAPI(sender_psid, display_message, action, fileN);
      }
    }

  // If there is no NLP response.
  } else {
    // If we didn't send an error message in the audio section.
    if (ch != true){
      response = appResponses.technical_issue.response;
      var action = null;
      fileN = null;
      await callSendAPI(sender_psid, response, action, fileN);
    }

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