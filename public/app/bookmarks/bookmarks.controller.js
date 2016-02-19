angular.module('app')
.controller('bookmarksController', ['$state', '$http', 'bookmarksService', bookmarksController])

function bookmarksController($state, $http, bookmarksService) {
  var vm = this
  bookmarksService.getBookmarks()
    .then(function(data) {
      vm.bookmarks = data
      // If the user did not specify a title, generate one
      vm.bookmarks.forEach(function(bookmark) {
        if (!bookmark.title) {
          bookmark.title = "Bookmark " + bookmark.id
        }
      })
    })

  vm.view = function(bookmark) {
    console.log(bookmark);
    // Set currentView = bookmark in the bm service
    // This is exposed to the dendrogram directive, and drives the display of that view.
    bookmarksService.currentView = bookmark

    // Go to dendrogram view
    $state.go('home', { bookmarkId: bookmark.id})
  }

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
