
/// Function to read the audio from the link //
const rp = require('request-promise'),
fs = require("fs");

module.exports = async (sender_psid, attachmentUrl) => {
  try{
    var options = {
      uri: attachmentUrl,
      headers: {
          'User-Agent': 'Request-Promise',
          'type': "audio"
      },
      mp3: true
    };
    filePath = `./audio/${sender_psid}.mp4`;
    return await (rp(options).pipe(fs.createWriteStream(filePath)));  
  }
  catch (e){
  console.log(e);
  }
}