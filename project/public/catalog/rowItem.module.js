let rowItem = angular.module('rowItem', []);

rowItem.component('rowItem', {
bindings: {
  product: '<',
  index: '=',
},
templateUrl: '/catalog/rowItem.html',

controller: function($scope) {
  $scope.editMode = false;
  $scope.showMore = false;
  $scope.toggle = () => {
    $scope.showMore = !$scope.showMore;
  },
  $scope.editDescription = () =>{
    $scope.editMode = true;
    $scope.showMore = false;
  },
  $scope.saveDescription = () =>{
    $scope.$emit('updateDescription', $scope.$ctrl.product, $scope.$ctrl.index);
    $scope.editMode = false;
  };

  $scope.isLaptop = () => {
 return $scope.$ctrl.product.type === 'Laptop';
};
  $scope.isDesktop = () => {
 return $scope.$ctrl.product.type === 'Desktop';
};
  $scope.isTablet = () => {
 return $scope.$ctrl.product.type === 'Tablet';
};
  $scope.isMonitor = () => {
 return $scope.$ctrl.product.type === 'Monitor';
};
},

});

rowItem.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
