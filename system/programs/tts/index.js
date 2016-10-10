var child_process = require("child_process");
var fs = require("fs");
var http = require('http');
var request = require('request')
var ffmpeg = require('fluent-ffmpeg');
var lame = require('lame');
var Speaker = require('speaker');


var filename = "../output.mp3";

module.exports = function(phrase){
	if (phrase != "" && typeof(phrase) != "object") {
		var url = "http://voice2.reverso.net/RestPronunciation.svc/v1/output=json/GetVoiceStream/voiceName=Claire22k?inputText="+new Buffer(phrase.toString()).toString('base64')+"&voiceSpeed=95&mp3BitRate=128";

		try {
			ffmpeg(request(url)).format('mp3').pipe(new lame.Decoder())
			.on('format', function (format) {
				this.pipe(new Speaker(format));
			});
		} catch(e) {
			console.log(e);
		}
	}
	return true;
}
