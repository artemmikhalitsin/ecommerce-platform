'use strict';
/**
 * Class representing a return cart
 * @author Amanda Wai, Michael Li
 */
class ReturnCart {
    constructor() {
      this._returnCartItems = {}; // Keys are serial numbers
    }

    getCart() {
      return Object.assign({}, this._returnCartItems);
    }

    getCartSerialNumbers() {
      return Object.keys(this._returnCartItems);
    }

    addToReturnCart(serialNumber, modelNumber) {
      if (!this._returnCartItems[serialNumber]) {
        this._returnCartItems[serialNumber] = {
                              model: modelNumber,
                              serial: serialNumber,
                              };
      }
      post: {
        Object.keys(this._returnCartItems).includes(serialNumber),
          'Item was not added to cart';
      }
      return item;
    }
    removeFromCart(serialNumber) {
      pre: {
          Object.keys(this._returnCartItems).length > 0;
        }
        delete this._returnCartItems[serialNumber];
        return item;
      post: {
          !Object.keys(this._returnCartItems).includes(serialNumber),
            'Item was not removed from the cart';
      }
    }
}

module.exports = ReturnCart;
