angular.module('myApp')
       .controller('AuthCtrl', AuthCtrl);

    AuthCtrl.$inject = ['$rootScope', '$scope', '$location', 'authService'];

    function AuthCtrl($rootScope, $scope, $location, authService) {
        $scope.user = {
            "username": "",
            "email": "",
            "password": ""
        };
        $scope.register = function() {
            authService.register($scope.user)
                .then(function(user) {
                    authService.setUserInfo(user);
                    $location.path('/dash');
                    $rootScope.currentUser = authService.getUserID();
                })
                .catch(function(err) {
                    $scope.err = true;
                    console.log(err);
                });
        };
        $scope.logUser = {
            email: '',
            password: ''
        };
        $scope.login = function() {
            authService.login($scope.logUser)
            .then(function(user) {
                authService.setUserInfo(user);
                $location.path('/dash');
                $rootScope.currentUser = authService.getUserID();
            })
            .catch(function(err) {
                $scope.err = true;
                console.log(err);
            });
        };
    }
