var thisModule = 'volume';


var fs = require('fs');
var natural = require('natural');
var classifier = new natural.BayesClassifier();
var child_process = require("child_process");

var volumeDown = function() {
	child_process.exec("amixer -D pulse set Master 20%-", function() {
		console.log("Le volume a ete diminue");
    });
    return "volume diminué";
}

var volumeUp = function() {
	child_process.exec("amixer -D pulse set Master 20%+", function() {
		console.log("Le volume a ete augmente");
    });
    return "volume augmenté";
}

var volumeStop = function() {
	child_process.exec("amixer -D pulse sset Master mute", function() {
		console.log("La musique a ete arretee")
    });
    return "je coupe le son!";
}

var volumeSet = function(string) {
    var volume = string.match(/\d+/)[0];

    child_process.exec("amixer -D pulse sset Master "+volume+"%", function() {
	console.log("Le volume a bien ete regle a "+volume+"%");
    });
    return "Volume a "+volume+"%";


}
