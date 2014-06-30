'use strict';

angular.module('investorSearchApp')
  .factory('List', function ($http, $rootScope) {

    var List = {
      // hit route that queries MySQL here:
      create: function(investor){
        var filteredInvestors = [];
        for(var i = 0; i < investor.length; i++){
          console.log("hidden: " + investor[i].hidden)
          filteredInvestors.push({'id': investor[i].id, 'search_reason': investor[i].search_reason, hidden: investor[i].hidden});
        }
        var info = {
          investors: filteredInvestors,
          tableName: "untitled"
        };

        console.log(info);
        var createListPromise = $http.post('/api/list/create', info).success(function(investors, status) {
          return investors;
        });
        return createListPromise;
      }
    }
    return List;


  });
