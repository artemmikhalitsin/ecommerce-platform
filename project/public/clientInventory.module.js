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

      //console.log("Printing items: " + JSON.stringify($scope.items));

      $scope.typeIncludes = [];
      $scope.includeType = function(type) {
        var i = $.inArray(type, $scope.typeIncludes);
        if (i > -1) {
            $scope.typeIncludes.splice(i, 1);
        } else {
            $scope.typeIncludes.push(type);
        }
      }

      $scope.typeFilter = function(item) {
        if ($scope.typeIncludes.length > 0) {
            if ($.inArray(item.type, $scope.typeIncludes) < 0)
                return;
        }

        return item;
      }

      //$scope.items.filter();
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
