/// Function to convert the audio from mp4 to mp3 ///
const ffmpeg = require('ffmpeg');
module.exports = async (fileName) => {
	try {
		var tFile = new ffmpeg(`./audio/${fileName}.mp4`);
		tFile.then(function (video) {
			// Callback mode
			video.fnExtractSoundToMP3(`./audio/${fileName}.mp3`, async function (error, file) {
			if (!error){
				console.log('Audio file: ' + file);
				return;
			} else {
				console.log("error in audio convert.");
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