var laptopForm = angular.module('laptopForm', []);

//Component data
laptopForm.component('laptopForm', {
  templateUrl: '/inventory/product-forms/laptop-form.html',
  controller: function($scope) {
    $scope.laptop = {}

    $scope.submitLaptop = () => {
      $scope.$emit('newLaptop', $scope.laptop)
    }
  },
});
