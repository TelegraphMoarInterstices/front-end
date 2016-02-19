(function(){
  angular.module('app')
  .directive('dendrogram2', ['dendrogramService', dendrogram])

  function dendrogram(dendrogramService) {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="dendrogram"></div>',
      scope: {
        filter: '=',
        habitat: '='
      },
      link: drawTreeOfLife,
      controller: 'DendrogramController',
      controllerAs: 'vm',
      bindToController: true
    }

    function drawTreeOfLife($scope, $element, $attr){
      d3.json("./treeData2.json", function(error, data) {
        if (error) return console.warn(error);

      //tooltip
      // var tooltip = dendrogramService.initializeTooltip()

      //setting diameter variable
      var diameter = dendrogramService.config.diameter

      //convention with d3 seems to be to set margins as well
      var margin = {top: 20, right: 10, bottom: 20, left: 10},
          width = diameter,
          height = diameter;

      //this sets the durations for the transitions when nodes collapse and expand in ms
      var i = 0,
          duration = 350,
          root;


      //this is the where the tree shap is created with size being a fraction of
      //diameter along with the relationships between nodes
      var tree = d3.layout.tree()
          .size([360, diameter / 1-120])
          .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

      //sets the diagonoal projection for the dendrogram
      var diagonal = d3.svg.diagonal.radial()
          .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

      //trying to integrate vz variable structure from Zach's angular + d3 solution
      var svg = d3.select($element[0]).append("svg")
          .attr("width", width)
          .attr("height", height)
        .append("g")
          .attr("transform", "translate(" + diameter / 3 + "," + diameter / 2.8 + ")");

      //we need to set root equal to a variable, in my working example var life = a
      //big XML of data, need to figure out how to pull this from a JSON
      root = data;

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
        nodes.forEach(function(d) { d.y = d.depth * 80; });

        //update the nodes  ...
        var node = svg.selectAll("g.node")
            .data(nodes, function (d) {return d.id || (d.id = ++i); });

        //enter any new node at the parent's previous position.
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            //.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
            .on("click", click);

        //adding circles to nodes
        nodeEnter.append("circle")
            .attr("r", 1e-6)
            .style("fill", function(d) { return d._children ? "orange" : "#fff"; });

        //adding text and setting attributes
        nodeEnter.append("text")
            .attr("x", 10 )
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .attr("transform", function(d) { return d.x < 180 ? "translate(-2)" : "rotate(360)translate(2)"; })
            // .attr("transform", function(d) { return d.x < 180 ? "translate(0)" : "rotate(180)translate(-" + (d.name.length * 8.5)  + ")"; })
            .text(function(d) { return d.name; })
            .style("fill-opacity", 1e-6);

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

        nodeUpdate.select("circle")
            .attr("r", 1.5)
            .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

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
            .attr("r", 1e-6);

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

      // Collapse child nodes on click.
      function collapse(d) {
        if (d.children) {
            d._children = d.children;
            d._children.forEach(collapse);
            d.children = null;
              }
      }
      });

      $scope.$watch('vm.habitat', function(newVal, oldVal) {
        if (newVal) {
          var selectedHabitat = newVal
          var filterOptions = {
            habitat: newVal
          }
          // Select the nodes that match the filter and modify them
          d3.selectAll('circle')
            .transition()
            .duration(150)
            .attr("r", function(d) {
              if  (matchFilter(d, filterOptions)) {
                return 15
              }
              return 2
            })
          // Modify the appearance of the text as well
          d3.selectAll('.node-name')
            .transition()
            .duration(150)
            .style('opacity', function(d) {
              if  (matchFilter(d, filterOptions)) {
                return 1
              }
              return 0.1
            })
        }
      })
    }

    function matchFilter(d, filterOptions) {
     if (
       d.habitat === filterOptions.habitat &&
       true // put another criteria here
     ) {
       return true
     }
     return false
   }
  }
})()
