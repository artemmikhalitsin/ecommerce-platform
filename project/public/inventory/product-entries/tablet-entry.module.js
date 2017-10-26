var tabletEntry = angular.module('tabletEntry', []);

tabletEntry.component('tabletEntry', {
  bindings: {
    tablet: '='
  },
  templateUrl: '/inventory/product-entries/tablet-entry.html',
  controller: function($scope) {
    $scope.removeSerial = (index) => {
      $scope.$ctrl.tablet.serial_numbers.splice(index,1);
    }
  }
})

tabletEntry.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
