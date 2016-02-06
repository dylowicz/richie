var express = require('express');
var app = express();
var server = require('http').createServer(app);

var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var Speaker = require('speaker');
var lame = require('lame');
var mm = require('musicmetadata');
var Player = require('player');
var glob = require('glob');
var async = require('async');
var io = require('socket.io').listen(server);

var MP3_PATH = '/Users/david/Music/mp3';
var PLAYER = new Player([]);
var isPlaying = false;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app')));

// FUNCTIONS

// PLAYER
var stream;
var speaker;

function play(track) {
  if (!isPlaying) {
    isPlaying = true;
    speaker = new Speaker();
    stream = fs.createReadStream(track)
      .pipe(new lame.Decoder())
      .on('format', function() {
        this.pipe(speaker);
      })
      .on('end', function() {
        console.log("Track ended (on end)");
        stop();
        io.emit('stopped', { isPlaying : isPlaying });
        console.log('WTF SOCKET');
      });
  }
}

function stop() {
  if (isPlaying) {
    stream.unpipe();
    speaker.end();
    if (speaker) delete speaker;
    isPlaying = false;
    console.log('Server.stop');
  }
}

// ROUTES

app.get('/?', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
  res.end();
});

// PlayerController
app.post('/play', function(req, res) {
  var track = req.body.track;
  console.log('Server track: ' + track);
  play(track);
  res.json({ track: track,
             isPlaying: isPlaying
           });
  res.end();
});

app.get('/stop', function(req, res) {
  stop();
  res.json({ isPlaying: isPlaying });
  res.end();
});

app.get('/previous', function(req, res) {
  res.end();
});

app.get('/next', function(req, res) {
  res.end();
});

app.get('/shuffle', function(req, res) {
  stop();
  res.end();
});

app.get('/repeat', function(req, res) {
  res.end();
});

// Scanner
app.get('/scanmusic', function(req, res) {
  glob(MP3_PATH + '/**/*.mp3', function(err, files) {
    var calls = [];
    files.forEach(function(file) {
      calls.push(function(callback) {
        var parser = new mm(fs.createReadStream(file), function(err, metadata) {
          if (err) return callback(err);
          metadata.artist = metadata.artist[0];
          metadata.path = file;
          metadata.file = path.basename(file);
          if (metadata.duration) {
            var duration = metadata.duration;
            var date = new Date(null);
            date.setSeconds(duration);
            metadata.duration = date.toISOString().substr(14, 5);
          }
          else {
            metadata.duration = '--:--';
          }
          callback(null, metadata);
          // console.log(metadata);
        });
      });
    });
    async.parallel(calls, function(err, metadata) {
      if (err) return console.log(err);
      var byArtist = {};
      metadata.forEach(function(e) {
        if (byArtist[e.artist] === undefined) {
            // New artist, add to the dictionary
            byArtist[e.artist] = {
                artist: e.artist,
                albums: {}
            };
        }

        if (byArtist[e.artist].albums[e.album] === undefined) {
            // New album, add to the dictionary
            byArtist[e.artist].albums[e.album] = {
                name: e.album,
                year: e.year,
                tracks: []
            };
        }

        // Add the track
        byArtist[e.artist].albums[e.album].tracks.push({
            title: e.title,
            duration: e.duration,
            path: e.path,
            file: e.file
        });
      });

      // Convert the dictionaries to the final array structure
      var result = { artists: [] };
      for (var artistKey in byArtist) {
          if (byArtist.hasOwnProperty(artistKey)) {
              var artist = { name: byArtist[artistKey].artist, albums: [] };

              // Need to convert the album dictionary as well
              for (var albumKey in byArtist[artistKey].albums) {
                  if (byArtist[artistKey].albums.hasOwnProperty(albumKey)) {
                      artist.albums.push(byArtist[artistKey].albums[albumKey]);
                  }
              }
              result.artists.push(artist);
          }
      }
      console.log(result);
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(result));
    });
  });
});

var port = 3000;
server.listen(port, function() {
  console.log('Server started');
  console.log('Listening to port %d', port);
});
