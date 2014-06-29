'use strict';

angular.module('investorSearchApp')
  .controller('SearchCtrl', function ($scope, $q, Search, Autocomplete) {
    $scope.constraints = [{text: ''}];
    $scope.selectedCompanies = [];
    $scope.selectedMarkets = [];

    // $scope.addField = function() {
    //   $scope.constraints.push({text: ''});
    // };
    // $scope.removeField = function(index) {
    //   $scope.constraints.splice(index, 1);
    // };
    $scope.search = function(){
      console.log("companies in search");
      console.log($scope.companies);
      var constraints = {
        companies: $scope.selectedCompanies,
        markets: $scope.selectedMarkets
      };

      // call search service here with constraints array
      Search.getInvestors(constraints).then(function(investorsFromPromise) {
        $scope.investors = investorsFromPromise.data;
        console.log($scope.investors);
      });
    };

    $scope.completeCompanies = function(value) {
      var deferred = $q.defer();
      var returnedCompanyNames = [];
      Autocomplete.company(value).then(function(companies, headers){
        deferred.resolve(companies);
      });
      return deferred.promise;
    }

    $scope.completeMarkets = function(value) {
     var deferred = $q.defer();
      var returnedMarketNames = [];
      Autocomplete.market(value).then(function(markets, headers){
        deferred.resolve(markets);
      });
      return deferred.promise;

    }

  });
