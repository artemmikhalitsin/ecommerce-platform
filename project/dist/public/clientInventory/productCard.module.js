'use strict';

var productCard = angular.module('productCard', []);
var desktopCard = angular.module('desktopCard', []);
var laptopCard = angular.module('laptopCard', []);
var tabletCard = angular.module('tabletCard', []);
var monitorCard = angular.module('monitorCard', []);

function productCardController($scope) {}
function desktopCardController($scope, $http) {
  rotateCard($scope);
  $scope.addToShoppingCart = function (serialNumber, modelNumber) {
    addToShoppingCart(serialNumber, modelNumber, $http);
  };
  $scope.remove = function (index) {
    remove(index, $http);
  };
}
function laptopCardController($scope, $http) {
  rotateCard($scope);
  $scope.addToShoppingCart = function (serialNumber, modelNumber) {
    addToShoppingCart(serialNumber, modelNumber, $http);
  };
  $scope.remove = function (index) {
    remove(index, $http);
  };
}
function tabletCardController($scope, $http) {
  rotateCard($scope);
  $scope.addToShoppingCart = function (serialNumber, modelNumber) {
    addToShoppingCart(serialNumber, modelNumber, $http);
  };
  $scope.remove = function (index) {
    remove(index, $http);
  };
}
function monitorCardController($scope, $http) {
  rotateCard($scope);
  $scope.addToShoppingCart = function (serialNumber, modelNumber) {
    addToShoppingCart(serialNumber, modelNumber, $http);
  };
  $scope.remove = function (index) {
    remove(index, $http);
  };
}

function remove(http) {
  http({
    method: 'POST',
    url: '/addToCart',
    data: { serialNumber: serialNumber, modelNumber: modelNumber }
  }).then(function successCallback(response) {
    $('#temp_cart').append('<li>' + serialNumber + '</li><button ng-click="remove()">X</button>');
    window.alert("hurray");
  }, function errorCallback(response) {
    window.alert("darn");
  });
}

function addToShoppingCart(serialNumber, modelNumber, http) {
  http({
    method: 'POST',
    url: '/addToCart',
    data: { serialNumber: serialNumber, modelNumber: modelNumber }
  }).then(function successCallback(response) {
    $('#temp_cart').append('<li>' + serialNumber + '</li><button ng-click="remove()">X</button>');
    window.alert("hurray");
  }, function errorCallback(response) {
    window.alert("darn");
  });
}

function rotateCard($scope) {
  $scope.rotated = false;

  $scope.rotate = function () {
    $scope.rotated = !$scope.rotated;
  };
}

//Component data
productCard.component('productCard', {
  templateUrl: '/clientInventory/productCard.html',
  controller: productCardController,
  bindings: {
    product: '<'
  }
});

desktopCard.component('desktopCard', {
  templateUrl: '/clientInventory/desktopCard.html',
  controller: desktopCardController,
  bindings: {
    desktop: '<'
  }
});

desktopCard.component('laptopCard', {
  templateUrl: '/clientInventory/laptopCard.html',
  controller: laptopCardController,
  bindings: {
    laptop: '<'
  }
});

desktopCard.component('tabletCard', {
  templateUrl: '/clientInventory/tabletCard.html',
  controller: tabletCardController,
  bindings: {
    tablet: '<'
  }
});

desktopCard.component('monitorCard', {
  templateUrl: '/clientInventory/monitorCard.html',
  controller: monitorCardController,
  bindings: {
    monitor: '<'
  }
});

//Set different delimiters to prevent clashing with handlebars
productCard.config(function ($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});