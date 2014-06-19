'use strict';

angular.module('investorSearchApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
