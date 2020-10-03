/// Function to Subscribe Page to Webhook Events ///
const request = require('request');

module.exports = async () => {
  let fields =
  "messages, messaging_postbacks, messaging_optins, \
    message_deliveries, messaging_referrals";
  // Construct the message body
  var request_body;
  // Create a request Body.
  request_body = {
        access_token: process.env.PAGE_ACCESS_TOKEN,
        subscribed_fields: fields
  }
    // Try the request after setting up the request_body.
        request(
            {
                uri: `https://graph.facebook.com/v8.0/${process.env.PAGE_ID}/subscribed_apps`,
                qs: request_body,
            method: 'POST'
        },
        (error, _res, body) => {
          if (!error) {
            console.log("Subscribed App:", body);
          } else {
            console.error("Error:", error);
          }
        }
      );
    }