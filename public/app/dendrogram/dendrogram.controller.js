(function() {
  angular.module('app')
  .controller('DendrogramController', ['bookmarksService', DendrogramController])

  function DendrogramController(bookmarksService, $scope) {
    var vm = this
    vm.data = 'whatever'
    vm.filter = ''
    vm.habitat = ''
    vm.createBookmark = function() {
      // Several values are temporarily hardcoded
      var bookmark = {
        user_id: 1,
        search: {
          habitat: this.habitat
        },
        notes: "This is a note on the bookmark."
      }
      bookmarksService.createBookmark(bookmark)
    }
  }
})()
