angular.module('app.auth', ['auth0'])
  .config(function(authProvider) {

    // routing configuration and other stuff
    // ...

    authProvider.init({
      domain: AUTH0_DOMAIN,
      clientID: AUTH0_CLIENT_ID,
      loginUrl: '/login'
    });
  })
  .run(function(auth) {
    auth.hookEvents();
  });
