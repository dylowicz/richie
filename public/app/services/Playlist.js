app.factory('playlist', function() {
  var _tracks = [];
  var _history = [];
  var playlist = {};
  var currentTrack = 0;

  var getTrackId = function(track) {
    for(var i = 0; i < _tracks.length; ++i) {
      if (_tracks[i] === track) {
        return i;
      }
    }
    return -1;
  };

  playlist.get = function(index) {
    return _tracks[index];
  };

  playlist.exists = function(index) {
    return index >= 0 && index < _tracks.length;
  };

  playlist._add = function(track) {
    if (getTrackId(track) === -1) {
      _tracks.push(track);
      return true;
    }
    return false;
  };

  playlist.add = function(track) {
    var added = playlist._add(track);
    if (added) console.log('Added track: ' + track);
  };

  playlist.addAll = function(tracks) {
    for (var track in tracks) {
      playlist._add(tracks[track]);
    }
    console.log('Added tracks: ' + _tracks);
  };

  playlist.remove = function(track) {
    var id = getTrackId(track);
    if (id != -1) {
      _tracks.splice(id, 1);
      console.log('Removed track: ' + track);
    }
  };

  playlist.clear = function() {
    _tracks = [];
    console.log('Playlist cleared');
  };

  playlist.list = function() {
    return _tracks;
  };

  playlist.shuffle = function() {
    for (var j, x, i = _tracks.length; i; j = Math.floor(Math.random() * i), x = _tracks[--i], _tracks[i] = _tracks[j], _tracks[j] = x);
  };

  playlist.repeat = function(index) {

  };

  return playlist;
});
