'use strict';

angular.module('investorSearchApp')
  .controller('HiderCtrl', function ($scope, $http) {
    $.fn.scrollStopped = function(callback) {
        $(this).scroll(function(){
            var self = this, $this = $(self);
            if ($this.data('scrollTimeout')) {
              clearTimeout($this.data('scrollTimeout'));
            }
            $this.data('scrollTimeout', setTimeout(callback,250,self));
        });
    };


    $(window).scroll(function(){
       $('.header').slideUp("fast");
    });

    $(window).scrollStopped(function(){
      $('.header').show("fast");
});

  });
