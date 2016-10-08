var repas = require('./lib/repas.js')
exports.start = (system, string, label) => {
	return new Promise((resolve, reject) => {
		repas.get(label).then((data) => {
			system.tts(data);
			return resolve(data);
		})
		.catch((err) => {
			return reject(err);
		})
	})
}

// exports.render = () {
// 	return {
// 		"html"
// 	}
// }
