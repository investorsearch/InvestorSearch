'use strict';

angular.module('investorSearchApp')
  .factory('Autocomplete', function ($http){

    var Autocomplete = {
      company: function(value){
        return $http.post('/api/companies/'+value).then(function(companies, status) {
          console.log('success for hitting companies route');
          return companies;
        });
      }
    }
    return Autocomplete;

  });
