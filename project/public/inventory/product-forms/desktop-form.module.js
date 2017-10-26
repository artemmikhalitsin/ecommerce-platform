var desktopForm = angular.module('desktopForm', []);

//Component data
desktopForm.component('desktopForm', {
  templateUrl: '/inventory/product-forms/desktop-form.html',
  controller: function($scope) {
    $scope.desktop = {};
    $scope.submitDesktop = () => {
      $scope.desktop.type = 'desktop';
      $scope.$emit('newDesktop', $scope.desktop)
      $scope.desktop = {};
    }
    $scope.addSerial = () => {
      if($scope.serial_number === '') return;
      if(!$scope.desktop.serial_numbers){
        $scope.desktop.serial_numbers = [];
      }
        $scope.desktop.serial_numbers.push($scope.serial_number);
        $scope.serial_number = '';
    }
    $scope.remove = (index) => {
      $scope.desktop.serial_numbers.splice(index,1);
    }
  },
});
