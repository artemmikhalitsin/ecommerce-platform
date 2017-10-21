var newProduct = angular.module('newProduct',
    ['tvForm', 'monitorForm', 'laptopForm', 'desktopForm', 'tabletForm'])

newProduct.controller('FormController', ['$scope', function($scope) {
  $scope.selected = ''
  $scope.$on('newLaptop', addLaptopToList)


  function addLaptopToList(event, args) {
    console.log('addlaptop')
    //do something with the laptop(args)
  }
}]);
