var productCard = angular.module('productCard', [])
var desktopCard = angular.module('desktopCard', [])
var laptopCard = angular.module('laptopCard', [])
var tabletCard = angular.module('tabletCard', [])
var monitorCard = angular.module('monitorCard', [])

function productCardController($scope) {
}
function desktopCardController($scope) {
  rotateCard($scope);
}
function laptopCardController($scope) {
  rotateCard($scope);
}
function tabletCardController($scope) {
  rotateCard($scope);
}
function monitorCardController($scope) {
  rotateCard($scope);
}

function rotateCard($scope) {
  $scope.rotated = false;

  $scope.rotate = () => {
    $scope.rotated = !$scope.rotated;
  }
}

//Component data
productCard.component('productCard', {
  templateUrl: '/clientInventory/productCard.html',
  controller: productCardController,
  bindings: {
  product: '<'
  }
})

desktopCard.component('desktopCard', {
  templateUrl: '/clientInventory/desktopCard.html',
  controller: desktopCardController,
  bindings: {
    desktop: '<'
  }
})

desktopCard.component('laptopCard', {
  templateUrl: '/clientInventory/laptopCard.html',
  controller: laptopCardController,
  bindings: {
    laptop: '<'
  }
})

desktopCard.component('tabletCard', {
  templateUrl: '/clientInventory/tabletCard.html',
  controller: tabletCardController,
  bindings: {
    tablet: '<'
  }
})

desktopCard.component('monitorCard', {
  templateUrl: '/clientInventory/monitorCard.html',
  controller: monitorCardController,
  bindings: {
    monitor: '<'
  }
})

//Set different delimiters to prevent clashing with handlebars
productCard.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
