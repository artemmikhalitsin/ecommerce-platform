'use strict';

var desktopEntry = angular.module('desktopEntry', []);

desktopEntry.component('desktopEntry', {
  bindings: {
    desktop: '=',
    index: '='
  },
  templateUrl: '/inventory/product-entries/desktop-entry.html',
  controller: function controller($scope) {
    $scope.removeSerial = function (index) {
      $scope.$ctrl.desktop.serial_numbers.splice(index, 1);
    };
    $scope.removeDesktopEntry = function () {
      $scope.$emit('removeDesktop', $scope.$ctrl.index);
    };
  }
});

desktopEntry.config(function ($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});