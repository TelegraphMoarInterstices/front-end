(function() {
  angular.module('app')
  .factory('dendrogramService', dendrogramService)

  function dendrogramService() {
    // Config puts the tweakable parameters in one easy-to-deal-with spot
    var config = {
      diameter: 900
    }
    var service = {
      config: config,
      initializeSvg: initializeSvg,
      initializeTree: initializeTree,
      diagonal: diagonal,
      initializeTooltip: initializeTooltip
    }

    return service

    /*** Implementation ***/
    function initializeSvg(element) {
      // Set up the svg container for the visualization
      return d3.select(element[0])
      .append('svg')
      .attr('width', 800)
      .attr('height', 800)
      .append('svg:g')
      .attr('transform', 'translate(40, 0)')
    }

    function initializeTree(width, height) {
      return d3.layout.tree()
      .size([width, height])
    }

    function diagonal(type) {
      if (type === 'cartesian') {
        return d3.svg.diagonal()
        .projection(function(d) {return [d.y, d.x]})
      }
      if (type === 'radial') {
        return d3.svg.diagonal()
          .projection(function(d) {
            var r = d.y
            var a = (d.x - 90) / 180 * Math.PI;
            return [r * Math.cos(a), r * Math.sin(a)];
          })
      }
    }

    function initializeTooltip() {
      return d3.select("body").append("div")
       .attr("class", "tooltip")
       .style("opacity", 0);
    }
  }
})()
