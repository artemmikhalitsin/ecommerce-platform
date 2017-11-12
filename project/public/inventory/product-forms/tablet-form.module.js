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
    $scope.remove = (index) => {
      $scope.tablet.serial_numbers.splice(index,1);
    }
  },
});
