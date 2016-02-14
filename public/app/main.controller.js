(function() {
  angular.module('app')
  .controller('MainController', MainController)

  function MainController($scope) {
      //initial values
      $scope.data = [5, 10, 15, 20, 25, 17, 3, 46]
  }
})()
