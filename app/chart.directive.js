angular.module('app')
.directive('chart', chart)

function chart() {
  // var dataset = [5, 10, 15, 20, 25, 17, 3, 46]

  return {
    restrict: 'E',
    replace: true,
    template: '<div class="chart"></div>',
    scope: {
      data: '='
    },
    link: function($scope, $element, $attr) {
      //we select the element of this directive
      var element =
        d3.select($element[0])
          .append("svg")
          .attr("width", 300)
          .attr("height", 300)

        element.selectAll("rect")
          .data($scope.data)
          .enter()
          .append("rect")
          .attr({
            x: function(d, i) {return i * 300 / $scope.data.length},
            y: function(d) {return 300 - (d * 4) + 3},
            width: 300 / $scope.data.length - 5,
            height: function(d) {return d * 4}
          })
    }
  }
}
