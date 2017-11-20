let tabletEntry = angular.module('tabletEntry', []);

tabletEntry.component('tabletEntry', {
  bindings: {
    tablet: '=',
    index: '=',
  },
  templateUrl: '/inventory/product-entries/tablet-entry.html',
  controller: function($scope) {
    $scope.removeSerial = (index) => {
      $scope.$ctrl.tablet.serial_numbers.splice(index, 1);
    };
    $scope.removeTabletEntry =() =>{
      $scope.$emit('removeTablet', $scope.$ctrl.index);
    };
  },
});

tabletEntry.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
