/// Function to Whitelist the domain name ///
const rp = require('request-promise');
module.exports = async () => {
// Construct the message body
var request_body;
// Create a request Body.
request_body = {
  "whitelisted_domains": [`${process.env.URL}`]
}
  // Try the request after setting up the request_body.
  try{
    var state;
    var options = {
      method: 'POST',
      uri: `https://graph.facebook.com/v7.0/me/messenger_profile?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
      body: request_body,
      json: true
    };
  state = await rp(options);
  console.log("WhiteList Domains:" , state);
  }
  catch (e){
      console.log("whitelist domains has error: ", e)
  }
   return state;
}