'use strict';

angular.module('investorSearchApp')
  .factory('Search', function ($http) {

    var Search = {
      // hit route that queries MySQL here:
      getInvestors: function(constraints){
        console.log("constraints");
        console.log(constraints);
        var getInvestorsPromise = $http.post('/api/search', constraints).success(function(investors, status) {
          return investors;
        });
        return getInvestorsPromise;
      }
    }
    return Search;


  });
