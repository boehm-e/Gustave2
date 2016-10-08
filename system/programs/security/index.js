var path = require('path');
var child_process = require("child_process");
var fs = require('fs');

var oxford = require('project-oxford');

exports.checkFace = (system) => {
	console.log("HERE")
	return new Promise((resolve, reject) => {
		var client = new oxford.Client(system.config.face.key);
		child_process.exec("streamer -f jpeg -o "+ path.join(__dirname, "picture.jpeg"), () => {
			console.log(path.join(__dirname, "picture.jpeg"))

			var adminId = '';
			var userId = '';
			client.face.detect({
				path: path.join(__dirname, 'admin.jpeg'),
				returnFaceId: true
			}).then((response) => {
				if (response.length < 1) {
					console.log("NO FACE FOUND")
					return reject();
				}

				adminId = response[0].faceId;
				client.face.detect({
					path: path.join(__dirname, 'picture.jpeg'),
					returnFaceId: true
				}).then((response) => {
					if (response.length < 1) {
						console.log("NO FACE FOUND")
						return reject();
					}

					userId = response[0].faceId;

					client.face.verify([adminId, userId])
					.then((response) => {
						console.log(response);
						if (response.isIdentical == true)
							return resolve();
						return reject();
					})
					.catch(() => {
						return reject()
					});

				})

			})

		});
	});
} 