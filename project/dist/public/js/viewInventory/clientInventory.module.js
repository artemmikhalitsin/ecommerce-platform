'use strict';

var clientInventory = angular.module('clientInventory', []);

clientInventory.config(function ($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

clientInventory.controller('InventoryController', ['$scope', function ($scope) {
  $scope.fruits = ['apple', 'banana', 'kiwi', 'mango'];
}]);