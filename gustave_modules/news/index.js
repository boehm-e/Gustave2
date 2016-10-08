var news = require('./lib/news.js')
exports.start = (system, string, label) => {
	return new Promise((resolve, reject) => {
		news.get(string, label).then((data) => {
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
