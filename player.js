var fs = require('fs');
var lame = require('lame');
var speaker = require('speaker');

function play(file) {
  fs.createReadStream(file)
    .pipe(new lame.Decoder())
    .on('format', function (format) {
      //this.pipe(new Speaker(format));
    });
}

function stop() {

}
