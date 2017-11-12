var laptopForm = angular.module('laptopForm', []);

//Component data
laptopForm.component('laptopForm', {
  templateUrl: '/inventory/product-forms/laptop-form.html',
  controller: function($scope) {
    $scope.laptop = {};
    $scope.serial_number = '';
    $scope.submitLaptop = () => {
      $scope.laptop.type = 'laptop';
      $scope.$emit("newLaptop", $scope.laptop);
      $scope.laptop = {};
    }
    $scope.remove = (index) => {
      $scope.laptop.serial_numbers.splice(index,1);
    }
  },
});
