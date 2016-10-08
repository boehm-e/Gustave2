var gustave = require('./system/intent');
var kws = require('./system/kws')


gustave.init()
    .then((success) => {

	// Start kws
	kws.start(gustave);

	console.log(success)
	gustave.ask('actu de futura-sciences');
	gustave.system.tts("coucou")
	//	console.log(gustave.system.security.checkFace(gustave.system));
	// .then(() => {
	// 	gustave.ask("quelle heure est il");
	// })
    })
    .catch(function(err){
	return console.log("ERROR LOADING GUSTAVE : ",err)
    });
