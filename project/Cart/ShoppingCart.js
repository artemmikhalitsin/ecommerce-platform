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
      let result = '';
      let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      for (let i = 16; i > 0; --i) {
        result += chars[Math.round(Math.random() * (chars.length - 1))];
      }
      return result;
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
          Object.keys(this.cartItems).includes(item),
            'The cart doesn\'t contain that item';
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
