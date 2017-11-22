var desktopForm = angular.module('desktopForm', []);

//Component data
desktopForm.component('desktopForm', {
  templateUrl: '/catalog/product-forms/desktop-form.html',
  controller: function($scope) {
    $scope.desktop = {};
    $scope.submitDesktop = () => {
      $scope.desktop.type = 'Desktop';
      $scope.$emit('newDesktop', $scope.desktop)
      $scope.desktop = {};
    }
  },
});
