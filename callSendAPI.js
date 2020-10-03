const request = require('request');

module.exports = async (sender_psid, response) => {
    // Decalre some variables for the request.
    var request_body;
    var token = process.env.PAGE_ACCESS_TOKEN;

        request_body = {
        "recipient": {
        "id": sender_psid
        },
        "message": response
        }

        try{
            request(
                {
                    uri: `https://graph.facebook.com/v7.0/me/messages?access_token=${token}`,
                    qs: request_body,
                    method: "POST"
                },
                (error, _res, body) => {
                  if (!error) {
                    console.log("STATE:", JSON.parse(body));
                  } else {
                    console.error("Errors:", error);
                  }
                }
            );
        } catch (e) {
            console.log(e)
        }
    }