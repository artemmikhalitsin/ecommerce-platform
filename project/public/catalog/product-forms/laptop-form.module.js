var laptopForm = angular.module('laptopForm', []);

//Component data
laptopForm.component('laptopForm', {
  templateUrl: '/catalog/product-forms/laptop-form.html',
  controller: function($scope) {
    $scope.laptop = {};
    $scope.submitLaptop = () => {
      $scope.laptop.type = 'Laptop';
      $scope.$emit("newLaptop", $scope.laptop);
      $scope.laptop = {};
    }
  },
});
