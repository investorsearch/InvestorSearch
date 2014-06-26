'use strict';

describe('Service: Autocomplete', function () {

  // load the service's module
  beforeEach(module('investorSearchApp'));

  // instantiate service
  var Autocomplete;
  beforeEach(inject(function (_Autocomplete_) {
    Autocomplete = _Autocomplete_;
  }));

  it('should do something', function () {
    expect(!!Autocomplete).toBe(true);
  });

});
