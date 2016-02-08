app.controller('MusicListController', ['$rootScope', '$scope', '$http', 'playlist',
  function($rootScope, $scope, $http, playlist) {
    $scope.$watch('$viewContentLoaded', function() {
      $http.get('/list')
        .then(function(jsonObj) {
          $scope.artists = jsonObj.data.artists;
          $scope.currentSong = jsonObj.data.currentSong;
          console.log('Scanned music: ' + JSON.stringify(jsonObj.data.artists));
          console.log(JSON.stringify(jsonObj.data.currentSong));
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
      // playlist.add(song);
    };

    $scope.toggleAlbum = function(a) {
      $http.post('/play_album', { album: a });
      // var artists = $scope.artists;
      // console.log("Adding album " + a);
      // for (var artist in artists) {
      //   var albums = artists[artist].albums;
      //   for (var album in albums) {
      //     var name = albums[album].name;
      //     if (name === a) {
      //       playlist.clear();
      //       var songs = albums[album].songs;
      //       var allSongs = [];
      //       for (var song in songs) {
      //         allSongs.push(songs[song].path);
      //       }
      //       playlist.addAll(allSongs);
      //       return;
      //     }
      //   }
      // }
    };

    $scope.toggleArtist = function(a) {
      $http.post('/play_artist', { artist: a });
    //   console.log("Adding artist: " + a);
    //   var artists = $scope.artists;
    //   for (var artist in artists) {
    //     var name = artists[artist].name;
    //     if (name === a) {
    //       playlist.clear();
    //       var albums = artists[artist].albums;
    //       for (var album in albums) {
    //         var allSongs = [];
    //         var songs = albums[album].songs;
    //         for (var song in songs) {
    //           allSongs.push(songs[song].path);
    //         }
    //         playlist.addAll(allSongs);
    //       }
    //       return;
    //     }
    //   }
    };
  }
]);
