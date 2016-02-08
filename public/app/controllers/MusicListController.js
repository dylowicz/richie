app.controller('MusicListController', ['$rootScope', '$scope', '$http', 'playlist',
  function($rootScope, $scope, $http, playlist) {
    $scope.$watch('$viewContentLoaded', function() {
      $http.get('/list')
        .then(function(jsonObj) {
          $scope.artists = jsonObj.data.artists;
          console.log('Scanned music: ' + JSON.stringify(jsonObj.data.artists));
        });
    });

    $rootScope.$on('$routeChangeStart', function() {
      $rootScope.loading = true;
    });

    $rootScope.$on('$routeChangeSuccess', function() {
      $rootScope.loading = false;
    });

    $scope.toggleSong = function(song) {
      $http.post('/play_song', { song: song });
    };

    $scope.toggleAlbum = function(a) {
      $http.post('/play_album', { album: a });
    };

    $scope.toggleArtist = function(a) {
      $http.post('/play_artist', { artist: a });
    };
  }
]);
