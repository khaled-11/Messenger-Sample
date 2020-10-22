// Function to translate audio to text using the Wit App.
const rp = require('request-promise'),
fs = require("fs");

module.exports = async (sender_psid) => {
  if (!fs.existsSync(`./audio/${sender_psid}.mp3`)){
    var st = fs.createReadStream(`./audio/blank.mp3`)
  } else {
    var st = fs.createReadStream(`./audio/${sender_psid}.mp3`)

  }
  var state;
    // Try the request after setting up the request_body.
    try{
      var options = {
        method: 'POST',
        uri: `https://api.wit.ai/speech?v=20200513`,
        headers: {
          Authorization: `Bearer ${process.env.wit_key}`,
          ContentType: "application/json",
          TransferEncoding:"chunked"
      },
      body: st
      };
    state = await JSON.parse(await rp(options));
    }
    catch (e){
      console.log(e.message)
    }
    return state;
};

