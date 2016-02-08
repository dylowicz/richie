app.factory('playlist', function() {
  var _songs = [];
  var _history = [];
  var playlist = {};
  var currentSong = 0;

  var getSongId = function(song) {
    for(var i = 0; i < _songs.length; ++i) {
      if (_songs[i] === song) {
        return i;
      }
    }
    return -1;
  };

  playlist.get = function(index) {
    return _songs[index];
  };

  playlist.exists = function(index) {
    return index >= 0 && index < _songs.length;
  };

  playlist._add = function(song) {
    if (getSongId(song) === -1) {
      _songs.push(song);
      return true;
    }
    return false;
  };

  playlist.add = function(song) {
    var added = playlist._add(song);
    if (added) console.log('Added song: ' + song);
  };

  playlist.addAll = function(songs) {
    for (var song in songs) {
      playlist._add(songs[song]);
    }
    console.log('Added songs: ' + _songs);
  };

  playlist.remove = function(song) {
    var id = getSongId(song);
    if (id != -1) {
      _songs.splice(id, 1);
      console.log('Removed song: ' + song);
    }
  };

  playlist.clear = function() {
    _songs = [];
    console.log('Playlist cleared');
  };

  playlist.list = function() {
    return _songs;
  };

  playlist.shuffle = function() {
    for (var j, x, i = _songs.length; i; j = Math.floor(Math.random() * i), x = _songs[--i], _songs[i] = _songs[j], _songs[j] = x);
  };

  playlist.repeat = function(index) {

  };

  return playlist;
});
