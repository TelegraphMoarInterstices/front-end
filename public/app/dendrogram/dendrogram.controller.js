(function() {
  angular.module('app')
  .controller('DendrogramController', [DendrogramController])

  function DendrogramController($scope) {
    var vm = this
    vm.data = 'whatever'
    vm.filter = ''
    vm.habitat = ''
  }
})()
