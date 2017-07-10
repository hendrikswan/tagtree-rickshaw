'use strict';

describe('Directive: rickshawChart', function () {

  // load the directive's module
  beforeEach(module('d3chartsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<rickshaw-chart></rickshaw-chart>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('');
  }));
});
