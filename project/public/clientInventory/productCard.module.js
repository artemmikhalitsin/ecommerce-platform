let productCard = angular.module('productCard', []);
let desktopCard = angular.module('desktopCard', []);
let laptopCard = angular.module('laptopCard', []);
let tabletCard = angular.module('tabletCard', []);
let monitorCard = angular.module('monitorCard', []);

function productCardController($scope) {
}
function desktopCardController($scope, $http, $compile) {
  rotateCard($scope);
  $scope.addToShoppingCart = (serialNumber, modelNumber) => {
    addToShoppingCart(serialNumber, modelNumber, $http, $compile, $scope);
  };
  $scope.remove = (index) => {
    remove(index, $http);
  };
}
function laptopCardController($scope, $http, $compile) {
  rotateCard($scope);
  $scope.addToShoppingCart = (serialNumber, modelNumber) => {
    addToShoppingCart(serialNumber, modelNumber, $http, $compile, $scope);
  };
  $scope.remove = (index) => {
    remove(index, $http);
  };
}
function tabletCardController($scope, $http, $compile) {
  rotateCard($scope);
  $scope.addToShoppingCart = (serialNumber, modelNumber) => {
    addToShoppingCart(serialNumber, modelNumber, $http, $compile, $scope);
  };
  $scope.remove = (index) => {
    remove(index, $http);
  };
}
function monitorCardController($scope, $http, $compile) {
  rotateCard($scope);
  $scope.addToShoppingCart = (serialNumber, modelNumber) => {
    addToShoppingCart(serialNumber, modelNumber, $http, $compile, $scope);
  };
  $scope.remove = (index) => {
    remove(index, $http);
  };
}

function remove(serialNumber, http) {
  console.log(serialNumber);
  http({
    method: 'POST',
    url: '/removeFromCart',
    data: {serialNumber: serialNumber},
  }).then(function successCallback(response) {
      $('#cart_' + serialNumber).remove();
      window.alert('Removed successfully');
    }, function errorCallback(response) {
      window.alert('Unsuccessful!');
  });
}

function addToShoppingCart(serialNumber, modelNumber, http, compile, scope) {
  http({
    method: 'POST',
    url: '/addToCart',
    data: {serialNumber: serialNumber, modelNumber: modelNumber},
  }).then(function successCallback(response) {
    let html=`<li id="cart_${serialNumber}">${serialNumber}<button ng-click="remove('${serialNumber}')">X</button></li>`;
    let el = document.getElementById('temp_cart');
    angular.element(el).append(compile(html)(scope));
    window.alert('Added to shopping cart');
    }, function errorCallback(response) {
      window.alert('Not added to shopping cart');
  });
}

function rotateCard($scope) {
  $scope.rotated = false;

  $scope.rotate = () => {
    $scope.rotated = !$scope.rotated;
  };
}

// Component data
productCard.component('productCard', {
  templateUrl: '/clientInventory/productCard.html',
  controller: productCardController,
  bindings: {
  product: '<',
  },
});

desktopCard.component('desktopCard', {
  templateUrl: '/clientInventory/desktopCard.html',
  controller: desktopCardController,
  bindings: {
    desktop: '<',
  },
});

desktopCard.component('laptopCard', {
  templateUrl: '/clientInventory/laptopCard.html',
  controller: laptopCardController,
  bindings: {
    laptop: '<',
  },
});

desktopCard.component('tabletCard', {
  templateUrl: '/clientInventory/tabletCard.html',
  controller: tabletCardController,
  bindings: {
    tablet: '<',
  },
});

desktopCard.component('monitorCard', {
  templateUrl: '/clientInventory/monitorCard.html',
  controller: monitorCardController,
  bindings: {
    monitor: '<',
  },
});

// Set different delimiters to prevent clashing with handlebars
productCard.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
