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
      return Object.values(this.cartItems);
    }


    addToCart(item, modelNumber) {
      precondition: {
        // !this.cartItems.includes(item);
        this.cartItems[item] != true;
        Object.keys(this.cartItems) < 7;
      };
      if (!this.cartItems[item]) {
        this.cartItems[item] = {cartItemId: this.cartItemId,
                              model: modelNumber,
                              serial: item,
                              };
        this.cartItemId++;
      }
      return item;
      postcondition: {
        this.cartItems.length === old(this.cartItems.length) + 1;
      }
    }

    removeFromCart(item) {
      precondition: {
        // this.cartItems.includes(item);
        Object.keys(this.cartItems) > 0;
      }
      delete this.cartItems[item];
      return item;
      postcondition: {
        !this.cartItems.includes(item);
        this.cartItems.length === old(this.cartItems.length) - 1;
      }
    }
}

module.exports = ShoppingCart;
