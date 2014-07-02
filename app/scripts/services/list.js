'use strict';

angular.module('investorSearchApp')
  .factory('List', function ($http, $rootScope) {

    var List = {
      show: function(){
        var showPromise = $http.get('/api/list').success(function(list) {
            return list;
          });
        return showPromise;
      },
      addInvestor: function(id){
        var addPromise = $http.get('/api/addInvestor/'+id).success(function(investor) {
            return investor;
          });
        return addPromise;
      },
      removeInvestor: function(id){
        var removePromise = $http.get('/api/removeInvestor/'+id).success(function(investor) {
            return investor;
          });
        return removePromise;
      }
    }


    return List;


  });
