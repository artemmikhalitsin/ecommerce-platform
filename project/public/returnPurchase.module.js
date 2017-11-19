var returnPurchase = angular.module("returnPurchase",[]);

function returnPurchaseController($scope, $http, $compile){
  let search = new URLSearchParams(window.location.search).get('search');
  $scope.search = search ? search : "all";
  $scope.itemsShown = [];
  //Load items from api call
  $scope.items = [];
  $http({
    method: 'GET',
    url:'/api/viewPurchaseCollection'
  })
  .then(
    (res) => {
      $scope.items = res.data;
      console.log($scope.items);
    }
  )
  .catch(
    (err) => {
      window.alert("Error loading purchased items.\n"
    + `Please contact admin. Error code ${err}`);
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
