'use strict';

console.log('catalog module loaded');
var catalog = angular.module('catalog', ['rowItem']);

function catalogController($scope) {
  $scope.products = [{
    model_number: 'iPad Air',
    brand_name: 'Apple',
    type: 'tablet',
    price: '699.99',
    weight: '300g'
  }, {
    'type': 'tablet',
    'model_number': '562428802-6',
    'brand_name': 'ante ipsum primis',
    'price': 411.69,
    'weight': 290.06,
    'processor_type': 'cohesive',
    'ram_size': 8253,
    'number_cpu_cores': 12,
    'harddrive_size': 1109,
    'display_size': 24,
    'battery_info': 'dedicated',
    'os': 'Extended',
    'camera_info': 'nulla ultrices aliquet maecenas',
    'depth': 260,
    'height': 88,
    'width': 238
  }, {
    model_number: 'Bamboo',
    brand_name: 'Toshiba',
    type: 'monitor',
    price: '199.99',
    weight: '400g'
  }, {
    'type': 'desktop',
    'model_number': '898252034-1',
    'brand_name': 'ornare',
    'price': 461.95,
    'weight': 128.36,
    'processor_type': 'Re-contextualized',
    'ram_size': 4105,
    'number_cpu_cores': 11,
    'harddrive_size': 1757,
    'depth': 154,
    'height': 164,
    'width': 194
  }];

  $scope.$on('updateDescription', function (event, product, index) {
    console.log(JSON.stringify(product) + ' updated at index ' + index);
  });
}

catalog.controller('CatalogController', ['$scope', catalogController]);

catalog.config(function ($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});