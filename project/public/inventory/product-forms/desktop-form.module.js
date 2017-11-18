var desktopForm = angular.module('desktop-form', []);

//Component data
desktopForm.component('desktop-form', {
  templateUrl: '/inventory/product-forms/desktop-form.html',
  controller: function($scope) {
    $scope.desktop = {};
    $scope.submitDesktop = () => {
      $scope.desktop.type = 'Desktop';
      $scope.$emit('newDesktop', $scope.desktop)
      $scope.$ctrl.desktop = {};
    }
  },
});
