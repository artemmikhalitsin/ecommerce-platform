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

function countDown(serial) {
  let sevenMinutesLater = new Date().setMinutes(new Date().getMinutes() + 7);
  console.log('SETTING FINAL COUNTDOWN!');
  // Update the count down every 1 second
  let x = setInterval(() => {
      let now = new Date().getTime();
      let timeDiff = sevenMinutesLater - now;
      let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      // Output the result in an element with id="demo"
      $('#timer_' + serial).html(minutes + 'm ' + seconds + 's');
      // If the count down is over, write some text
      if (timeDiff < 0) {
          clearInterval(x);
          $('#timer_' + serial).html('Item will be removed from the cart shortly...');
          setInterval(() => {
            $('#cart_' + serial).remove();
          }, 3000);
      }
  }, 1000);
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
    +   `<div>Time Left in Cart: <span id="timer_${serialNumber}"></span></div>`
    + `<button class="pull-right btn" id="remove_${serialNumber}" ng-click="remove('${serialNumber}')">Remove From Cart</button>`
    + `</div>`;
    $('#shopping_cart').show();
    let el = document.getElementById('temp_cart');
    angular.element(el).append(compile(html)(scope));
    countDown(serialNumber);
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
