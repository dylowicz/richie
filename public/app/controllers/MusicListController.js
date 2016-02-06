app.controller('MusicListController', ['$rootScope', '$scope', '$http', 'playlist',
  function($rootScope, $scope, $http, playlist) {
    // $scope.$watch('$viewContentLoaded', function() {
    //   $http.get('/scanmusic')
    //     .then(function(jsonObj) {
    //       $scope.artists = jsonObj.data.artists;
    //       console.log('Scanned music: ' + JSON.stringify(jsonObj.data.artists));
    //     });
    // });

    $rootScope.$on('$routeChangeStart', function() {
      $rootScope.loading = true;
    });

    $rootScope.$on('$routeChangeSuccess', function() {
      $rootScope.loading = false;
    });

    $scope.toggleTrack = function(track) {
      playlist.add(track);
    };

    $scope.toggleAlbum = function(a) {
      var artists = $scope.artists;
      console.log("Adding album " + a);
      for (var artist in artists) {
        var albums = artists[artist].albums;
        for (var album in albums) {
          var name = albums[album].name;
          if (name === a) {
            playlist.clear();
            var tracks = albums[album].tracks;
            var allTracks = [];
            for (var track in tracks) {
              allTracks.push(tracks[track].path);
            }
            playlist.addAll(allTracks);
            return;
          }
        }
      }
    };

    $scope.toggleArtist = function(a) {
      console.log("Adding artist: " + a);
      var artists = $scope.artists;
      for (var artist in artists) {
        var name = artists[artist].name;
        if (name === a) {
          playlist.clear();
          var albums = artists[artist].albums;
          for (var album in albums) {
            var allTracks = [];
            var tracks = albums[album].tracks;
            for (var track in tracks) {
              allTracks.push(tracks[track].path);
            }
            playlist.addAll(allTracks);
          }
          return;
        }
      }
    };
  }
]);
