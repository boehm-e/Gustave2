var request = require('request');
var cheerio = require('cheerio');
var ytdl = require('ytdl-core');
var fs = require('fs');
var ffmpeg = require('fluent-ffmpeg');
var lame = require('lame');
var Speaker = require('speaker');





function getYoutubeLink(string) {

  return new Promise((resolve, reject) => {
    var toRemove = ["écouter", "ecouter", "écoutez", "YouTube", "youtube"];
    for (var i=0; i<toRemove.length; i++) {
      string = string.replace(toRemove[i], "");
    }
    string = string.replace(/\s+/g, ' ').trim();
    var finalName = string;
    var name = string.split(' ').join('_')+".mp3";
    string = string.split(' ').join('%20');

    var deezerUrl = encodeURI("https://api.spotify.com/v1/search?query=" + string + "&offset=0&limit=5&type=track").split("%25").join("%");
    // fetch spotify api !
    var deezerApi = request(deezerUrl.replace("%25", "%"), (error, response, body) => {
      try {
        var jsonFromDeezer = JSON.parse(body);
        var author = jsonFromDeezer.tracks.items[0].artists[0].name;
        var track = jsonFromDeezer.tracks.items[0].name;
      }catch (e) {
        return reject("Musique non trouvee")
      }

      var url = encodeURI("https://www.youtube.com/results?search_query="+track+"+"+author);
      request(url, (error, response, body) => {
        var $ = cheerio.load(body);
        var youtubePath = $(".yt-lockup-title a")[0].attribs.href.split('v=')[1];
        return resolve(youtubePath);
      });

    });
  });

}



var launchSong = (path) => {
  var dl = ytdl('http://www.youtube.com/watch?v='+path, {
    filter: function(format) { return format.container === 'mp4'; }
  });
  var converter = ffmpeg(dl).format('mp3').pipe(new lame.Decoder())
  .on('format', function (format) {
    console.log("FORMAT : ", format);
    this.pipe(new Speaker(format));
  });
}





var play = (string, label) => {
  return new Promise((resolve, reject) => {
    getYoutubeLink(string)
    .then((youtubePath) => {
      launchSong(youtubePath);
      console.log(youtubePath)
      return resolve("lecture")
    });
  })
}
exports.play = play
