/* const contract = require('contract-decorators');
const {precondition, postcondition} = contract;

class CustomPreconditionError extends Error {
  constructor(method, predicate, argument, index) {
    super('bad precondition!');
  }
}

class CustomPostConditionError extends Error {
  constructor(method, predicate, argument, index) {
    super('bad postcondition!');
  }
}

contract.configure({
  enabled: true,
  PreconditionError: CustomPreconditionError,
  PostconditionError: CustomPostConditionError,
}); */

/**
 * Class representing a shopping cart
 * @author Amanda Wai, Michael Li
 * ATTRIBUTE THIS TO YOURSELF
 */
class ShoppingCart {
    // precondition((item) => item === 'lol');
    // postcondition((result) => typeof result === 'string');
    addToCart(item) {
      pre:
        typeof item === 'string';
      console.log(item);
      return item;
      post:
        typeof it === 'string';
    }
}

module.exports = ShoppingCart;
