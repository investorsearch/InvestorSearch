'use strict';

angular.module('investorSearchApp')
  .controller('SearchCtrl', function ($scope, Search, Autocomplete) {
    $scope.constraints = [{text: ''}];

    // $scope.addField = function() {
    //   $scope.constraints.push({text: ''});
    // };
    // $scope.removeField = function(index) {
    //   $scope.constraints.splice(index, 1);
    // };
    $scope.search = function(){
      var comps = [];
      for(var i = 0; i < $scope.companies.length;i++){
        comps.push($scope.companies[i].al_id);
      }
      // call search service here with constraints array
      Search.getInvestors(comps).then(function(investorsFromPromise) {
        $scope.investors = investorsFromPromise.data;
        console.log($scope.investors);
      });
    };

    $scope.completeCompanies = function(value) {
      var returnedCompanyNames = [];
      var allCompanies = [];

      Autocomplete.company(value).then(function(companies, headers){
        console.log('done');
        angular.forEach(companies.data, function(item){
          returnedCompanyNames.push({name: item.name, al_id: item.al_id});
          // console.log('about to flatten')
          // allCompanies =  allCompanies.concat.apply(allCompanies, returnedCompanyNames);
          //$scope.companies = allCompanies;
        })
        $scope.companies = returnedCompanyNames;
        console.log($scope.companies);
      });
    }

    $scope.completeMarkets = function(value) {
      var returnedMarketNames = [];
      var allMarkets = [];

      Autocomplete.market(value).then(function(markets, headers){
        console.log('done');
        angular.forEach(markets.data, function(item){
          returnedMarketNames.push({name: item.name, al_id: item.al_id});
          // console.log('about to flatten')
          // allCompanies =  allCompanies.concat.apply(allCompanies, returnedCompanyNames);
          //$scope.companies = allCompanies;
        })
        $scope.markets = returnedMarketNames;
        console.log($scope.markets);
      })

    }



  });
