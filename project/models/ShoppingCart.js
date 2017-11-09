/**
 * Class representing a shopping cart
 * @author Amanda Wai, Michael Li
 */
class ShoppingCart {
    // precondition((item) => item === 'lol');
    // postcondition((result) => typeof result === 'string');
    addToCart(item) {
      precondition: {
        typeof item === 'string', 'Item not a string!';
        item === 'not item', 'pls show up';
      }
      postcondition: typeof it === 'string';
      return item;
    }
}

module.exports = ShoppingCart;
