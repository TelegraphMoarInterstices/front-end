(function() {
  angular.module('app')
  .controller('DendrogramController', ['bookmarksService', DendrogramController])

  function DendrogramController(bookmarksService, $scope) {
    var vm = this
    vm.data = 'whatever'
    vm.filter = ''
    vm.habitat = ''
    vm.taxonrank = ''

    vm.showBookmarkForm = false

    vm.createBookmark = function() {
      vm.showBookmarkForm = false
      // Several values are temporarily hardcoded
      var bookmark = {
        user_id: 1,
        title: this.bookmarkTitle,
        notes: this.bookmarkNote,
        search: {
          habitat: this.habitat,
          class: ['reptiles', 'birds']
        }
      }
      bookmarksService.createBookmark(bookmark)
    }
  }
})()
