/// Function to Add Get Started Button for a Page ///
const request = require('request');

module.exports = async () => {
  request(
    {
      uri: `https://graph.facebook.com/v8.0/me/messenger_profile?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
      qs: {
        get_started:{"payload":"GET_STARTED"
        }
      },
      method: "POST"
    },
    (error, _res, body) => {
      if (!error) {
        console.log("Get Started:", body);
      } else {
        console.error("Get Started errors:", error);
      }
    }
  );
}
   
  