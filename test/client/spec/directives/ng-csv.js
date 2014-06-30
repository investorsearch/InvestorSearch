'use strict';

describe('Directive: ngCsv', function () {

  // load the directive's module
  beforeEach(module('investorSearchApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ng-csv></ng-csv>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ngCsv directive');
  }));
});
