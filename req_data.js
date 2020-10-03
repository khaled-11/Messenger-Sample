/// Function to request Data from Facebook Messenger ///
const request = require('request');

module.exports = async (sender_psid) => {
    token = process.env.PAGE_ACCESS_TOKEN;
    try{
        request(
            {
                uri: `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic`,
                qs: {
                    access_token: token
                },
                method: "GET"
            },
            (error, _res, body) => {
              if (!error) {
                console.log("Data:", JSON.parse(body));
              } else {
                console.error("Errors:", error);
              }
            }
        );
    } catch (e) {
        console.log(e)
    }
}