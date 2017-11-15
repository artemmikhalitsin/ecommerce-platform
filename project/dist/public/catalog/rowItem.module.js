'use strict';

var rowItem = angular.module('rowItem', []);

rowItem.component('rowItem', {
  bindings: {
    product: '<',
    index: '='
  },
  templateUrl: '/catalog/rowItem.html',

  controller: function controller($scope) {
    $scope.editMode = false;
    $scope.showMore = false;
    $scope.toggle = function () {
      $scope.showMore = !$scope.showMore;
    }, $scope.editDescription = function () {
      $scope.editMode = true;
      $scope.showMore = false;
    }, $scope.saveDescription = function () {
      $scope.$emit('updateDescription', $scope.$ctrl.product, $scope.$ctrl.index);
      $scope.editMode = false;
    };

    $scope.isLaptop = function () {
      return $scope.$ctrl.product.type === 'laptop';
    };
    $scope.isDesktop = function () {
      return $scope.$ctrl.product.type === 'desktop';
    };
    $scope.isTablet = function () {
      return $scope.$ctrl.product.type === 'tablet';
    };
    $scope.isMonitor = function () {
      return $scope.$ctrl.product.type === 'monitor';
    };
  }

});

rowItem.config(function ($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});