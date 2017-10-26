var productCard = angular.module('productCard', [])

function productCardController($scope) {

}

//Component data
productCard.component('productCard', {
  templateUrl: '/clientInventory/productCard.html',
  controller: productCardController,
  bindings: {
    brand: '@',
    modelNumber: '@',
    serialNumber:'@',
    price: '@',
    weight: '@',
    type: '@'
  }
})

//Set different delimiters to prevent clashing with handlebars
productCard.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
