var tabletForm = angular.module('tabletForm', []);

//Component data
tabletForm.component('tabletForm', {
  templateUrl: '/inventory/product-forms/tablet-form.html',
  controller: function($scope) {
    $scope.tablet = {};
    $scope.serial_number = '';
    $scope.submitTablet =() => {
      $scope.tablet.type = 'tablet';
      $scope.$emit('newTablet', $scope.tablet);
      $scope.tablet = {};
    }
    $scope.addSerial = () => {
      if($scope.serial_number === '') return;
      if(!$scope.tablet.serial_numbers){
        $scope.tablet.serial_numbers = [];
      }
        $scope.tablet.serial_numbers.push($scope.serial_number);
        $scope.serial_number = '';
    }
    $scope.remove = (index) => {
      $scope.tablet.serial_numbers.splice(index,1);
    }
  },
});
