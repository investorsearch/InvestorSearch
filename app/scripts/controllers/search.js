'use strict';

angular.module('investorSearchApp')
  .controller('SearchCtrl', function ($scope, $q, Search, Autocomplete, List) {
    $scope.constraints = [{text: ''}];
    $scope.selectedCompanies = [];
    $scope.selectedMarkets = [];
    $scope.investors = [];

    List.getAll().then(function(lists){
      console.log("The frontend got all of the lists");
      console.log(lists.data);
      $scope.lists = lists.data;
      console.log($scope.lists);
    })

    // $scope.addField = function() {
    //   $scope.constraints.push({text: ''});
    // };
    // $scope.removeField = function(index) {
    //   $scope.constraints.splice(index, 1);
    // };
    $scope.search = function(){
      //------------------------------- REAL SEARCH FUNCTION BELOW:
      console.log("companies in search");
      console.log($scope.companies);
      var constraints = {
        companies: $scope.selectedCompanies,
        markets: $scope.selectedMarkets
      };

      //show spinner
      $(".spinner").removeClass('ng-hide');

      // call search service here with constraints array
      Search.getInvestors(constraints).then(function(investorsFromPromise) {
        $scope.investors = investorsFromPromise.data;
        // remove spinner
        $(".spinner").addClass('ng-hide');
        console.log($scope.investors);
      });

    //---------------------------- FAKE SEARCH FUNCTION BELOW TO TEST RANKING

    // $scope.investors = [];
    // for(var i = 0; i < fake_investors.length; i++){
    //   if($scope.investors.indexOf(fake_investors[i]) === -1){
    //     $scope.investors.push(fake_investors[i]);
    //   } else if (fake_investors[i] === $scope.investors)
    // }

    };

    $scope.completeCompanies = function(value) {
      var deferred = $q.defer();
      var returnedCompanyNames = [];
      Autocomplete.company(value).then(function(companies){
        deferred.resolve(companies);
      });
      return deferred.promise;
    }

    $scope.completeMarkets = function(value) {
     var deferred = $q.defer();
      var returnedMarketNames = [];
      Autocomplete.market(value).then(function(markets){
        deferred.resolve(markets);
      });
      return deferred.promise;

    }

    $scope.createList = function(){
      console.log('creating list...');
      console.log($scope.investors);

      List.create($scope.investors, $scope.listName);

    }

    $scope.removeFromList = function(index){
      console.log('hiding investor');
      return $scope.investors[index].hidden = 1;
    }

    $scope.clear = function(){
      $scope.investors = [];
      $scope.selectedCompanies = [];
      $scope.selectedMarkets = [];
    }

    $scope.showList = function(id){
      List.show(id).then(function(investors){
        $scope.investors = investors.data;
      })
    }

    $scope.convertToCsvFormat = function(investors) {
      var exportableInvestors = investors.map(function(investor){
        var investorType;
        if (investor.type === "Startup") {
          investorType = "Firm";
        } else {
            investorType = "Individual";
          }

        return {
          name: investor.name,
          type: investorType,
          linkedIn: investor.linkedin_url,
          location: investor.location,
          about: investor.bio
        };
      });

      return exportableInvestors;
    }

  });
