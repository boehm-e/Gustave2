var gustave = require('./system/intent');
gustave.init()
    .then((success) => {
	console.log(success)
	gustave.ask('actu de futura-sciences');
	//	console.log(gustave.system.security.checkFace(gustave.system));
	// .then(() => {
	// 	gustave.ask("quelle heure est il");
	// })
    })
    .catch(function(err){
	return console.log("ERROR LOADING GUSTAVE : ",err)
    });
