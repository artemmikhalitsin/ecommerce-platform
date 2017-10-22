var monitorForm = angular.module('monitorForm', []);

//Component data
monitorForm.component('monitorForm', {
  templateUrl: '/inventory/product-forms/monitor-form.html',
  controller: function($scope) {
    $scope.monitor = {};
    $scope.serial_number = '';
    $scope.submitMonitor = () => {
      $scope.$emit("newMonitor", $scope.monitor);
      $scope.monitor = {};
    }
    $scope.addSerial = () => {
      if($scope.serial_number === '') return;
      if(!$scope.monitor.serial_numbers){
        //make empty array
        $scope.monitor.serial_numbers = [];
      }
      //append serial to array
        $scope.monitor.serial_numbers.push($scope.serial_number);
        $scope.monitor.serial_number = '';
        console.log($scope.monitor.serial_numbers)
    }
  },
    });
