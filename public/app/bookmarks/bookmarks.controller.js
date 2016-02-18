angular.module('app')
.controller('bookmarksController', ['$http', 'bookmarksService', bookmarksController])

function bookmarksController($http, bookmarksService) {
  var vm = this
  // console.log(bookmarksService.getBookmarks());
  bookmarksService.getBookmarks()
    .then(function(data) {
      vm.bookmarks = data
    })
}
