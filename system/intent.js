var path = require('path');
var fs = require('fs');
var natural = require('natural');
var classifier = new natural.BayesClassifier();

var gustaveModules = {};
var gustaveSystem = {};

exports.init = function() {
    return new Promise((resolve, reject) => {
        // LIST GUSTAVE MODULES
        fs.readdir(path.join(__dirname, '../gustave_modules'), (err, modules) => {
            if (err)
                return reject(err);
            modules.forEach((module) => {
                var modulePath = path.join(__dirname, '../gustave_modules', module, 'index.js');
                var phrase = path.join(__dirname, '../gustave_modules', module, 'phrase.json');

                    gustaveModules[module] = require(modulePath);
                    try {
                } catch (err) {
                    reject(err);
                }

                var _json = JSON.parse(fs.readFileSync(phrase));
                for (j=0; j<_json.length; j++) {
                    var text = _json[j].text;
                    var label = _json[j].label;
                    classifier.addDocument(text, label);
                }
            })

            classifier.train();
            exports.modules = gustaveModules;

            // LIST GUSTAVE SYSTEM PROGRAMS
            fs.readdir(path.join(__dirname, 'programs'), (err, systems) => {
                if (err)
                    return reject(err);

                systems.forEach((system) => {
                    var systemPath = path.join(__dirname, 'programs', system, 'index.js');
                    var systemName = system.split('.')[0];
                    try {
                        gustaveSystem[systemName] = require(systemPath);
                    } catch (err) {
                        reject(err);
                    }
                });
                gustaveSystem.config = JSON.parse(fs.readFileSync(path.join(__dirname, 'credentials.json')))
                console.log("SYSTEM MODULES LOADED")
                exports.system = gustaveSystem;
                resolve('INITIALIZATION SUCCESS');
            })
        })
    })
}

exports.ask = (question) => {
    var label = classifier.classify(question).split('-')[0];
    var subLabel = classifier.classify(question).split('-')[1] || null;
    console.log("CLASSIFICATION : ",label);
    var res = gustaveModules[label];
    res.start(gustaveSystem ,question, subLabel)
    .then((response) => {
        console.log("RESPONSE", response);
    })
    .catch(function(err){
        gustaveSystem.error("ERROR RUNNING MODULE :" + label +' '+ err)
    });
}
