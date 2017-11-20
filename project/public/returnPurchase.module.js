var returnPurchase = angular.module('returnPurchase',[]);

function returnPurchaseController($scope, $http, $compile){
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

    $scope.addToReturnCart = (serialNumber, modelNumber) => {
      $http({
        method: 'POST',
        url: '/api/addToReturnCart',
        data: {serialNumber: serialNumber, modelNumber: modelNumber},
      }).then(function successCallback(response){
        window.alert("Added to Cart");
      }, function errorCallback(response){
        window.alert("Not Added to Cart");
      });
    }

    $scope.returnPurchase = function(){
      $http({
        method: 'POST',
        url:'/api/returnPurchaseItems'
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
