/* globals _ */
'use strict';

angular.module('d3chartsApp')
  .controller('MainCtrl', function($scope, $http, /* jshint unused: vars */ $routeParams) {
    $scope.renderers = [
      'line',
      'bar',
      'scatterplot',
      'area'
    ];
    $scope.renderer = 'line';

    $scope.sightingsByDate = [{
      x: 0,
      y: 0,
      y0: 0
    }];

    $http.get('data/sightings.json').success(function(result) {

      var sightings = _(result)
        .chain()
        .map(function(sighting) {
          return {
            reportedAt: new Date(sighting.reportedAt.$date),
            sightedAt: new Date(sighting.sightedAt.$date),
          };
        })
        .sortBy(function(sighting) {
          return sighting.sightedAt.getTime();
        })
        .value();

      $scope.sightingsByDate = _(sightings)
        .chain()
        .countBy(function(sighting) {
          return sighting.sightedAt;
        })
        .pairs()
        .map(function(dateCount) {
          return {
            x: new Date(dateCount[0]).getTime() / 1000,
            y: dateCount[1]
          };
        })
        .value();

    });


  });
