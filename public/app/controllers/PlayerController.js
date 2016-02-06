app.controller('PlayerController', ['$scope', '$http', 'player', function($scope, $http, player) {
  $scope.currentTrack = 'No track selected';

  $scope.playback = function() {
    console.log('PlayerController.playback');
    $scope.currentTrack = player.playback();
  };

  $scope.previous = function() {
    console.log('PlayerController.previous');
    $scope.currentTrack = player.previous();
  };

  $scope.next = function() {
    console.log('PlayerController.next');
    $scope.currentTrack = player.next();
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
