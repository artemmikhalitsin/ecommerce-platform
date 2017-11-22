'use strict';
/**
 * Class representing a return cart
 * @author Amanda Wai, Michael Li
 */
class ReturnCart {
    constructor() {
      this.returnCartItems = {}; // The key is a serial id
    }

    getCart() {
      return this.returnCartItems;
    }

    getCartSerialNumbers() {
      return Object.keys(this.returnCartItems);
    }

    addToReturnCart(item, modelNumber, purchaseId) {
      if (!this.returnCartItems[item]) {
        this.returnCartItems[item] = {
                              model: modelNumber,
                              serial: item,
                              purchaseId: purchaseId,
                              };
      }
      post: {
        Object.keys(this.returnCartItems).includes(item),
          'Item was not added to cart';
      }
      return item;
    }

    removeFromCart(item) {
      pre: {
          Object.keys(this.returnCartItems).length > 0;
        }
        delete this.returnCartItems[item];
        return item;
      post: {
          !Object.keys(this.returnCartItems).includes(item),
            'Item was not removed from the cart';
      }
    }
}

module.exports = ReturnCart;
