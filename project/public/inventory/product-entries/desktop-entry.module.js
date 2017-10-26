var desktopEntry = angular.module('desktopEntry', []);

desktopEntry.component('desktopEntry', {
  bindings: {
    desktop: '='
  },
  templateUrl: '/inventory/product-entries/desktop-entry.html',
  controller: function($scope) {
    $scope.removeSerial = (index) => {
      $scope.$ctrl.desktop.serial_numbers.splice(index,1);
    }
  }
})

desktopEntry.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
