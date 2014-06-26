'use strict';

angular.module('investorSearchApp')
  .controller('SearchCtrl', function ($scope, Search) {
    $scope.constraints = [{text: ''}];

    $scope.addField = function() {
      $scope.constraints.push({text: ''});
    };
    $scope.removeField = function(index) {
      $scope.constraints.splice(index, 1);
    };
    $scope.search = function(){
      // call search service here with constraints array
      Search.getInvestors($scope.constraints).then(function(investorsFromPromise) {
        $scope.investors = investorsFromPromise.data;
        console.log($scope.investors);
      });
    }

    // $scope.search = function() {
    //   $scope.investors = Search.fakeInvestors();
    //   console.log($scope.investors[0].name);
    // }


  });
