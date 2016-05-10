angular.module('myApp', [ 'ui.router'])
       .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
          $urlRouterProvider.otherwise("/");
          $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'templates/home.html',
                restricted: false,
                preventLoggedIn: true
            })
            .state('register', {
                url: '/register',
                templateUrl: 'templates/register.html',
                controller: 'AuthCtrl',
                restricted: false,
                preventLoggedIn: true
            })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: "AuthCtrl",
                restricted: false,
                preventLoggedIn: true
            })
            .state('dash', {
                url: '/dash',
                templateUrl: 'templates/dash.html',
                controller: 'DashCtrl',
                restricted: true,
                preventLoggedIn: false
            })
            .state('dash.deck-preview', {
                url: '/deck/:deckID',
                templateUrl: 'templates/deck-preview.html',
                controller: 'DashCtrl',
                restricted: true,
                preventLoggedIn: false
            })
            // .state('profile', {
            //     url: '/profile',
            //     templateUrl: 'templates/profile.html',
            //     controller: SingleCtrl,
            //     restricted: true,
            //     preventLoggedIn: false
            // })
            // // .state('members.search', {
            // //     url: '/search',
            // //     templateUrl: 'templates/search.html',
            // //     controller: SearchCtrl
            // // })
            .state('logout', {
                url: '/logout',
                restricted: false,
                preventLoggedIn: false,
                resolve: {
                    test: function(authService, $rootScope, $location) {
                        authService.logout();
                        $rootScope.currentUser = authService.getUserID();
                        $location.path('/');
                    }
                }
            })
            $httpProvider.interceptors.push('authInterceptor');
        })
        .run(routeChange);

  function routeChange($rootScope, $location, $window, authService) {
    $rootScope.$on('$stateChangeStart', function(event, next, current) {
      // if route us restricted and no token is present
      if(next.restricted && !$window.localStorage.getItem('token')) {
        $location.path('/login');
      }
      // if token and prevent logging in is true
      if(next.preventLoggedIn && $window.localStorage.getItem('token')) {
        $location.path('/dash');
      }
    });
  }
