'use strict';

angular.module('investorSearchApp')
  .factory('List', function ($http, $rootScope) {

    var List = {
      // hit route that queries MySQL here:
      create: function(investor, title){
        var filteredInvestors = [];
        for(var i = 0; i < investor.length; i++){
          console.log("hidden: " + investor[i].hidden)
          filteredInvestors.push({'id': investor[i].id, 'search_reason': investor[i].search_reason, hidden: investor[i].hidden});
        }
        var info = {
          investors: filteredInvestors,
          tableName: title
        };

        console.log(info);
        var createListPromise = $http.post('/api/list/create', info).success(function(investors, status) {
          return investors;
        });
        return createListPromise;
      },

      getAll: function(){
        var getListsPromise = $http.get('/api/list/all').success(function(lists) {
          console.log(lists);
          return lists;
        });
        return getListsPromise;
      },

      show: function(id){
        var showPromise = $http.get('/api/list/'+id).success(function(list) {
            console.log(list);
            return list;
          });
        return showPromise;
      }
    }


    return List;


  });
