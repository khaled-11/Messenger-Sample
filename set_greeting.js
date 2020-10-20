/// Function to set the Greeting Message ///
const rp = require('request-promise'),
fs = require("fs");

module.exports = async (msg) => {
  var results;
  try{
    var options = {
      method: 'POST',
      uri: `https://graph.facebook.com/v8.0/me/messenger_profile?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
      body: {"greeting":[{"locale":"default",
      "text":msg
      }]},
      json: true
    };
    results = await rp(options);
  }
  catch (e){
    console.log(e.message);
  }
  console.log("Greeting: ", results)
  return results;  
};