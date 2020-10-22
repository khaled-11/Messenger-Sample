//// Function to send responses to the user using the Graph API ////
const rp = require('request-promise'),
fs = require('fs');

module.exports = async (sender_psid, response, action, fileData) => {
    // Decalre some variables, and get the page access token.
    var request_body;
    var state;
    var token = process.env.PAGE_ACCESS_TOKEN;
    // Check response type and create the request body.
    if (!action){
        request_body = {
        "recipient": {
        "id": sender_psid
        },
        "message": response
        }
    } 
    else {
        request_body = {
        "recipient": {
        "id": sender_psid
        },
        "sender_action":action
        }
    }

    // Try the request after setting up the request_body.
    try{
        // If it is a regular Response or action.
        if(!fileData){
            var options = {
                method: 'POST',
                uri: `https://graph.facebook.com/v8.0/me/messages?access_token=${token}`,
                body: request_body,
                json: true
            };
            state = await rp(options);
        }
        // If the response is File attachment from the local server. 
        else{
            var fileReaderStream = fs.createReadStream(fileData)
                // If it is mp3 file
                if (fileData.includes("mp3")){
                formData = {
                recipient: JSON.stringify({
                id: sender_psid
                }),
                message: JSON.stringify({
                    attachment: {
                    type: 'audio',
                payload: {
                is_reusable: false
                }}
                }),
                filedata: fileReaderStream
                }
            // If it is another file format
            } else {
            formData = {
            recipient: JSON.stringify({
            id: sender_psid
            }),
            message: JSON.stringify({
                attachment: {
                type: 'file',
            payload: {
            is_reusable: false
            }}
            }),
            filedata: fileReaderStream
            }}
            var options = {
                method: 'POST',
                uri: `https://graph.facebook.com/v7.0/me/messages?access_token=${token}`,
                formData: formData,
                json: true
            };
            state = await rp(options);
        }
    }
    catch (e){
        console.log(e.message);
    }
    return state;
}