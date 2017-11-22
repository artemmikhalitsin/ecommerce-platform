var tabletForm = angular.module('tabletForm', []);

//Component data
tabletForm.component('tabletForm', {
  templateUrl: '/catalog/product-forms/tablet-form.html',
  controller: function($scope) {
    $scope.tablet = {};
    $scope.submitTablet =() => {
      $scope.tablet.type = 'Tablet';
      $scope.$emit('newTablet', $scope.tablet);
      $scope.tablet = {};
    }
  },
});
