/// Function to setup the App callback URL ///
const request = require('request');

module.exports = async () => {
  request(
    {
      uri: `https://graph.facebook.com/v7.0/${process.env.APP_ID}/subscriptions`,
      qs: {
        access_token: `${process.env.APP_ID}|${process.env.APP_SECRET}`,
        object: "page",
        callback_url: `${process.env.URL}/webhook`,
        verify_token: process.env.VERIFY_TOKEN,
        include_values: "true"
      },
      method: "POST"
    },
    (error, _res, body) => {
      if (!error) {
        console.log("Callback URL:", body);
        console.log(`Check your App at: https://m.me/${process.env.PAGE_ID}`)
      } else {
        console.error("Callback URL have issues:", error);
      }
    }
  );
}