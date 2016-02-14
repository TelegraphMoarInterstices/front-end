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
    var viz = dendrogramService.initialize($element)

    // The info that pops up on hover
    var tooltip = d3.select("body").append("div")
                          .attr("class", "tooltip")
                          .style("opacity", 0);

    // Initialize the tree layout?
    var tree =
      d3.layout.tree()
        .size([600, 600])

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
    d3.json("./treeData.json", function(error, data) {
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
        // .attr('r', 3)
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

      // console.log(nodes);
    }
  }
})()
