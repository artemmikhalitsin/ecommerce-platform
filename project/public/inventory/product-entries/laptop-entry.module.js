var laptopEntry = angular.module('laptopEntry', []);

laptopEntry.component('laptopEntry', {
  bindings: {
    laptop: '=',
    index: '='
  },
  templateUrl: '/inventory/product-entries/laptop-entry.html',
  controller: function($scope) {
    $scope.removeSerial = (index) => {
      $scope.$ctrl.laptop.serial_numbers.splice(index,1);
    }
    $scope.removeLaptopEntry =() =>{
      $scope.$emit('removeLaptop', $scope.$ctrl.index);
    }
  }
})

laptopEntry.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
