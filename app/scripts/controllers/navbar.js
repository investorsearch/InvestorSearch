'use strict';

angular.module('investorSearchApp')
  .controller('NavbarCtrl', function ($scope, $location, $rootScope, Auth) {
    $scope.menu = [{
      'title': 'Settings',
      'link': '/settings'
    }];

    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $rootScope.highlight = function() {
      console.log("turning red")
      $('.counter').addClass('highlight');
      setTimeout(function(){
        $('.counter').removeClass('highlight');
      }, 300);
    }
  });
