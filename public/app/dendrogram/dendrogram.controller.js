(function() {
  angular.module('app')
  .controller('DendrogramController', ['bookmarksService', '$stateParams', DendrogramController])

  function DendrogramController(bookmarksService, $stateParams) {
    var vm = this

    vm.bookmarkId = $stateParams.bookmarkId
    console.log('bookmarkId', vm.bookmarkId);
    vm.data = 'whatever'
    vm.filter = ''
    vm.habitat = ''
    vm.classtype = ''

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
