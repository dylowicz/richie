app.service('player', ['$http', 'playlist',
  function($http, playlist) {
    var self = this;
    var currentTrack;
    var retryTimes = 0;

    self.playback = function(track) {
      console.log('Player.play.playlist: ' + track);
      $http.post('/playback', { track : "sample data.mp3" })
        .then(function(response) {
          console.log('Player.play response: ' + JSON.stringify(response));
          currentTrack = response.data;
        }, function(error) {
          if (retryTimes < 3) {
            playback();
            retryTimes++;
          }
        });
      retryTimes = 0;
      return currentTrack;
    };

    self.next = function() {
      console.log('Player.next');
      $http.get('/next')
        .then(function(response) {
          console.log('Player.next response: ' + JSON.stringify(response));
          currentTrack = response.data;
        }, function(error) {
          if (retryTimes < 3) {
            next();
            retryTimes++;
          }
        });
      retryTimes = 0;
      return currentTrack;
    };

    self.previous = function() {
      console.log('Player.previous');
      $http.get('/previous')
        .then(function(response) {
          console.log('Player.previous response: ' + JSON.stringify(response));
          currentTrack = response.data;
        }, function(error) {
          if (retryTimes < 3) {
            previous();
            retryTimes++;
          }
        });
      retryTimes = 0;
      return currentTrack;
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
