var laptopEntry = angular.module('laptopEntry', []);

laptopEntry.component('laptopEntry', {
  bindings: {
    laptop: '='
  },
  templateUrl: '/inventory/product-entries/laptop-entry.html',
  controller: function($scope) {
    $scope.removeSerial = (index) => {
      $scope.$ctrl.laptop.serial_numbers.splice(index,1);
    }
  }
})

laptopEntry.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
