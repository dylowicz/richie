app.directive('trackInfo', function() {
  return {
    restrict: 'E',
    scope: {
      info: '='
    },
    templateUrl: 'templates/trackInfo.html'
  };
});
