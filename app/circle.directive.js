// This draws once sucessfully, but will not redraw automatically.
// For that, need to $scope.watch the data and re-render.
// See 'angular-sparkline' for an example.

angular.module('app')
.directive('circle', circle)

function circle() {
  return {
    restrict: 'E',
    // replace: true,
    template: '<div class="circle"></div>',
    scope: {
      circleSize: '=',
      data: '='
    },
    link: function($scope, $element, $attr) {
      // console.log($scope.data);
      console.log($scope.circleSize);
      // The element is just big enough to fit the circle
      var width =  $scope.circleSize * 2
      var height = $scope.circleSize * 2

      // We select the element of this directive
      // and append the svg, which will contain
      // the circle
      var element =
        d3.select($element[0])
          .append("svg")
          .attr("width", width)
          .attr("height", height)

      // Append the circle to the svg
      // Center it
      // Set the radius to equal whatever was indicated
      // on the circle-size attribute,
      // in this case circle-size="circleSize"
      // Note the dash case vs camel case. Angular normalization at work? Yikes!
      element.append("circle")
        .attr({
          cx: width / 2,
          cy: height / 2,
          r: $scope.circleSize
        })
    }
  }
}
