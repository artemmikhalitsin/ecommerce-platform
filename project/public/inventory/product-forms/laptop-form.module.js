var laptopForm = angular.module('laptopForm', []);

//Component data
laptopForm.component('laptopForm', {
  templateUrl: '/inventory/product-forms/laptop-form.html',
  controller: function($scope) {
    $scope.laptop = {};
    $scope.serial_number = '123abc';
    $scope.submitLaptop = () => {
      $scope.$emit("newLaptop", $scope.laptop);
      $scope.laptop = {};
    }
    $scope.addSerial = () => {
      if($scope.serial_number === '') return;
      if(!$scope.laptop.serial_numbers){
        //make empty array
        $scope.laptop.serial_numbers = [];
      }
      //append serial to array
        $scope.laptop.serial_numbers.push($scope.serial_number);
        $scope.laptop.serial_number = '';
        console.log($scope.laptop.serial_numbers)
    }
  },
    });
