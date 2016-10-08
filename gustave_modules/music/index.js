var youtube = require('./lib/youtube.js')
exports.start = (system, string, label) => {
  return new Promise((resolve, reject) => {
    youtube.play(string).then((data) => {
      system.tts("lecture");
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
