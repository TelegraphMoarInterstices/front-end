angular.module('app.auth').controller('UserInfoCtrl', function(auth) {
  // Using a promise
  auth.profilePromise.then(function(profile) {
    $scope.profile = profile;
  });
  // Or using the object
  $scope.profile = auth.profile;
});
