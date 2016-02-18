angular.module('app')
.controller('bookmarksController', ['$http', 'bookmarksService', bookmarksController])

function bookmarksController($http, bookmarksService) {
  var vm = this
  // console.log(bookmarksService.getBookmarks());
  bookmarksService.getBookmarks()
    .then(function(data) {
      vm.bookmarks = data
    })

  vm.delete = function() {
    console.log('dleeete.');
    bookmarksService.deleteBookmark()
      .then(function(result) {
        vm.message = 'Deleted'
      })
      .catch(function(error) {
        vm.message = 'Could not delete!'  
      })
  }
}
