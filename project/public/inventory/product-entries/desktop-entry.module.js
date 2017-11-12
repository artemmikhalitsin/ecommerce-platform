var desktopEntry = angular.module('desktopEntry', []);

desktopEntry.component('desktopEntry', {
  bindings: {
    desktop: '=',
    index: '='
  },
  templateUrl: '/inventory/product-entries/desktop-entry.html',
  controller: function($scope) {
    $scope.removeDesktopEntry =() =>{
      $scope.$emit('removeDesktop', $scope.$ctrl.index);
    }
  }
})

desktopEntry.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
