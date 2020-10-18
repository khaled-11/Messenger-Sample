/// Function to convert the audio from mp4 to mp3 ///
const ffmpeg = require('ffmpeg');
module.exports = async (fileName) => {
try {
		var t = new ffmpeg(`./audio/${fileName}.mp4`);
		t.then(function (video) {
			// Callback mode
			video.fnExtractSoundToMP3(`./audio/${fileName}.mp3`, async function (error, file) {
			if (!error){
				console.log('Audio file: ' + file);
				return;
			} else {
				console.log(error);
			}
			});
		}, function (err) {
			console.log('Error: ' + err);
		});
} catch (e) {
	console.log(e.code);
	console.log(e.msg);
}
return;
};