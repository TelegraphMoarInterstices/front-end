angular.module('app')
.controller('bookmarksController', ['bookmarksService', bookmarksController])

function bookmarksController(bookmarksService) {
  var vm = this
  vm.bookmarks = bookmarksService.getBookmarks()
}
