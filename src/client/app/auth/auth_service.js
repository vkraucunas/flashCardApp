(function () {

  'use strict';

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
      getUserInfo: function(userData) {
        return $window.localStorage.getItem('user');
      }
    };
  }

})();
