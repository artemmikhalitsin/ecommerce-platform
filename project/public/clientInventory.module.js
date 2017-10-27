console.log('loaded')

var clientInventory = angular.module('clientInventory', ['desktopCard', 'monitorCard', 'tabletCard', 'laptopCard']);

function ClientInventoryController($scope) {
  $scope.fruit = 'banana', 'mango'
  //Load items from inventory
  //Split into arrays of 4 at a time to make a grid
  $scope.items = [
    {
      brand:'Toshiba',
      modelNumber:'RUB-A535',
      serialNumber: '1231231',
      price: '700.00',
      weight: '300 gram',
      type: 'desktop'
    },
    {
      brand:'Apple',
      modelNumber:'HAL-9000',
      serialNumber: '34343434',
      price: '800.00',
      weight: '420 gram',
      type: 'tablet'
    },
    {
      brand:'HP',
      modelNumber:'N1C3R1D3',
      serialNumber: '808080',
      price: '1000.00',
      weight: '850 gram',
      type: 'monitor'
    }
  ];

  $scope.itemsShown = [];

  $scope.itemsPerPage = 4;
  $scope.pages = Math.ceil($scope.items.length * 1.0/ $scope.itemsPerPage);
}

clientInventory.controller('ClientInventoryController', ClientInventoryController);

clientInventory.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
