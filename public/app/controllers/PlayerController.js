app.controller('PlayerController', ['$scope', '$http', 'player', function($scope, $http, player) {
  $scope.playback = function() {
    console.log('PlayerController.playback');
    $scope.currentSong = player.playback();
  };

  $scope.previous = function() {
    console.log('PlayerController.previous');
    $scope.currentSong = player.previous();
  };

  $scope.next = function() {
    console.log('PlayerController.next');
    $scope.currentSong = player.next();
  };

  $scope.shuffle = function() {
    console.log('PlayerController.shuffle');
    player.shuffle();
  };

  $scope.repeat = function() {
    console.log('PlayerController.repeat');
    player.repeat();
  };
}]);
