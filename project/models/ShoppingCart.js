'use strict';
/**
 * Class representing a shopping cart
 * @author Amanda Wai, Michael Li
 */
class ShoppingCart {
    constructor() {
      this.cartItems = {}; // The key is a serial id
    }

    getCart() {
      return this.cartItems;
    }

    getCartSerialNumbers() {
      return Object.keys(this.cartItems);
    }

    generatePurchaseId() {
        return Math.round((Math.pow(36, 17) - Math.random()
              * Math.pow(36, 16))).toString(36).slice(1).toUpperCase();
    }

    addToCart(item, modelNumber) {
      pre: {
        Object.keys(this.cartItems).length < 7;
      }
      if (!this.cartItems[item]) {
        this.cartItems[item] = {cartItemId: this.generatePurchaseId(),
                              model: modelNumber,
                              serial: item,
                              };
      }
      post: {
        Object.keys(this.cartItems).includes(item),
          'Item was not added to cart';
      }
      return item;
    }

    removeFromCart(item) {
      pre: {
          Object.keys(this.cartItems).length > 0;
        }
        delete this.cartItems[item];
        return item;
      post: {
          !Object.keys(this.cartItems).includes(item),
            'Item was not removed from the cart';
      }
    }
}

module.exports = ShoppingCart;
