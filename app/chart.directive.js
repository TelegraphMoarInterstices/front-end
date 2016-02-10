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
    link: drawTreeOfLife
  }
}

function drawTreeOfLife($scope, $element, $attr) {
  /***** Initialization ****/

  // Set up the svg container for the visualization named 'viz'
  var viz = d3.select($element[0])
    .append('svg')
    .attr('width', 400)
    .attr('height', 300)
    .append('svg:g')
    .attr('transform', 'translate(40, 0)')

  // Initialize the tree layout?
  var tree =
    d3.layout.tree()
      .size([300, 150])

  // Get the x and y from the data
  // Use this to set the 'diagonal' for the pathlink
  var diagonal =
    d3.svg.diagonal()
      .projection(function(d) {return [d.y, d.x]})

  // Future: Use to make radial dendrogram
  var radialDiagonal =
    d3.svg.diagonal()
      .projection(function(d) {
        var r = d.y
        var a = (d.x - 90) / 180 * Math.PI;
        return [r * Math.cos(a), r * Math.sin(a)];
      })

/***** Execution ****/
  // var data
  d3.json("/treeData.json", function(error, data) {
    if (error) return console.warn(error);
    // console.log(data);
    visualizeIt(data);
  });

/***** Implementation ****/
  function visualizeIt(treeData) {
    var nodes = tree.nodes(treeData)
    var link = viz.selectAll('pathlink') // what's pathlink?
    .data(tree.links(nodes))
    .enter()
    .append('svg:path')
    .attr('class', 'link')
    .attr('d', diagonal)

    var node = viz.selectAll('g.node')
    .data(nodes)
    .enter()
    .append('svg:g')
    // Move the node based on its data. Can this be done with diagonal()?
    .attr('transform', function(d) {return 'translate(' + d.y + ',' + d.x + ')'})

    node.append('svg:circle')
    // .attr('r', 3)
    .attr({
      r: 3,
      stroke: "tomato",
      fill: "#fff"
    })

    console.log(nodes);
  }
}
