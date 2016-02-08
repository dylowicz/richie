app.service('player', ['$http', 'playlist',
  function($http, playlist) {
    var self = this;
    var currentSong;
    var retryTimes = 0;

    self.playback = function(song) {
      console.log('Player.playback: ' + song);
      $http.get('/playback')
        .then(function(response) {
          console.log('Player.playback response: ' + JSON.stringify(response));
          currentSong = response.data;
        }, function(error) {
          if (retryTimes < 3) {
            playback();
            retryTimes++;
          }
        });
      retryTimes = 0;
      return currentSong;
    };

    self.next = function() {
      console.log('Player.next');
      $http.get('/next')
        .then(function(response) {
          console.log('Player.next response: ' + JSON.stringify(response));
          currentSong = response.data;
        }, function(error) {
          if (retryTimes < 3) {
            next();
            retryTimes++;
          }
        });
      retryTimes = 0;
      return currentSong;
    };

    self.previous = function() {
      console.log('Player.previous');
      $http.get('/previous')
        .then(function(response) {
          console.log('Player.previous response: ' + JSON.stringify(response));
          currentSong = response.data;
        }, function(error) {
          if (retryTimes < 3) {
            previous();
            retryTimes++;
          }
        });
      retryTimes = 0;
      return currentSong;
    };

    self.shuffle = function() {
      console.log('Player.shuffle');
      $http.get('/shuffle')
    };

    self.repeat = function() {
      console.log('Player.repeat');
      $http.get('/repeat')
    };
  }
]);
