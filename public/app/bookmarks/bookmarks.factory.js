angular.module('app')
.factory('bookmarksService', ['$http', bookmarksService])

function bookmarksService($http) {
  service = {
    getBookmarks: getBookmarks,
    createBookmarks: createBookmarks,
    deleteBookmark: deleteBookmark
  }
  return service

  /*** Implementation ***/
  function getBookmarks() {
    return $http.get('./app/bookmarks/bookmarks.json')
      .then(function(data){
        return data.data
      })
  }

  function createBookmarks() {}

  function deleteBookmark() {
    return $http.delete('http://whateverourserveriscalled')
      .then(function(result) {
        return result
      })
  }
}
