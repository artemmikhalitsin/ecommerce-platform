'use strict';

var newProduct = angular.module('newProduct', ['monitorForm', 'laptopForm', 'desktopForm', 'tabletForm', 'desktopEntry', 'monitorEntry', 'tabletEntry', 'laptopEntry']);
newProduct.controller('FormController', ['$scope', function ($scope) {
  //Scope variables
  $scope.selected = '';
  $scope.products = {
    tablets: [],
    desktops: [],
    laptops: [],
    monitors: []
    //Scope functions
  };$scope.removeDesktop = function (index) {
    $scope.products.desktops.splice(index, 1);
  };
  $scope.removeTablet = function (index) {
    $scope.products.tablets.splice(index, 1);
  };
  $scope.removeMonitor = function (index) {
    $scope.products.monitors.splice(index, 1);
  };
  $scope.removeLaptop = function (index) {
    $scope.products.laptops.splice(index, 1);
  };

  //Scope event handlers
  $scope.$on('newMonitor', function (event, item) {
    $scope.products.monitors.push(item);
  });
  $scope.$on('newTablet', function (event, item) {
    $scope.products.tablets.push(item);
  });
  $scope.$on('newLaptop', function (event, item) {
    $scope.products.laptops.push(item);
  });
  $scope.$on('newDesktop', function (event, item) {
    $scope.products.desktops.push(item);
  });
  $scope.$on('removeDesktop', function (event, index) {
    $scope.removeDesktop(index);
  });
  $scope.$on('removeLaptop', function (event, index) {
    $scope.removeLaptop(index);
  });
  $scope.$on('removeTablet', function (event, index) {
    $scope.removeTablet(index);
  });
  $scope.$on('removeMonitor', function (event, index) {
    $scope.removeMonitor(index);
  });
}]);