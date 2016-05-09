angular.module('myApp')
       .controller('AuthCtrl', AuthCtrl);

    AuthCtrl.$inject = ['$rootScope', '$scope', '$location', '$http', 'authService'];

    function AuthCtrl($rootScope, $scope, $location, $http, authService) {
        $scope.user = {
            "username": "",
            "email": "",
            "password": ""
        };
        $scope.err = false;

        $scope.luser = {
                email: '',
                password: ''
            };
        $scope.login = function() {
            authService.login($scope.luser)
            .then(function(user) {
                console.log(user);
                authService.setUserInfoLogin(user);
                $location.path('/members');
                $rootScope.currentUser = authService.getUserInfo();
            })
            .catch(function(err) {
                $scope.err = true;
                console.log(err);
            });
        };
        geoService.getCurrentPosition()
            .then(function(position) {
                console.log(position.coords);
                $scope.user.address.geo.lng = position.coords.longitude;
                $scope.user.address.geo.lat = position.coords.latitude;
            })
            .catch(function(err) {
                console.log("geoService getCurrentPosition err: ", err);
            })


        $scope.register = function() {
            $scope.user.slug = $scope.user.username + '-8111';
        //if user accepts using geolocation, send $http.post
            if ($scope.user.address.geo.lng && $scope.user.address.geo.lat) {
                authService.register($scope.user)
                    .then(function(user) {
                        authService.setUserInfo(user);
                        $location.path('/profile');
                        $rootScope.currentUser = authService.getUserInfo();
                    })
                    .catch(function(err) {
                        $scope.err = true;
                        console.log(err);
                    });
            } else {
            //otherwise, make an api call to ziplocate.us/api/v1/+$scope.user.address.zip
            //then post to auth endpoint
                $http({
                    url: 'http://ziplocate.us/api/v1/'+$scope.user.address.zipcode,
                    method: 'GET'
                })
                     .then(function(data) {
                        $scope.user.address.geo.lng = data.lng;
                        $scope.user.address.geo.lat = data.lat;
                     })
                     .then(function() {
                        authService.register($scope.user)
                            .then(function(user) {
                                authService.setUserInfo(user);
                                $location.path('/profile');
                                $rootScope.currentUser = authService.getUserInfo();
                            })
                            .catch(function(err) {
                                $scope.err = true;
                                console.log(err);
                            });
                     })
                     .catch(function(err) {
                        console.log(err);
                        $scope.err = true;
                     })
            }
        };
    }
