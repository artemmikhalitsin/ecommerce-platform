var clientInventory = angular.module('clientInventory', ['desktopCard', 'monitorCard', 'tabletCard', 'laptopCard']);

<<<<<<< HEAD
function ClientInventoryController($scope, $http) {
<<<<<<< HEAD
  $scope.fruit = 'banana', 'mango'
  //Load items from inventory
  //Split into arrays of 4 at a time to make a grid
  $scope.items = [
    {
      brand:'Toshiba',
      modelNumber:'891507686-9',
      serialNumber: 'EE5U-VCJ7-HJ3G-CW4R',
      price: '700.00',
      weight: '300 gram',
      type: 'desktop'
    },
    {
      brand:'Apple2',
      modelNumber:'891507686-9',
      serialNumber: 'CRAJ-4MV5-VSYY-FUWT',
      price: '800.00',
      weight: '420 gram',
      type: 'tablet'
    },
    {
      brand:'HP',
      modelNumber:'079057815-8',
      serialNumber: 'HHV8-B52E-YGA7-HSSH',
      price: '1000.00',
      weight: '850 gram',
      type: 'monitor'
    },
    {
      brand:'HP2',
      modelNumber:'425528356-7',
      serialNumber: 'J6GJ-S4R6-RNWN-KJV2',
      price: '1000.00',
      weight: '850 gram',
      type: 'monitor'
=======
=======
function ClientInventoryController($scope, $http, $compile) {
>>>>>>> 49bb53f5a00143d256bf3a019a607b74e61d662b
  //Get any search parameters
  let search = new URLSearchParams(window.location.search).get('search');
  $scope.search = search ? search : "all";
  $scope.itemsShown = [];
  // Load items from api call
  $scope.items = [];
  $http({
    method: 'GET',
    url: '/api/getAllProducts'
  })
  .then(
    (res) => {
      $scope.items = res.data;
      $scope.itemsShown = res.data;
      console.log($scope.itemsShown);
      filterShown($scope.search)
<<<<<<< HEAD
>>>>>>> e97fede8bb326a4320e1f1dc50d96e3b3bcfe495
=======
>>>>>>> 49bb53f5a00143d256bf3a019a607b74e61d662b
    }
  )
  .catch(
    (err) => {
      window.alert("Error loading inventory items.\n"
    + `Please contact the admin. Error code: ${err}`);
  });

  //Helper function that filters shown items, based on current search JQuery
  let filterShown = function(query) {
    if (query == "all")
    {
      $scope.itemsShown = $scope.items;
    }
    else {
      $scope.itemsShown = $scope.items.filter(
        item => item.type == query
      );
    }
  }

  //Any time search query is changed, re-filter results
  $scope.$watch('search', function(newVal, oldVal) {
    filterShown(newVal)
  });

  $scope.purchase = function(){
    $http({
      method: 'POST',
      url: '/purchaseItems'
    }).then(function successCallback(response) {
        window.alert(response.data.success);
        $('#temp_cart').children().remove();
        $('#shopping_cart').hide();
      }, function errorCallback(response) {
        if (response.data.error) {
          window.alert(response.data.error);
        } else {
          window.alert('Your transaction can\'t be completed at this time');
        }
    });
  }

  $scope.cancelTransaction = function(){
    $http({
      method: 'POST',
      url: '/cancelTransaction'
    }).then(function successCallback(response) {
        window.alert("Canceled!");
        $('#temp_cart').children().remove();
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
