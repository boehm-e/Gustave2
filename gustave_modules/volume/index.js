var info = require('./lib/volume');
exports.start = (system, string, label) => {
	return new Promise((resolve, reject) => {
    volume.get(string, label)
		.then(result => {
			system.tts(result);
			resolve(result);
		})
		.catch(() => {
			reject();
		});
	})

}
