var monitorEntry = angular.module('monitorEntry', []);

monitorEntry.component('monitorEntry', {
  bindings: {
    monitor: '='
  },
  templateUrl: '/inventory/product-entries/monitor-entry.html',
  controller: function($scope) {
    $scope.removeSerial = (index) => {
      $scope.$ctrl.monitor.serial_numbers.splice(index,1);
    }
  }
})

monitorEntry.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
