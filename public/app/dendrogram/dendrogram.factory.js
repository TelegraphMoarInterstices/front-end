// This "factory" puts some useful dendrogram-related functions
// into the global space under the object 'dendrogramService'
// I know this is bad!
// This is meant to mock up an Angular factory until I can figure out
// how to get the real deal wired up.

var dendrogramService = {
  initialize: initializeSvg
}

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
