'use strict';

var monitorEntry = angular.module('monitorEntry', []);

monitorEntry.component('monitorEntry', {
  bindings: {
    monitor: '=',
    index: '='
  },
  templateUrl: '/inventory/product-entries/monitor-entry.html',
  controller: function controller($scope) {
    $scope.removeSerial = function (index) {
      $scope.$ctrl.monitor.serial_numbers.splice(index, 1);
    };
    $scope.removeMonitorEntry = function () {
      $scope.$emit('removeMonitor', $scope.$ctrl.index);
    };
  }
});

monitorEntry.config(function ($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});