(function(){
  angular.module('app')
  .directive('interactiveradialdendrogram', [ "dendrogramService", dendrogram] )

  function dendrogram(dendrogramService) {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="dendrogram"></div>',
      scope: {
        filter: '=',
        habitat: '=',
        taxonrank: '='
      },
      link: drawTreeOfLife,
      controller: 'DendrogramController',
      controllerAs: 'vm',
      bindToController: true
    }

  function drawTreeOfLife($scope, $element, $attr){
    var filterOptions = {}
    d3.json("app/sampleData/tree-1000.json", function(error, data) {
      if (error) return console.warn(error);

    var tooltip = dendrogramService.initializeTooltip()
    var diameter = dendrogramService.config.diameter;
    var multiplier = dendrogramService.config.multiplier;

    //convention with d3 seems to be to set margins as well
    var margin = {top: 2, right: 2, bottom: 2, left: 2},
        width = diameter,
        height = diameter;

    //this sets the durations for the transitions when nodes collapse and expand in ms
    var i = 0,
        duration = 350,
        root;

    //this is the where the tree shap is created with size being a fraction of
    //diameter along with the relationships between nodes
    var tree = d3.layout.tree()
        .size([360, diameter / 1-10])
        .separation(function(a, b) { return (a.parent == b.parent ? 1 : multiplier) / a.depth; });

    //sets the diagonoal projection for the dendrogram
    var diagonal = d3.svg.diagonal.radial()
        .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

    //trying to integrate vz variable structure from Zach's angular + d3 solution
    var svg = d3.select($element[0]).append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

    //we need to set root equal to a variable, in my working example var life = a
    //big XML of data, need to figure out how to pull this from a JSON
    root = data;
//we think this needs to change
    root.x0 = height / 2;
    root.y0 = 0;

    //start with all children collapsed, if we nix this next line then the graph
    //will start uncollapsed with all nodes displayed
    // root.children.forEach(collapse);
    update(root);

  //setting height on the frame of the dendrogram
    d3.select(self.frameElement).style("height", "900px");

    //the following modifies the dendrogram using functions declared at the bottom
    //link and node variables are also declared here
    function update(source) {

      //compute the new tree layout
      var nodes = tree.nodes(root),
          links = tree.links(nodes);

      //normalize fixed-depth for each node, magically!
      nodes.forEach(function(d) { d.y = d.depth * multiplier; });

      //update the nodes  ...
      var node = svg.selectAll("g.node")
          .data(nodes, function (d) {return d.id || (d.id = ++i); });

      //enter any new node at the parent's previous position.
      var nodeEnter = node.enter().append("g")
          .attr("class", "node")
          //.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
          .on("click", click)
          .on("mouseover", showTooltip)
          .on('mouseout', hideTooltip)

      //adding circles to nodes
      nodeEnter.append("circle")
          .attr("r", dendrogramService.config.node.initialSize)
          .style("fill", function(d) { return d._children ? "orange" : "#fff"; });

      //adding text and setting attributes
      nodeEnter.append("text")
          .attr("x", 10 )
          .attr("dy", ".35em")
          .attr("text-anchor", "start")
          .attr("transform", function(d) { return d.x < 180 ? "translate(-2)" : "rotate(360)translate(2)"; })
          // .attr("transform", function(d) { return d.x < 180 ? "translate(0)" : "rotate(180)translate(-" + (d.name.length * 8.5)  + ")"; })
          .text(function(d) { return d.name; })
          .style('opacity', dendrogramService.config.text.initialOpacity)
          .style("fill-opacity", 1e-6)
          .attr('class', 'node-name')

      // Transition nodes to their new position.
      var nodeUpdate = node.transition()
          .duration(duration)
          .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

      //setting node styling to differentiate between nodes that have more information contained within it them
      nodeUpdate.select("circle")
          .attr("r", dendrogramService.config.node.initialSize)
          .style("fill", function(d) { return d._children ? "slategray" : "white"; })

      //fixed text positioning so text on both sides of dendrogram appears correctly
      nodeUpdate.select("text")
          .style("fill-opacity", 1)
          .attr("text-anchor", function(d) {
            if (d.x > 180) {
              return "end"
            }
          })
          .attr("transform", function(d) {
            if (d.x < 180) {
              var transformText = "translate(0)"
              return transformText
            } else {
              var transformText = "rotate(180)translate(-20)";
              return transformText
            }
          });

      // Trying to make appropriate transforms, not perfect
      var nodeExit = node.exit().transition()
          .duration(duration)
          //.attr("transform", function(d) { return "diagonal(" + source.y + "," + source.x + ")"; })
          .remove();

      nodeExit.select("circle")
          .attr("r", dendrogramService.config.node.initialSize);

      nodeExit.select("text")
          .style("fill-opacity", 1e-6);

      // Update the links between nodes…
      var link = svg.selectAll("path.link")
          .data(links, function(d) { return d.target.id; });

      // Enter any new links at the parent's previous position.
      link.enter().insert("path", "g")
          .attr("class", "link")
          .attr("d", function(d) {
            var o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
          });

      // Transition links to their new position.
      link.transition()
          .duration(duration)
          .attr("d", diagonal);

      // Transition exiting nodes to the parent's new position.
      link.exit().transition()
          .duration(duration)
          .attr("d", function(d) {
            var o = {x: source.x, y: source.y};
            return diagonal({source: o, target: o});
          })
          .remove();

      // Stash the old positions for transitions.
      nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

  //functions D3 is using

    // Toggle child nodes on click.
    function click(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }

    function showTooltip(d) {
      if (d.taxonRank === 'species') {
        tooltip
        .transition()
        .duration(500)
        .style("opacity", 0.9);
        tooltip
        .html(
          "<h3>" +
          d.name +
          "</h3>" +
          "<p>" +
          d.description +
          "</p>" +
          "<div>" +
          '<img src="http://lorempixel.com/100/100/animals/">' +
          '</div>'
        )
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px")
      }
    }

    function hideTooltip() {
      console.log('out');
      tooltip
        .transition()
        .duration(1000)
        .style("opacity", 0);
    }

    // Collapse child nodes on click.
    function collapse(d) {
      if (d.children) {
          d._children = d.children;
          d._children.forEach(collapse);
          d.children = null;
            }
    }

    // How to watch more than one thing at once?
    $scope.$watch('vm.filter', function(newVal, oldVaL) {
      // console.log('i can haz vm.filter:', newVal);
    })

    $scope.$watch('vm.class', function (newVal, oldVaL) {
      if (newVal) {
        var selectedClass = newVal
        filterOptions.class = newVal

        //select the links of that class
        d3.selectAll('link')
          .transition()
          .duration(150)
          .style("stroke", "red")
      }
    })

    $scope.$watch('vm.habitat', function(newVal, oldVaL) {
      if (newVal) {
        var selectedHabitat = newVal
        filterOptions.habitat = newVal

        // Select the nodes that match the filter and modify them
        d3.selectAll('circle')
          .transition()
          .duration(150)
          .attr("r", function(d) {
            if  (matchFilter(d, filterOptions)) {
              return dendrogramService.config.node.selectedSize
            }
            return dendrogramService.config.node.initialSize
          })

        // Modify the appearance of the text as well
        d3.selectAll('.node-name')
          .transition()
          .duration(150)
          .style('fill', function(d) {
            if  (matchFilter(d, filterOptions)) {
              return dendrogramService.config.text.selectedOpacity
            }
            return dendrogramService.config.text.initialOpacity
          })
      }
    })

    $scope.$watch('vm.taxonrank', function(newVal, oldVaL) {
      if (newVal) {
        var selectedTaxonRank = newVal
        filterOptions.taxonRank = newVal
        console.log("taxon rank changed", newVal)

        // Select the nodes that match the filter and modify them
        d3.selectAll('circle')
          .transition()
          .duration(150)
          .attr("r", function(d) {
            if  (matchFilter(d, filterOptions)) {
              return dendrogramService.config.node.selectedSize
            }
            return dendrogramService.config.node.initialSize
          })
      }
    })
        // Modify the appearance of the text as well
        d3.selectAll('.node-name')
          .transition()
          .duration(150)
          .style('opacity', function(d) {
            if  (matchFilter(d, filterOptions)) {
              return dendrogramService.config.text.selectedOpacity
            }
            return dendrogramService.config.text.initialOpacity
          })

    });
  }
 }

 function matchFilter(d, filterOptions) {
  //  console.log(filterOptions);
   if (
     d.description === filterOptions.habitat |
     d.taxonrank === filterOptions.taxonRank |
     d.name === filterOptions.filter
   ) {
     console.log(d.name, filterOptions.taxonRank);
     return true
   }
   return false
 }

})();
