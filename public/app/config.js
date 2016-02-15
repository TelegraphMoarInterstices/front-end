angular.module('app')
.config(['$stateProvider', '$urlRouterProvider', configRoutes])

function configRoutes($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/layout/dendrogram.html'
    })
    .state('bookmarks', {
      url: '/bookmarks',
      templateUrl: 'app/layout/bookmarks.html'
    })

    $urlRouterProvider.otherwise('/')
}
