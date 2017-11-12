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
    $scope.remove = (index) => {
      $scope.desktop.serial_numbers.splice(index,1);
    }
  },
});
