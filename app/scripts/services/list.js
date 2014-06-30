'use strict';

angular.module('investorSearchApp')
  .factory('List', function ($http, $rootScope) {

    var List = {
      // hit route that queries MySQL here:
      create: function(investor){
        var filteredInvestors = [];
        for(var i = 0; i < investor.length; i++){
          filteredInvestors.push({'id': investor[i].id, 'search_reason': investor[i].search_reason});
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
