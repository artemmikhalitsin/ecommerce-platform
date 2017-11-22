'use strict';
/**
 * Class representing a return cart
 * @author Amanda Wai, Michael Li
 */
class ReturnCart {
    constructor() {
      this._returnCartItems = {}; // The key is a serial id
    }

    getCart() {
      return Object.assign({}, this._returnCartItems);
    }

    getCartSerialNumbers() {
      return Object.keys(this._returnCartItems);
    }

    addToReturnCart(item, modelNumber) {
      if (!this._returnCartItems[item]) {
        this._returnCartItems[item] = {
                              model: modelNumber,
                              serial: item,
                              };
      }
      post: {
        // REVIEW: this post condition will always evaluate
        // to false as you cannot use includes with complex
        // data structures (objects, arrays, etc.) - Artem
        Object.keys(this._returnCartItems).includes(item),
          'Item was not added to cart';
      }
      return item;
    }
    // REVIEW: if you are passing whole objects here,
    // use model number for comparison. you cannot compare
    // whole data structures like this - Artem
    removeFromCart(item) {
      pre: {
          Object.keys(this._returnCartItems).length > 0;
        }
        delete this._returnCartItems[item];
        return item;
      post: {
        // REVIEW: see above - Artem
          !Object.keys(this._returnCartItems).includes(item),
            'Item was not removed from the cart';
      }
    }
}

module.exports = ReturnCart;
