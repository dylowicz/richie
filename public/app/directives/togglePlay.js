app.directive('togglePlay', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('click', function() {
        var playIcon = "glyphicon glyphicon-play";
        var pauseIcon = "glyphicon glyphicon-pause";
        if(element.attr("class") === playIcon) {
          element.removeClass(playIcon);
          element.addClass(pauseIcon);
        }
        else {
          element.removeClass(pauseIcon);
          element.addClass(playIcon);
        }
      });
    }
  };
});
