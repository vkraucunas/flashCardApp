angular.module('myApp')
       .controller('AuthCtrl', AuthCtrl);

    AuthCtrl.$inject = ['$rootScope', '$scope', '$location', '$http', 'authService'];

    function AuthCtrl($rootScope, $scope, $location, $http, authService) {
        $scope.user = {
            "username": "",
            "email": "",
            "password": ""
        };
        $scope.register = function() {
            authService.register($scope.user)
                .then(function(user) {
                    authService.setUserInfo(user);
                    $location.path('/main');
                    $rootScope.currentUser = authService.getUserInfo();
                })
                .catch(function(err) {
                    $scope.err = true;
                    console.log(err);
                });
            }

        $scope.logUser = {
            email: '',
            password: ''
        };
        $scope.login = function() {
            authService.login($scope.logUser)
            .then(function(user) {
                console.log(user);
                authService.setUserInfo(user);
                $location.path('/main');
                $rootScope.currentUser = authService.getUserInfo();
            })
            .catch(function(err) {
                $scope.err = true;
                console.log(err);
            });
        };
    }
