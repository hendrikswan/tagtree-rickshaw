'use strict';

angular.module('d3chartsApp')
  .directive('rickshawChart', function () {
    return {
      scope: {
          data: '=',
          renderer: '='
      },        
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
          scope.$watchCollection('[data, renderer]', function(newVal, oldVal) {
            if (!newVal[0]) {
              return;
            }
            element[0].innerHTML = '';
            var graph = new Rickshaw.Graph({
                element: element[0],
                width: attrs.width,
                height: attrs.height,
                series: [{data: scope.data, color: attrs.color}],
                renderer: scope.renderer
            });


            var yAxis = new Rickshaw.Graph.Axis.Y({
                graph: graph
            });
            yAxis.render();     
            

            var xAxis = new Rickshaw.Graph.Axis.Time({
                graph: graph
            });
            xAxis.render(); 


            var hoverDetail = new Rickshaw.Graph.HoverDetail({
              graph: graph,
              formatter: function(series, x, y, formattedX, formattedY, d) {
                return formattedY;
              }
            });              

            graph.render();


          });
      }
    };
  });




