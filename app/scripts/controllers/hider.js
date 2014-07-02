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

    if($(window).scrollTop() < 400){
        console.log("true");
        $('.footer').hide();
      }


    $(window).scroll(function(){
       $('.footer').slideUp("fast");
    });

    $(window).scrollStopped(function(){
      $('.footer').show("fast");

      if($(window).scrollTop() < 700){
        console.log("true");
        $('.footer').hide();
      }
});

  });
