angular.module('app')
.factory('bookmarksService', bookmarksService)

function bookmarksService() {
  service = {
    getBookmarks: getBookmarks,
    createBookmarks: createBookmarks
  }
  return service

  /*** Implementation ***/
  function getBookmarks() {
    return ['one', 'two', 'three']
  }

  function createBookmarks() {}
  
}
