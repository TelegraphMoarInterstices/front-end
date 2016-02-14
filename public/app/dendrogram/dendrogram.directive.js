(function() {
  angular.module('app')
  .directive('dendrogram', [dendrogram])

  var w = 300
  var h = 300

  function dendrogram() {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="dendrogram"></div>',
      scope: {
        data: '='
      },
      link: drawTreeOfLife,
      controller: 'DendrogramController',
      controllerAs: 'vm',
      bindToController: true
    }
  }

  function drawTreeOfLife($scope, $element, $attr) {
    /***** Initialization ****/
    var viz = dendrogramService.initializeSvg($element)
    var tooltip = dendrogramService.initializeTooltip()
    var tree = dendrogramService.initializeTree(600, 600)
    var diagonal = dendrogramService.diagonal('cartesian')

    /***** Execution ****/
    d3.json("./treeData.json", function(error, data) {
      if (error) return console.warn(error);
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
        .on("mouseover", function(d) {
          tooltip
            .transition()
            .duration(500)
            .style("opacity", 0.9);
          tooltip
            .html(
              "<strong>" +
              "<h3>" +
              d.habitat +
              "</h3>" +
              "<div>" +
              '<img src="http://lorempixel.com/100/100/animals/">' +
              '</div>' +
              '<a href="#">Learn more...</a>' +
              "</strong>"
            )
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on('mouseout', function(){
          tooltip
            .transition()
            .duration(1000)
            .style("opacity", 0);
        })

      node.append('svg:circle')
        .attr({
          r: 3,
          stroke: "tomato",
          fill: "#fff"
        })

      node.append("text")
        .text(function(d) {
          return d.name
        })
        .attr({
          "text-anchor": "middle",
          y: -10 // Move label up slightly so it doesn't crowd the node.
        })
    }
  }
})()
