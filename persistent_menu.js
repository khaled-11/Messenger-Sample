/// Function to set the Persistent Menu ///
const rp = require('request-promise'),
fs = require("fs");
module.exports = async () => {
  var state;
  var persistentMenu = (JSON.parse(fs.readFileSync('./config.json', {encoding:'utf8', flag:'r'}))).persistent_menu;
  for (i = 0 ; i < persistentMenu[0].call_to_actions.length ; i ++){
    if (persistentMenu[0].call_to_actions[i].url && persistentMenu[0].call_to_actions[i].url.includes("{{page_id}}")){
      persistentMenu[0].call_to_actions[i].url = persistentMenu[0].call_to_actions[i].url.replace("{{page_id}}",`${process.env.PAGE_ID}`);
    }
  }
  // Construct the message body
  var request_body;
  // Create a request Body.
  var url = `https://graph.facebook.com/v8.0//me/messenger_profile?access_token=${process.env.PAGE_ACCESS_TOKEN}`
  request_body = {"persistent_menu": persistentMenu};

  // Try the request after setting up the request_body.
  try{
    var options = {
      method: 'POST',
      uri: url,
      body: request_body,
      json: true
    };
  state = await rp(options);
  console.log("Persistent Menu" , state);
  }
  catch (e){
    console.log("Persistent menu has error",e)
  }
   return state;
}