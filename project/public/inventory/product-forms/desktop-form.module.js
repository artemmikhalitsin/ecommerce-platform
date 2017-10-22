var desktopForm = angular.module('desktopForm', []);

//Component data
desktopForm.component('desktopForm', {
  templateUrl: '/inventory/product-forms/desktop-form.html',
  controller: function($scope) {
    $scope.desktop = {};
    $scope.serial_number = "";
    $scope.submitDesktop = () => {
      $scope.$emit('newDesktop', $scope.desktop)
      $scope.desktop = {};
    }
    $scope.addSerial = () => {
      if($scope.serial_number === '') return;
      if(!$scope.desktop.serial_numbers){
        $scope.desktop.serial_numbers = [];
      }
        $scope.desktop.serial_numbers.push($scope.serial_number);
        $scope.desktop.serial_number = '';
        console.log($scope.desktop.serial_numbers)
    }
  },
    });
