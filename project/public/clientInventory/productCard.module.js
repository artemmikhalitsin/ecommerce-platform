var productCard = angular.module('productCard', [])
var desktopCard = angular.module('desktopCard', [])
var laptopCard = angular.module('laptopCard', [])
var tabletCard = angular.module('tabletCard', [])
var monitorCard = angular.module('monitorCard', [])

function productCardController($scope) {
}
function desktopCardController($scope, $http, $compile) {
  rotateCard($scope);
  $scope.addToShoppingCart = (serialNumber, modelNumber, brandName, type, price) => {
    addToShoppingCart(serialNumber,modelNumber, brandName, type, price, $http, $compile, $scope);
  }
  $scope.remove = (index) => {
    remove(index, $http);
  }
}
function laptopCardController($scope, $http, $compile) {
  rotateCard($scope);
  $scope.addToShoppingCart = (serialNumber, modelNumber, brandName, type, price) => {
    addToShoppingCart(serialNumber,modelNumber, brandName, type, price, $http, $compile, $scope);
  }
  $scope.remove = (index) => {
    remove(index, $http);
  }
}
function tabletCardController($scope, $http, $compile) {
  rotateCard($scope);
  $scope.addToShoppingCart = (serialNumber, modelNumber, brandName, type, price) => {
    addToShoppingCart(serialNumber,modelNumber, brandName, type, price, $http, $compile, $scope);
  }
  $scope.remove = (index) => {
    remove(index, $http);
  }
}
function monitorCardController($scope, $http, $compile) {
  rotateCard($scope);
  $scope.addToShoppingCart = (serialNumber, modelNumber, brandName, type, price) => {
    addToShoppingCart(serialNumber,modelNumber, brandName, type, price, $http, $compile, $scope);
  }
  $scope.remove = (index) => {
    remove(index, $http);
  }
}

function remove(serialNumber, http) {
  console.log(serialNumber);
  http({
    method: 'POST',
    url: '/removeFromCart',
    data: {serialNumber: serialNumber},
  }).then(function successCallback(response) {
      $('#cart_' + serialNumber).remove();
    }, function errorCallback(response) {
      window.alert('Cannot remove item!');
  });

}

function addToShoppingCart(serialNumber,modelNumber, brandName, type, price, http, compile, scope) {
  http({
    method: 'POST',
    url: '/addToCart',
    data: {serialNumber: serialNumber, modelNumber: modelNumber},
  }).then(function successCallback(response) {
    var html=`<div class="list-group-item list-group-item-action flex-column align-items-start" id="cart_${serialNumber}">`
    +  `<div class="d-flex w-100 justify-content-between">`
    +   `<h3 class="mb-1">${brandName} ${type}</h3>`
    +   `<div>$${price}</div>`
    +   `</div>`
    +   `<div>Model: ${modelNumber}</div>`
    +   `<div>Serial: ${serialNumber}</div>`
    + `<button class="pull-right btn" ng-click="remove('${serialNumber}')">Remove From Cart</button>`
    + `</div>`;
    $('#shopping_cart').show();
    let el = document.getElementById('temp_cart');
    angular.element(el).append(compile(html)(scope));
    window.alert(response.data.success);
    }, function errorCallback(response) {
        if (response.data.error == null) {
          window.alert('Too many items in cart');
        }
        window.alert(response.data.error);
      }
  );
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
