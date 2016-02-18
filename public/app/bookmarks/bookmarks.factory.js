angular.module('app')
.factory('bookmarksService', ['$http', bookmarksService])

function bookmarksService($http) {
  service = {
    getBookmarks: getBookmarks,
    createBookmark: createBookmark,
    deleteBookmark: deleteBookmark,
    getView: getView // get current view
  }
  return service

  /*** Implementation ***/
  function getBookmarks() {
    return $http.get('https://twig-of-life.herokuapp.com/api/user/1')
      .then(function(data){
        return data.data.bookmarks
      })
  }

  function createBookmark(bookmark) {
    console.log('creating bookmark in the factory: ', bookmark)
    return $http({
        method: 'POST',
        url: 'https://twig-of-life.herokuapp.com/add_bookmark',
        data: bookmark
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

  function getView() {
    return {
      habitat: 'ghost',
      filter: 'poof'
    }
    
  }

}
