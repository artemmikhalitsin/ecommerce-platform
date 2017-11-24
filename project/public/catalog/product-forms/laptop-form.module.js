var laptopForm = angular.module('laptopForm', []);

//Component data
laptopForm.component('laptopForm', {
  templateUrl: '/catalog/product-forms/laptop-form.html',
  controller: function($scope) {
    $scope.laptop = {};
    $scope.addLaptop = () => {
      $scope.laptop.type = 'Laptop';
      $scope.laptop.isAvailable = 1;
      $scope.$emit("newLaptop", $scope.laptop);
      $scope.laptop = {};
    }
  },
});
