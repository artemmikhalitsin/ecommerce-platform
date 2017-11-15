'use strict';

var tabletEntry = angular.module('tabletEntry', []);

tabletEntry.component('tabletEntry', {
  bindings: {
    tablet: '=',
    index: '='
  },
  templateUrl: '/inventory/product-entries/tablet-entry.html',
  controller: function controller($scope) {
    $scope.removeSerial = function (index) {
      $scope.$ctrl.tablet.serial_numbers.splice(index, 1);
    };
    $scope.removeTabletEntry = function () {
      $scope.$emit('removeTablet', $scope.$ctrl.index);
    };
  }
});

tabletEntry.config(function ($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});