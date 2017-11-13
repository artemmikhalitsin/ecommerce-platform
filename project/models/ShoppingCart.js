'use strict';
/**
 * Class representing a shopping cart
 * @author Amanda Wai, Michael Li
 */
class ShoppingCart {
    constructor() {
      this.cartItems = {}; // The key is a serial id
      this.cartItemId = 0;
    }

    getCart() {
      return this.cartItems;
    }

    getCartSerialNumbers() {
      return Object.keys(this.cartItems);
    }


    addToCart(item, modelNumber) {
      pre: {
        Object.keys(this.cartItems).length < 7;
      }
      if (!this.cartItems[item]) {
        this.cartItems[item] = {cartItemId: this.cartItemId,
                              model: modelNumber,
                              serial: item,
                              };
        this.cartItemId++;
      }
      post: {
        Object.keys(this.cartItems).length ===
          old(Object.keys(this.cartItems).length) + 1;
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
          !Object.keys(this.cartItems).includes(item);
          this.cartItems.length === old(this.cartItems.length) - 1;
      }
    }
}

module.exports = ShoppingCart;
