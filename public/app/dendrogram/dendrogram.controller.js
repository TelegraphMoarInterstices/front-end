(function() {
  angular.module('app')
  .controller('DendrogramController', [DendrogramController])

  DendrogramController.$inject = ['dendrogramService']

  function DendrogramController(dendrogramService) {
    // var vm = this
    console.log(dendrogramService)
    // Maybe do an $http to retrieve json data here,
    // instead of using D3.json. Not sure which is best.
    // Right now, .data is not doing anything, obvs.
    // vm.data = 'whatever'
  }
})()
