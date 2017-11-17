console.log('catalog module loaded');
var catalog = angular.module('catalog', ['rowItem']);

function catalogController($scope) {
  $scope.products = [];
  $scope.initCtatalog = function(){
    $.ajax({
        url: '/getProductDescription',
        type: 'get',
        dataType: 'json',
        success: function (response) {
          $scope.$apply(function(){
              
          $scope.products = response.items;
          console.log($scope.products);
          });
          
        },
        error: function (xhr) {
          $('#error-box').show();
          $('#error-message').html(xhr.responseJSON.error);
        }
    });
  };
  $scope.submit = function(){
    $.ajax({
      url:'/manageProductCatalog',
      type: 'post',
      data: $scope.products,
      dataType: 'json',
      success: function(response){

      },
      error: function(error){
        $('#error-box').show();
        $('#error-message').html(error);
        console.log(error);
      }
    });
  };
}

catalog.controller('CatalogController', ['$scope', catalogController]);

catalog.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
