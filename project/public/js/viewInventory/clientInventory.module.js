let clientInventory = angular.module('clientInventory', []);

clientInventory.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

clientInventory.controller('InventoryController', ['$scope', function($scope, $compile) {
  $scope.fruits=['apple', 'banana', 'kiwi', 'mango'];
}]);
