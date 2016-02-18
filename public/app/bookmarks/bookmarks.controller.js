angular.module('app')
.controller('bookmarksController', ['$http', 'bookmarksService', bookmarksController])

function bookmarksController($http, bookmarksService) {
  var vm = this
  // console.log(bookmarksService.getBookmarks());
  bookmarksService.getBookmarks()
    .then(function(data) {
      // console.log(data[0].title);
      // console.log(data[0].notes);
      // console.log(data[0].date);
      // console.log(JSON.stringify(data[0]))
      console.log(data[0])
      // vm.bookmarks = [
      //     {
      //       title: "some title"
      //     },
      //     {
      //       title: "another title"
      //     }
      //   ]

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
