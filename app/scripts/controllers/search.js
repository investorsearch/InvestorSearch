'use strict';

angular.module('investorSearchApp')
  .controller('SearchCtrl', function ($scope, $q, $rootScope, Search, Autocomplete, List) {
    $scope.constraints = [{text: ''}];
    $scope.selectedCompanies = [];
    $scope.selectedMarkets = [];
    $scope.investors = [];
    $scope.querySearch = '';
    $scope.message = '';

    List.show().then(function(list){
      $scope.savedInvestors = list.data;
    });

    // $scope.$watchCollection('investors', function(newer, older){
    // if (newer.length > 0){
    //   $('.submitBtn').attr("disabled", "disabled");
    // } else {
    //   $('.submitBtn').removeAttr("disabled");
    // }
 // });
    $rootScope.scrollToAnchor = function(aid){
      var aTag = $("a[name='"+ aid +"']");
      $('html,body').animate({scrollTop: aTag.offset().top},1000);
    }

    $scope.search = function(){
      var constraints = {
        companies: $scope.selectedCompanies,
        markets: $scope.selectedMarkets
      };

      //show spinner
      $(".spinner").removeClass('ng-hide');
      $('.submitBtn').attr("disabled", "disabled");

      // call search service here with constraints array
      Search.getInvestors(constraints).then(function(investorsFromPromise) {
        if(investorsFromPromise.data.length === 0){
          $scope.message = "No results have returned from your search critera. Please try a new search."
        }
        $scope.investors = investorsFromPromise.data;
        // remove spinner
        $('.submitBtn').removeAttr("disabled");
        $(".spinner").addClass('ng-hide');
        $scope.scrollToAnchor('results');
        console.log($scope.investors);
      });
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



    $scope.clear = function(){
      $scope.investors = [];
      $scope.selectedCompanies = [];
      $scope.selectedMarkets = [];
    }

    // $scope.showList = function(){
    //   List.show().then(function(investors){
    //     $scope.investors = investors.data;
    //   });
    // };

    $scope.addInvestorToList = function(id){
      List.addInvestor(id).then(function(investor){
        for(var i = 0; i < $scope.investors.length; i++){
          if($scope.investors[i].id === id){
            $scope.investors.splice(i, 1);
            $rootScope.highlight();
          }
        }
      })
      List.show().then(function(list){
      $scope.savedInvestors = list.data;
    });

    };

    $scope.removeInvestorFromList = function(id){
      List.removeInvestor(id).then(function(investor){
        for(var i = 0; i < $scope.savedInvestors.length; i++){
          if($scope.savedInvestors[i].id === id){
            $scope.savedInvestors.splice(i, 1);
            $rootScope.highlight();
          }
        }
      });
    };

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
    };

    $scope.showSearchReasons = function(search_reasons){
      var marketReasons = [];
      var companyReasons = [];
      var returnedOutput = '';

      search_reasons.forEach(function(search_reason){
        if(typeof search_reason.market !== 'undefined'){
          marketReasons.push(search_reason.market);
        } else if(typeof search_reason.company != 'undefined'){
          companyReasons.push(search_reason.company);
        }
      });

     if(marketReasons.length > 0){
        var returnedMarketReasons = marketReasons.join(', ');
        returnedOutput += 'Interested in ' + marketReasons.join(', ') + '. ';
     }
     if(companyReasons.length > 0){
        var companyMarketReasons = companyReasons.join(', ');
        // if(marketReasons.length > 0){returnedOutput += '\n\n'};
        returnedOutput += 'Invested in ' + companyReasons.join(', ') + '.';
     }

     return returnedOutput;
  }

});
