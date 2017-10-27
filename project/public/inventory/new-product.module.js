var newProduct = angular.module('newProduct',
    ['monitorForm', 'laptopForm', 'desktopForm', 'tabletForm', 'desktopEntry',
    'monitorEntry','tabletEntry','laptopEntry']);
newProduct.controller('FormController', ['$scope', function($scope) {
  //Scope variables
  $scope.selected = '';
  $scope.products = {
    tablets: [],
    desktops: [],
    laptops: [],
    monitors: []
  }
  //Scope functions
  $scope.removeDesktop = (index) => {
    $scope.products.desktops.splice(index,1);
  }
  $scope.removeTablet = (index) => {
    $scope.products.tablets.splice(index,1);
  }
  $scope.removeMonitor = (index) => {
    $scope.products.monitors.splice(index,1);
  }
  $scope.removeLaptop = (index) => {
    $scope.products.laptops.splice(index,1);
  }

  //Scope event handlers
  $scope.$on('newMonitor', (event, item) => {
    $scope.products.monitors.push(item);
  })
  $scope.$on('newTablet', (event, item) => {
    $scope.products.tablets.push(item);
  })
  $scope.$on('newLaptop', (event, item) => {
    $scope.products.laptops.push(item);
  })
  $scope.$on('newDesktop', (event, item) => {
    $scope.products.desktops.push(item);
  })
  $scope.$on('removeDesktop', (event,index)=>{
    $scope.removeDesktop(index);
  })
  $scope.$on('removeLaptop', (event,index)=>{
    $scope.removeLaptop(index);
  })
  $scope.$on('removeTablet', (event,index)=>{
    $scope.removeTablet(index);
  })
  $scope.$on('removeMonitor', (event,index)=>{
    $scope.removeMonitor(index);
  })

}]);
