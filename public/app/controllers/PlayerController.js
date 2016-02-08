app.controller('PlayerController', ['$scope', '$http', '$websocket', 'player', function($scope, $http, $websocket, player) {

  var ws = $websocket.$new({'url': 'ws://localhost:3001', 'protocols': [], 'subprotocols': ['base46'] });

  var playIcon = "glyphicon glyphicon-play";
  var pauseIcon = "glyphicon glyphicon-pause";

  $scope.currentSong = "No song is being played";
  $scope.buttonClass = playIcon

  ws.$on('$message', function(data) {
    ws.$emit("");
    var content = data.split(";");
    var isPlaying = (content[0] === "true");
    $scope.currentSong = content[1];
    if (isPlaying === true) {
      $scope.buttonClass = pauseIcon;
    } else {
      $scope.buttonClass = playIcon;
    }
  });

  $scope.playback = function() {
    console.log('PlayerController.playback');
    player.playback();
  };

  $scope.previous = function() {
    console.log('PlayerController.previous');
    player.previous();
  };

  $scope.next = function() {
    console.log('PlayerController.next');
    player.next();
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
