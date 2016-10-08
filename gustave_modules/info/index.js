var path = require('path');
var info = require(path.join(__dirname,'lib/info'));
exports.start = (system, string, label) => {
	return new Promise((resolve, reject) => {
		info.whoIs(string)
		.then(result => {
			// launch tts
			system.tts(result);
			resolve(result);
		})
		.catch(() => {
			reject();
		});
	})

}
