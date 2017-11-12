var monitorEntry = angular.module('monitorEntry', []);

monitorEntry.component('monitorEntry', {
  bindings: {
    monitor: '=',
    index: '='
  },
  templateUrl: '/inventory/product-entries/monitor-entry.html',
  controller: function($scope) {
    $scope.removeMonitorEntry =() =>{
      $scope.$emit('removeMonitor', $scope.$ctrl.index);
    }
  }
})

monitorEntry.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
