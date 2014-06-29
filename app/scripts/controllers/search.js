'use strict';

angular.module('investorSearchApp')
  .controller('SearchCtrl', function ($scope, $q, Search, Autocomplete) {
    $scope.constraints = [{text: ''}];
    $scope.selectedCompanies = [];
    $scope.selectedMarkets = [];

    $scope.investors = [
      {
        id: 1,
        al_id: 1,
        name: "Marc Andreesen",
        is_angel: 1,
        location: "San Francisco, CA",
        type: "Investor",
        bio: "I invest in things",
        image: 'https://s3.amazonaws.com/photos.angel.co/users/727-medium_jpg?1294803750'
      },
      {
        id: 1,
        al_id: 1,
        name: "Marc Andreesen",
        is_angel: 1,
        location: "San Francisco, CA",
        type: "Investor",
        bio: "I invest in things",
        image: 'https://s3.amazonaws.com/photos.angel.co/users/727-medium_jpg?1294803750'

      },
      {
        id: 3,
        al_id: 3,
        name: "Institutional Venture Partners",
        is_angel: null,
        location: "San Francisco, CA",
        type: "VC",
        bio: "I invest in things",
        image: 'https://s3.amazonaws.com/photos.angel.co/startups/i/46542-50efe21ce554564a23ee8d5fbcdf8491-medium_jpg.jpg?buster=1334276847'
      },
      {
        id: 2,
        al_id: 2,
        name: "Preston Ford",
        is_angel: 1,
        location: "Boston",
        type: "Investor",
        bio: "Founder @The Longview Group, @BlockCross Holdings • Studied at @MIT, @HBS",
         image: 'https://s3.amazonaws.com/photos.angel.co/users/133774-medium_jpg?1403116229'
      },

    ]

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

      // call search service here with constraints array
      Search.getInvestors(constraints).then(function(investorsFromPromise) {
        $scope.investors = investorsFromPromise.data;
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
