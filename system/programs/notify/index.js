var request = require('request');

module.exports = (system, message) => {
	request('https://smsapi.free-mobile.fr/sendmsg?user='+system.config.free.user+'&pass='+system.config.free.pass+'&msg='+message, function (error, response, body) {
		console.log("SEND REQUEST")
		if (!error && response.statusCode == 200) {
			console.log(body)
		}
	})
}