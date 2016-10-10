
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

var get = (string, label) => {
	return new Promise((resolve, reject) => {
		switch (label) {
			case "up":
				return resolve(volumeUp())
				break;
			case "down":
				return resolve(volumeDown())
				break;
			case "stop":
				return resolve(volumeStop())
				break;
			case "set":
				return resolve(volumeSet(string))
				break;
			default:

		}
	});
}
