

angular.module('myApp')
       .service('dashService', ['$http', function($http) {
            return {
                getUserDecks: function(userID) {
                    return $http.get('/api/decks/'+userID)
                }
            }
        }])
