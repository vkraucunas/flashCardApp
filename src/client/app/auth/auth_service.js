(function () {

  'use strict';

  /**
  1. login
  2. logout
  3. register
  4. set user info into localstorage
  5. get user info from localstorage
  **/

  angular.module('myApp')
    .service('authService', authService);

  authService.$inject = ['$http', '$window'];

  function authService($http, $window) {
    var user = {};
    return {
      login: function(user) {
        return $http.post('/api/auth/login', user);
      },
      logout: function(user) {
        user = null;
        $window.localStorage.clear();
      },
      register: function(user) {
        return $http.post('/api/auth/register', user);
      },
      setUserInfo: function(userData) {
        $window.localStorage.setItem('user', userData.data.data.user);
        $window.localStorage.setItem('token', userData.data.data.token);
      },
      setUserInfoLogin: function(userData) {
        $window.localStorage.setItem('user', JSON.stringify(userData.data.data.user.slug));
        $window.localStorage.setItem('token', JSON.stringify(userData.data.data.token));
      },
      getUserInfo: function(userData) {
        return $window.localStorage.getItem('user');
      },
      getLocation: function(userData) {
        var result = {
            lat: $window.localStorage.getItem('lat'),
            lng: $window.localStorage.getItem('lng')
        }
        return result;
      },

    };
  }

})();
