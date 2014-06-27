'use strict';

angular.module('investorSearchApp')
  .factory('Autocomplete', function ($http){

    var Autocomplete = {
      company: function(value){
        return $http.post('/api/companies/'+value).then(function(companies, status) {
          console.log('success for hitting companies route');
          return companies;
        });
      },
      market: function(value){
        return $http.post('/api/markets/'+value).then(function(markets, status) {
          console.log('success for hitting markets route');
          return markets;
        });
      }
    }
    return Autocomplete;

  });
