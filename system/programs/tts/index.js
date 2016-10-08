var child_process = require("child_process");
var fs = require("fs");
var http = require('http');


var filename = "../output.mp3";

module.exports = function(phrase){
	if (phrase != "" && typeof(phrase) != "object") {
		try {
			var file = fs.createWriteStream(filename);
			var request = http.get("http://voice2.reverso.net/RestPronunciation.svc/v1/output=json/GetVoiceStream/voiceName=Claire22k?inputText="+new Buffer(phrase.toString()).toString('base64')+"&voiceSpeed=95&mp3BitRate=128",(response) => {
				response.pipe(file);
				setTimeout(function(){
					child_process.exec("mplayer "+filename, () => {
					});
				},200)
			});
		} catch(e) {
			console.log(e);
		}
	}
	return true;
}
