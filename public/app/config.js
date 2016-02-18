angular.module('app')
.config(['$stateProvider', '$urlRouterProvider', configRoutes])

function configRoutes($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/dendrogram/dendrogram.html'
    })
    .state('bookmarks', {
      url: '/bookmarks',
      templateUrl: 'app/bookmarks/bookmarks.html',
      controller: 'bookmarksController as bookmarks'
    })

    $urlRouterProvider.otherwise('/')
}
