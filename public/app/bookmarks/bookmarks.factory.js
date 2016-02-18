angular.module('app')
.factory('bookmarksService', ['$http', bookmarksService])

function bookmarksService($http) {
  service = {
    getBookmarks: getBookmarks,
    createBookmark: createBookmark,
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

  function createBookmark(bookmark) {
    console.log('creating bookmark in the factory: ', bookmark)
    return $http({
        method: 'POST',
        url: 'https://twig-of-life.herokuapp.com/add_bookmark'
      })
      .then(function successCallback(response) {
        console.log('Successfully saved bookmark: ', response)
      }, function errorCallback(response) {
        console.log('Error saving bookmark: ', response);
      })
  }

  function deleteBookmark() {
    return $http.delete('http://whateverourserveriscalled')
      .then(function(result) {
        return result
      })
  }
}
