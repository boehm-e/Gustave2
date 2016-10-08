var time = require('./lib/time.js')

exports.start = (system, string, label) => {
	return new Promise((resolve, reject) => {
		time.get(label).then((data) => {
			system.tts(data);
			return resolve(data);
		})
		.catch((err) => {
			return reject(err);
		})
	})
}
