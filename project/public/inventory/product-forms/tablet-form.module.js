var tabletForm = angular.module('tabletForm', []);

//Component data
tabletForm.component('tabletForm', {
  templateUrl: '/inventory/product-forms/tablet-form.html',
  controller: function($scope) {
    $scope.tablet = {};
    $scope.serial_number = '';
    $scope.submitTablet =() => {
      $scope.$emit('newTablet', $scope.tablet);
      $scope.tablet = {};
    }
    $scope.addSerial = () => {
      if($scope.serial_number === '') return;
      if(!$scope.tablet.serial_numbers){
        $scope.tablet.serial_numbers = [];
      }
        $scope.tablet.serial_numbers.push($scope.serial_number);
        $scope.tablet.serial_number = '';
        console.log($scope.tablet.serial_numbers)
    }
  },
    });
