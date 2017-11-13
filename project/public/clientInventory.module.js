console.log('loaded')

var clientInventory = angular.module('clientInventory', ['desktopCard', 'monitorCard', 'tabletCard', 'laptopCard']);

function ClientInventoryController($scope, $http) {
  $scope.fruit = 'banana', 'mango'
  //Load items from inventory
  //Split into arrays of 4 at a time to make a grid
  $scope.items = [
    {
      brand:'Toshiba',
      modelNumber:'RUB-A535',
      serialNumber: 'EE5U-VCJ7-HJ3G-CW4R',
      price: '700.00',
      weight: '300 gram',
      type: 'desktop'
    },
    {
      brand:'Apple2',
      modelNumber:'HAL-9000',
      serialNumber: 'CRAJ-4MV5-VSYY-FUWT',
      price: '800.00',
      weight: '420 gram',
      type: 'tablet'
    },
    {
      brand:'HP',
      modelNumber:'N1C3R1D3',
      serialNumber: 'HHV8-B52E-YGA7-HSSH',
      price: '1000.00',
      weight: '850 gram',
      type: 'monitor'
    },
    {
      brand:'HP2',
      modelNumber:'N1C3R1D3',
      serialNumber: 'HHV9-B52E-YGA7-HSSH',
      price: '1000.00',
      weight: '850 gram',
      type: 'monitor'
    }
  ];

  $scope.itemsShown = [];

  $scope.itemsPerPage = 4;
  $scope.pages = Math.ceil($scope.items.length * 1.0/ $scope.itemsPerPage);

  $scope.purchase = function(){
    $http({
      method: 'POST',
      url: '/purchaseItems'
    }).then(function successCallback(response) {
        window.alert("Purchased!");

      }, function errorCallback(response) {
        window.alert("Not purchased");
    });
  }

  $scope.cancelTransaction = function(){
    $http({
      method: 'POST',
      url: '/cancelTransaction'
    }).then(function successCallback(response) {
        window.alert("Canceled!");

      }, function errorCallback(response) {
        window.alert("Not canceled");
    });
  }
}

clientInventory.controller('ClientInventoryController', ClientInventoryController);

clientInventory.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
