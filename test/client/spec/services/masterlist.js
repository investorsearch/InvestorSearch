'use strict';

describe('Service: Masterlist', function () {

  // load the service's module
  beforeEach(module('investorSearchApp'));

  // instantiate service
  var Masterlist;
  beforeEach(inject(function (_Masterlist_) {
    Masterlist = _Masterlist_;
  }));

  it('should do something', function () {
    expect(!!Masterlist).toBe(true);
  });

});
