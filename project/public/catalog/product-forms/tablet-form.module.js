var tabletForm = angular.module('tabletForm', []);

//Component data
tabletForm.component('tabletForm', {
  templateUrl: '/catalog/product-forms/tablet-form.html',
  controller: function($scope) {
    $scope.tablet = {};
    $scope.submitTablet =() => {
      $scope.tablet.type = 'Tablet';
      $scope.tablet.isAvailable = 1;
      $scope.$emit('newTablet', $scope.tablet);
      $scope.tablet = {};
    }
  },
});
