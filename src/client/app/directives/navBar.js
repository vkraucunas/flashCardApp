angular.module('myApp')
       .directive('navBar', function() {
            return {
                restrict: 'E',
                transclude: true,
                scope: {},
                templateUrl: './navBar.html'

            }
        })