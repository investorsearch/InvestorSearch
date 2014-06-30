'use strict';

angular.module('investorSearchApp')
  .controller('ListCtrl', function ($scope, List) {

    $scope.createList = function(){
      console.log('creating list...');
      console.log(investor);

      List.create(investor);

    }

    $scope.getLists = function(){
      List.getAll();
    }

  });
