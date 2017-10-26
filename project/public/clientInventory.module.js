console.log('loaded')

var clientInventory = angular.module('clientInventory', ['productCard']);

function ClientInventoryController($scope) {
  $scope.fruit = 'banana', 'mango'
}

clientInventory.controller('ClientInventoryController', ClientInventoryController);

clientInventory.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
