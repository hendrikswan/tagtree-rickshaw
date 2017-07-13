/* globals Rickshaw */
'use strict';

angular.module('d3chartsApp')
  .directive('rickshawChart', function() {
    var graph;
    var yAxis;
    var xAxis;

    /**
     * Based on example of D3 in Angular
     * https://github.com/3DGenomes/angular-d3js
     */
    var link = function postLink(scope, element, attrs) {
      // execute properly within Angular scope life cycle
      scope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if (phase === '$apply' || phase === '$digest') {
          if (fn && (typeof(fn) === 'function')) {
            fn();
          }
        } else {
          this.$apply(fn);
        }
      };

      graph = graph || new Rickshaw.Graph({
        element: element[0],
        width: attrs.width,
        height: attrs.height,
        series: [{
          data: scope.data,
          color: attrs.color
        }],
        renderer: scope.renderer
      });

      yAxis = yAxis || new Rickshaw.Graph.Axis.Y({
        graph: graph
      });

      xAxis = xAxis || new Rickshaw.Graph.Axis.Time({
        graph: graph
      });

      var hover = hover || new Rickshaw.Graph.HoverDetail({
        graph: graph,
        formatter: function(series, x, y, formattedX, formattedY, /* jshint unused: vars */ d) {
          return formattedY;
        }
      });

      scope.render = function() {
        scope.safeApply(function() {
          yAxis.render();
          xAxis.render();
          graph.setRenderer(scope.renderer);
          graph.series[0].data = scope.data || [{
            x: 10,
            y: 10
          }];
          graph.render();
        });
      };

      scope.$watchCollection('[data, renderer]', function(newVal, /* jshint unused: vars */ oldVal) {
        if (newVal[0] && scope.data === newVal[0]) {
          scope.data = newVal[0];
        }
        if (newVal[1] && scope.renderer === newVal[1]) {
          scope.renderer = newVal[1];
        }
        scope.render();
      });

      /* 
       * component ie. directive === parentNode
       */
      var component = element[0].parentNode;
      // render D3 chart on initialize and resize 
      scope.$watch(function() {
        var w = component.clientWidth;
        var h = component.clientHeight;
        return w + h;
      }, function() {
        graph.width = component.clientWidth;
        graph.height = component.clientHeight;
        scope.render();
      });

    };

    return {
      scope: {
        data: '=',
        renderer: '='
      },
      template: '<div></div>',
      restrict: 'E',
      link: link
    };
  });
