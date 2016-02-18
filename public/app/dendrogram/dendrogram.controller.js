(function() {
  angular.module('app')
  .controller('DendrogramController', [DendrogramController])

  function DendrogramController() {
    var vm = this
    vm.filter = ''
    vm.habitat = ''
    vm.data = 'whatever'
  }
})()
