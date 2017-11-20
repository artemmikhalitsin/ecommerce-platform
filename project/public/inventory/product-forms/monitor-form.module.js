let monitorForm = angular.module('monitorForm', []);

// Component data
monitorForm.component('monitorForm', {
  templateUrl: '/inventory/product-forms/monitor-form.html',
  controller: function($scope) {
    $scope.monitor = {};
    $scope.serial_number = '';
    $scope.submitMonitor = () => {
      $scope.monitor.type = 'monitor';
      $scope.$emit('newMonitor', $scope.monitor);
      $scope.monitor = {};
    };
    $scope.addSerial = () => {
      if ($scope.serial_number === '') return;
      if (!$scope.monitor.serial_numbers) {
        // make empty array
        $scope.monitor.serial_numbers = [];
      }
      // append serial to array
        $scope.monitor.serial_numbers.push($scope.serial_number);
        $scope.serial_number = '';
    };
    // remoce serial from array
    $scope.remove = (index) => {
      $scope.monitor.serial_numbers.splice(index, 1);
    };
  },
});
