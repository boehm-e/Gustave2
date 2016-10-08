var gustave = require('./system/intent');
var speech_recognition = require('./system/speech_recognition')


gustave.init()
    .then((success) => {
	// START SPEECH RECOGNITION
	speech_recognition.start(gustave);

	gustave.ask('actu de futura-sciences');
    })
    .catch(function(err){
	return console.log("ERROR LOADING GUSTAVE : ",err)
    });


/*EXIT HANDLER*/
function exitHandler(options, err) {
    console.log("EXITING")
//    speech_recognition.kill();
    if (options.cleanup) console.log('clean');
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
}

process.on('exit', exitHandler.bind(null,{cleanup:true}));
process.on('SIGINT', exitHandler.bind(null, {exit:true}));
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

