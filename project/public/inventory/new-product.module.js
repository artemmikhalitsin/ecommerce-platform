var newProduct = angular.module('newProduct',
    ['tvForm', 'monitorForm', 'laptopForm', 'desktopForm', 'tabletForm'])

newProduct.controller('FormController', ['$scope', function($scope) {
  $scope.selected = ''
}]);
