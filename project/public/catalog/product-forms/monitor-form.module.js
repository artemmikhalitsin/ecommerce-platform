var monitorForm = angular.module('monitorForm', []);

//Component data
monitorForm.component('monitorForm', {
  templateUrl: '/catalog/product-forms/monitor-form.html',
  controller: function($scope) {
    $scope.monitor = {};
    $scope.submitMonitor = () => {
      $scope.monitor.type = 'Monitor';
      $scope.monitor.isAvailable = 1;
      $scope.$emit('newMonitor', $scope.monitor);
      $scope.monitor = {};
    }
  },
});
