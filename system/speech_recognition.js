var mic = require('mic');
var fs = require('fs');
var reload = require('require-reload')(require)

var detected = false;
var iteration = 0;
var last = "";
var asr = null;
var gustave = null;

const SnowboyDetect = require('snowboy-detect');

var micInstance = mic({ 'rate': '16000', 'channels': '1', 'debug': true, 'exitOnSilence': false });
var micInputStream = micInstance.getAudioStream();


const d = new SnowboyDetect({
  resource: "/home/pi/Gustave2/node_modules/snowboy-detect/resources/common.res",
  model: "/home/pi/Gustave2/node_modules/snowboy-detect/resources/snowboy.umdl",
  sensitivity: "0.5",
  audioGain: 1.0
});

micInputStream.on('data', function(data) {
    if (detected == true) {
	if (iteration == 0) {
	    if (asr) {
		asr.kill;
		asr = null;
	    }
	    asr = reload("./cliAsrNode/VOICE_SERVER/app.js");
	}

	console.log("LAST : ", asr.lastMsg())
	asr.strm(new Buffer(data, 'binary'));

	if (last == asr.lastMsg()) {
	    iteration++;
	}

	if (iteration >= 20) {
	    // ask gustave
	    gustave.ask(asr.lastMsg())
	    iteration = 0;
	    detected = false;
	}
	last = asr.lastMsg();
    }
});


d.on('silence', function () {
  console.log("\n");
});

d.on('noise', function () {
  console.log("\n");
});


d.on('hotword', function (index) {
    console.log('==========================');
    console.log('/////////// hotword', index);
    console.log('==========================');
    detected = true;
});

var start = function(_gustave) {
    gustave = _gustave;
    micInstance.start();
    micInputStream.pipe(d);
}

var kill = function() {
    micInstance.stop();
}

exports.start = start;
exports.kill = kill;
