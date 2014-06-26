'use strict';

angular.module('investorSearchApp')
  .controller('SearchCtrl', function ($scope, Search, Autocomplete) {
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
    };

    $scope.completeCompanies = function(value) {
      var returnedCompanyNames = [];
      var allCompanies = []

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
      })

    }



  });
