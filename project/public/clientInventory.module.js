var clientInventory = angular.module('clientInventory', ['desktopCard', 'monitorCard', 'tabletCard', 'laptopCard']);

function ClientInventoryController($scope, $http, $compile) {
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

      }, function errorCallback(response) {
        window.alert(response.data.error);
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
