'use strict';

var debugMode = true;
describe('Directive: rickshawChart', function() {

  // load the directive's module
  beforeEach(module('d3chartsApp'));

  describe('multiple charts', function() {
    var element, scope, compileFunction;

    beforeEach(inject(function($rootScope, $compile) {
      scope = $rootScope.$new();
      scope.sightingsByDate = [{
        x: 1199145600,
        y: 39,
        y0: 0
      }, {
        x: 1199232000,
        y: 13,
        y0: 0
      }];
      scope.sightingsByDate2 = [{
        x: 1199145600,
        y: 59,
        y0: 0
      }, {
        x: 1199232000,
        y: 30,
        y0: 0
      }];
      scope.renderers = [
        'line',
        'bar',
        'scatterplot',
        'area'
      ];
      scope.renderer = 'line';

      element = angular.element('<rickshaw-chart data="sightingsByDate" renderer="renderer" color="steelblue" width="700" height="450">' + 
        '</rickshaw-chart><rickshaw-chart data="sightingsByDate2" renderer="renderer" color="steelblue" width="700" height="450"></rickshaw-chart>');
      element = $compile(element)(scope);
      
      compileFunction = $compile(element);
      if (debugMode) {
        console.log('post compile', element.html()); // <== html here has {{}}
      }
    }));

    it('should make a chart element with only contents from scope', function() {
      inject(function() {
        compileFunction(scope); // <== the html {{}} are bound
         scope.$digest();
        if (!scope.$$phase) {
          scope.$digest(); // <== digest to get the render to show the bound values
        }

        if (debugMode) {
          console.log('post link', element.html());
          console.log('scope sightingsByDate ', scope.sightingsByDate);
          console.log(angular.element());
        }
        expect(angular.element(element.find('div')[0]).text().trim()).toEqual('');
        var svg = angular.element(element.find('svg'));
        expect(svg.length).toEqual(0);
        expect(angular.element(element.find('.detail')).length).toEqual(0);
      });
    });

  });

});
