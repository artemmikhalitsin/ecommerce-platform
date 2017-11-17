'use strict';
/**
 * Class representing a shopping cart
 * @author Amanda Wai, Michael Li
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShoppingCart = function () {
  function ShoppingCart() {
    _classCallCheck(this, ShoppingCart);

    this.cartItems = {}; // The key is a serial id
    this.cartItemId = 0;
  }

  _createClass(ShoppingCart, [{
    key: 'getCart',
    value: function getCart() {
      return this.cartItems;
    }
  }, {
    key: 'getCartSerialNumbers',
    value: function getCartSerialNumbers() {
      return Object.keys(this.cartItems);
    }
  }, {
    key: 'addToCart',
    value: function addToCart(item, modelNumber) {
      var _this = this;

      var _checkPostcondition = function _checkPostcondition(it) {
        if (!Object.keys(_this.cartItems).includes(item)) {
          throw new Error('Item was not added to cart');
        }

        return it;
      };

      if (!(Object.keys(this.cartItems).length < 7)) {
        throw new Error('Function  precondition failed: Object.keys(this.cartItems).length < 7');
      }

      if (!this.cartItems[item]) {
        this.cartItems[item] = { cartItemId: this.cartItemId,
          model: modelNumber,
          serial: item
        };
        this.cartItemId++;
      }

      return _checkPostcondition(item);
    }
  }, {
    key: 'removeFromCart',
    value: function removeFromCart(item) {
      var _this2 = this;

      var _checkPostcondition2 = function _checkPostcondition2(it) {
        if (!!Object.keys(_this2.cartItems).includes(item)) {
          throw new Error('Item was not removed from the cart');
        }

        return it;
      };

      if (!(Object.keys(this.cartItems).length > 0)) {
        throw new Error('Function  precondition failed: Object.keys(this.cartItems).length > 0');
      }

      delete this.cartItems[item];
      return _checkPostcondition2(item);
    }
  }]);

  return ShoppingCart;
}();

module.exports = ShoppingCart;