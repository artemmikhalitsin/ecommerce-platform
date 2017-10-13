var newProduct = angular.module('newProduct', ['tvForm'])

newProduct.controller('FormController', ['$scope', function($scope) {
  $scope.selected = 'laptop'
}]);
