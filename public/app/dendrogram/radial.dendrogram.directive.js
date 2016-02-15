(function() {
  angular.module('app')
  .directive('radialdendrogram', dendrogram)

  var diameter = 1250;

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
    var diameter = 1250;

    var viz = d3.select($element[0]).append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .append("g")
        .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

    var tree = d3.layout.tree()
        .size([360, diameter / 3-1])
        .separation(function(a, b) { return (a.parent == b.parent ? 1: 1) / a.depth; });

    var diagonal = d3.svg.diagonal.radial()
        .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

    d3.json("/treeData.json", function(error, data) {
      if (error) throw error;
      visualizeIt(data);
    });

    function visualizeIt(treeData){
      var nodes = tree.nodes(treeData),
          links = tree.links(nodes);

      var link = viz.selectAll(".link")
          .data(links)
        .enter().append("path")
          .attr("class", "link")
          .attr("d", diagonal)
          //changes link color and thickness when hovered over, reverts when mouseoff
          .on("mouseover", function(d){
            link.style("stroke", "red")
            link.style("stroke-width", "2px");
          })
          .on("mouseout", function(d){
            link.style("stroke", "aqua")
            link.style("stroke-width", "1px");
          });

      var node = viz.selectAll(".node")
          .data(nodes)
        .enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
          .on("mouseover", function(d){
            console.log(d)
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

      node.append("circle")
          .attr("r", 3);

      node.append("text")
          .attr("dy", 3)
          .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
          .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
          .text(function(d) { return d.name; })
      //makes nodes larger when they are hovered over and then reverts after mouseoff
      node.on("mouseover", function(d){
        node.style("font-size", "3vw")
      });
      node.on("mouseout", function(d){
        node.style("font-size", "2vw")
      });
    }


      d3.select(self.frameElement).style("height", diameter - 150 + "px");
 };
})();
