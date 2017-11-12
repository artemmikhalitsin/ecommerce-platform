var monitorForm = angular.module('monitorForm', []);

//Component data
monitorForm.component('monitorForm', {
  templateUrl: '/inventory/product-forms/monitor-form.html',
  controller: function($scope) {
    $scope.monitor = {};
    $scope.serial_number = '';
    $scope.submitMonitor = () => {
      $scope.monitor.type = 'monitor';
      $scope.$emit('newMonitor', $scope.monitor);
      $scope.monitor = {};
    }
    //remoce serial from array
    $scope.remove = (index) => {
      $scope.monitor.serial_numbers.splice(index,1);
    }
  },
});
