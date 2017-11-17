var returnPurchase = angular.module("returnPurchase",[]);

function returnPurchaseController($scope, $http, $compile){
  let search = new URLSearchParams(window.location.search).get('search');
  $scope.search = search ? search : "all";
  $scope.itemsShown = [];
  //Load items from api call
  $scope.items = [];
  $http({
    method: 'GET',
    url:'/viewPurchaseCollection'
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
      window.alert("Error loading purchased items.\n"
    + `Please contact admin. Error code ${err}`);
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

    //New Code
    $scope.returnPurchase = function(){
      $http({
        method: 'POST',
        url:'/returnPurchaseItems'
      }).then(function successCallback(response) {
        window.alert("Returned");
      }, function errorCallback(response){
        window.alert("Not Returned");
      });
    }

    $scope.cancelReturn = function(){
      $http({
        method: 'POST',
        url: '/cancelReturn'
      }).then(function successCallback(response) {
        window.alert("Canceled!");
      }, function errorCallback(response){
        window.alert('Not Canceled!');
      });
    }
  }

  returnPurchase.controller('returnPurchaseController', returnPurchaseController);
  
  returnPurchase.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
  });
