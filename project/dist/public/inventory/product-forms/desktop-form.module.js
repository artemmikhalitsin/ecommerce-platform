'use strict';

var desktopForm = angular.module('desktopForm', []);

//Component data
desktopForm.component('desktopForm', {
  templateUrl: '/inventory/product-forms/desktop-form.html',
  controller: function controller($scope) {
    $scope.desktop = {};
    $scope.submitDesktop = function () {
      $scope.desktop.type = 'desktop';
      $scope.$emit('newDesktop', $scope.desktop);
      $scope.desktop = {};
    };
    $scope.addSerial = function () {
      if ($scope.serial_number === '') return;
      if (!$scope.desktop.serial_numbers) {
        $scope.desktop.serial_numbers = [];
      }
      $scope.desktop.serial_numbers.push($scope.serial_number);
      $scope.serial_number = '';
    };
    $scope.remove = function (index) {
      $scope.desktop.serial_numbers.splice(index, 1);
    };
  }
});