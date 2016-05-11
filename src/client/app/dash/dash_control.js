angular.module('myApp')
       .controller('DashCtrl', DashCtrl);

    DashCtrl.$inject = ['$rootScope', '$scope', 'authService', 'dashService'];

    function DashCtrl($rootScope, $scope, authService, dashService) {
        $scope.decks;
        $scope.userID = (function() {
            return authService.getUserID();
        })();
        $scope.getDecks = (function() {
            dashService.getUserDecks($scope.userID)
            .then(function(response) {
                response = response.data.decks;
                $scope.decks = response;
            })
        })();
        $scope.deckID;
        $scope.setDeckID = function(id) {
            $scope.deckID = id;
        }
        // $scope.getSingleDeck = function() {
        //     dashService.getSingleDeck($scope.deckID)
        //     .then(function(response) {
        //         console.log(response);
        //     })
        // };

    }
