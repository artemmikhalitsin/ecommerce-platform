console.log('catalog module loaded');
var catalog = angular.module('catalog', ['rowItem', 'monitorForm', 'laptopForm', 'desktopForm', 'tabletForm']);

function catalogController($scope) {
  $scope.selected = '';
  $scope.products = [];
  $scope.$on('updateDescription', function(event, product, index){
    console.log("updating row" + index + " desc: " + product);
    $scope.products[index] = product;
  });
  $scope.initCtatalog = function(){
    $.ajax({
        url: '/getProductDescription',
        type: 'get',
        dataType: 'json',
        success: function(response) {
          $scope.$apply(function() {
          $scope.products = response.items;
          console.log($scope.products);
          });
        },
        error: function(xhr) {
          $('#error-box').show();
          $('#error-message').html(xhr.responseJSON.error);
        },
    });
  };
  $scope.$on('newDesktop', function(event, desktop){
    console.log("new desktop desc: " + desktop);
    $scope.products.push(desktop);
  });
  $scope.$on('newLaptop', function(event, laptop){
    console.log("new laptop desc: " + laptop);
    $scope.products.push(laptop);
  });
  $scope.$on('newMonitor', function(event, monitor){
    console.log("new monitor desc: " + monitor);
    $scope.products.push(monitor);
  });
  $scope.$on('newTablet', function(event, tablet){
    console.log("new tablet desc: " + tablet);
    $scope.products.push(tablet);
  });
  $scope.submit = function(){
    console.log($scope.products);
    $.ajax({
      url: '/manageProductCatalog',
      type: 'post',
      data: {"productDescriptions":JSON.stringify($scope.products)},
      dataType: 'json',
      success: function(response){
        $scope.$apply(function(){

        $scope.products = response.items;
        console.log("Successfully saved!");
      });
      },
      error: function(error) {
        $('#error-box').show();
        $('#error-message').html(error);
        console.log(error);
      },
    });
  };
}

catalog.controller('CatalogController', ['$scope', catalogController]);

catalog.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
