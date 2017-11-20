const rootPath = require('app-root-dir').get();
const PurchaseCollectionRepo = require(rootPath
    + '/DataSource/Repository/PurchaseCollectionRepository.js');
const InventoryItemRepository = require(rootPath +
      '/DataSource/Repository/InventoryItemRepository.js');
const ShoppingCart = require(rootPath +
    '/Cart/ShoppingCart.js');
const ReturnCart = require(rootPath
    + '/models/ReturnCart.js');
const TransactionLogRepository = require(rootPath
      + '/DataSource/Repository/TransactionLogRepository.js');

/**
 * Identity map of inventory items
 * @author Amanda Wai
 * REVIEW: Please make sure the comments are correct - Artem
 */
class PurchaseController {
  constructor() {
    this.purchaseCollectionRepo = new PurchaseCollectionRepo();
    this.transactionRepo = new TransactionLogRepository();
    this.inventoryRepo = new InventoryItemRepository();
    this.clientInventory = {}; // key: serial, value: locked or not locked
    this.shoppingCartList = {}; // carts associated to users k:user, v: cart
    this.returnCartList = {}; // carts for returns.
  }
  /**
   * Updates the Controller's list of current items
   * @param {Object} newInventory Inventory items
  */
  updateInventoryList(newInventory) {
    console.log('UPDATING INVENTORY LIST');
    let inventoryList = [].concat(...newInventory.map((i) => i.serial_numbers));
    inventoryList.forEach((serial, index) => {
      if (!this.clientInventory[serial]) {
        this.clientInventory[serial] = {locked: false,
                                        timeout: null};
      }
    });
    // If item was deleted by an admin, the item list will be updated
    for (let serial in this.clientInventory) {
      if (!inventoryList.includes(serial)) {
        clearTimeout(this.clientInventory[serial].timeout);
        delete this.clientInventory[serial];
      }
    }
    console.log(this.clientInventory);
  }

  /**
    *@param {String} req user who added an item to their cart
    *@param {String} res item user wants to add to their cart
  */
  addToShoppingCart(req, res) {
    invariant: req.session.email != null, 'User is not logged in';
    pre: {
      Object.keys(this.clientInventory).length != 0, 'Catalog is empty';
      this.clientInventory[req.body.serialNumber], 'Item does not exist!';
      if (this.shoppingCartList[req.session.email.toString()]) {
        Object.keys(this.shoppingCartList[req.session.email.toString()]
          .getCart()).length < 7, 'Cart has more than 7 items!';
      }
    }
    /* This particular contract library does not work with asynchronous
       calls. However, these are the postconditions:
    post: {
       this.shoppingCartList[req.session.email]
        .getCartSerialNumbers()
        .includes(req.body.serialNumber), 'Item was not added to the cart';
      this.clientInventory[req.body.serialNumber].locked,
        'Item isn\'t locked';
    }*/
    let item = req.body.serialNumber;
    let productNumber = req.body.modelNumber;
    let user = req.session.email;
    if (!this.shoppingCartList[user]) {
      this.shoppingCartList[user] = new ShoppingCart();
    }
    this.getLatestInventory().then((values) => {
      this.updateInventoryList(values[0]);
      if (this.clientInventory[item]) {
        if (this.clientInventory[item].locked) {
          res.status(500).send({error: 'Item is already locked!'});
        } else {
          this.lockItem(user, item);
          this.shoppingCartList[user].addToCart(item, productNumber);
          res.status(200).send({success: 'Added to cart!'});
        }
      } else {
        res.status(500).send({error: 'Item no longer exists!'});
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({error: 'Not added'});
    });
  }

  removeFromShoppingCart(req, res) {
    invariant: req.session.email != null, 'User is not logged in';
    pre : {
      if (this.clientInventory[req.body.serialNumber]) {
        this.clientInventory[req.body.serialNumber].locked,
          'Item is not locked';
      }
      this.shoppingCartList[req.session.email.toString()] != null,
        'Shopping cart doesn\'t exists';
    }
    post : {
      !this.shoppingCartList[req.session.email.toString()]
        .getCartSerialNumbers().includes(req.body.serialNumber),
        'Item was not removed from the cart';
      if (this.clientInventory[req.body.serialNumber]) {
        !this.clientInventory[req.body.serialNumber].locked,
          'Item is still locked';
      }
    }
    let user = req.session.email;
    let item = req.body.serialNumber;
    if (this.clientInventory[item]) {
      clearTimeout(this.clientInventory[item].timeout);
      this.unlockItem(user, item);
    } else {
      this.shoppingCartList[user].removeFromCart(item);
    }
    res.status(200).send({success: 'Item removed from cart!'});
  }


  /**
    * Unlocks a previously locked items
    * @param {String} user user that owns the item
    * @param {String} itemToUnlock Serial number of item to unlock
  **/
  unlockItem(user, itemToUnlock) {
    invariant: {
      user != null, 'User is not logged in';
      this.clientInventory[itemToUnlock], 'Item doesn\'t exist';
    }
    pre: {
      this.clientInventory[itemToUnlock].locked, 'Item isn\'t locked';
      this.shoppingCartList[user].getCartSerialNumbers()
        .includes(itemToUnlock), 'Item is not in user\'s shopping cart';
    }
    post: {
      !this.clientInventory[itemToUnlock].locked, 'Item is still locked';
      !this.shoppingCartList[user].getCartSerialNumbers()
        .includes(itemToUnlock), 'Item is still part of shopping cart';
    }
    if (this.clientInventory[itemToUnlock]) {
      this.clientInventory[itemToUnlock].locked = false;
      this.clientInventory[itemToUnlock].timeout = null;
      this.shoppingCartList[user].removeFromCart(itemToUnlock);
    }
  }

  /**
   * Locks an item to a user's shopping cart if it isn't already locked
   * @param {String} user the user who chose to lock an item
   * @param {String} itemToLock serial number of item to lock
  */
  lockItem(user, itemToLock) {
    invariant: {
      user != null, 'User is not logged in';
      this.clientInventory[itemToLock], 'Item doesn\'t exist';
    }
    pre: {
      this.clientInventory[itemToLock].locked == false,
        'Item is already locked';
    }
    post: {
      this.clientInventory[itemToLock].locked === true,
        'Item was not successfully locked';
    }
    this.clientInventory[itemToLock].locked = true;
    this.clientInventory[itemToLock].timeout = setTimeout(
      this.unlockItem.bind(this), 300000, user, itemToLock);
  }

  /**
  * Deletes the user's shopping cart
  * @param {String} user This user will have their shopping cart removed
  */
  deleteShoppingCart(user) {
    delete this.shoppingCartList[user];
  }

  /**
   * Submits purchase transaction to database
   * @param {Object} req
   * @param {Object} res
  */
  completePurchaseTransaction(req, res) {
    invariant: req.session.email != null, 'User is not logged in';
    pre: {
      Object.keys(this.shoppingCartList[req.session.email]
        .getCart()).length > 0, 'User has an empty cart';
      Object.keys(this.shoppingCartList[req.session.email]
        .getCart()).length <= 7, 'Cart size too big';
    }
    /* This particular contract library does not work with asynchronous
       calls. However, these are the postconditions:
    post: {
      this.shoppingCartList[req.session.email.toString()] == null,
        'Shopping cart still exists';
    } */

    let user = req.session.email;
    let cart = Object.values(this.shoppingCartList[user].getCart());
    let purchases = [];
    this.getLatestInventory().then((values) => {
      this.updateInventoryList(values[0]);
      let inventoryList = [].concat(...values[0].map((i) => i.serial_numbers));
      let deletedItems = this.shoppingCartList[user].getCartSerialNumbers()
        .filter((cartSerial) => inventoryList.indexOf(cartSerial) == -1);
      if (deletedItems.length > 0) {
        res.status(500).send({error:
          `Item(s) ${deletedItems.join(', ')} no longer exist.
          Remove them to complete the transaction`});
      } else if (deletedItems.length === 0) {
        for (let i in Object.keys(cart)) {
          if (cart[i]) {
              clearTimeout(this.clientInventory[cart[i].serial].timeout);
              purchases.push({client: user,
                                  model_number: cart[i].model,
                                  serial_number: cart[i].serial,
                                  purchase_Id: cart[i].cartItemId});
              delete this.clientInventory[cart[i].serial];
          }
        }
        let transaction = [{client: user,
                            timestamp: new Date().toISOString()}];
        this.purchaseCollectionRepo.save(purchases);
        this.transactionRepo.save(transaction);
        this.deleteShoppingCart(user);
        res.status(200).send({success: 'Successful purchase'});
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  /**
   * Submits cancel transaction and frees locked items, if any
   * @param {Object} req
   * @param {Object} res
  */
  cancelPurchaseTransaction(req, res) {
    invariant: req.session.email != null, 'User is not logged in';
    pre: {
      this.shoppingCartList[req.session.email] != null,
      'A transaction has not been initiated!';
    }

    let user = req.session.email.toString();
    let cartItems = this.shoppingCartList[user].getCartSerialNumbers();
    for (let item = 0; item < cartItems.length; item++) {
      if (this.clientInventory[cartItems[item]]) {
        this.unlockItem(user, cartItems[item]);
        clearTimeout(this.clientInventory[cartItems[item]].timeout);
      }
    }
    delete this.shoppingCartList[user];
    res.status(200).send({success: 'Successfully canceled'});
    post: {
      this.shoppingCartList[req.session.email.toString()] == null,
      'The user\'s shopping cart still exists; transaction is still active';
    }
  }

  deleteReturnCart(user) {
    delete this.returnCartList[user];
  }
  /**
   * Submits return transaction to database
   * @param {Object} req
   * @param {Object} res
  */
  returnPurchaseTransaction(req, res) {
    let user = req.session.email.toString();
    let returnCart = Object.values(this.returnCartList[user].getCart());
    let returns = [];
    for (let i in Object.keys(returnCart)) {
      if (returnCart[i]) {
        returns.push({client: user,
                            model_number: returnCart[i].model,
                            serial_number: returnCart[i].serial,
                            purchase_Id: returnCart[i].cartItemId});
      }
    }
    let transaction = [{client: user,
                        timestamp: new Date().toISOString()}];

    this.purchaseCollectionRepo.returnItems(returns);
    this.transactionRepo.save(transaction);
    this.deleteReturnCart(user);
    res.status(200).send({success: 'Successful Return'});

    post: {
      this.returnCartList[req.session.email.toString()] == null,
        'Return cart still exists';
    }
  }

  addToReturnCart(req, res) {
    pre: {
      req.session.email != null, 'User is not logged in';
    }

    let returnItem = req.body.serialNumber;
    let productNumber = req.body.modelNumber;

    if (true) {
      let user = req.session.email.toString();
      if (!this.returnCartList[user]) {
        this.returnCartList[user] = new ReturnCart();
      }

      this.returnCartList[user].addToReturnCart(returnItem, productNumber);
      res.status(200).send({sucess: 'successfully added'});
    } else {
      res.status(500).send({error: 'item in another cart'});
    }
    post: {

    }
  }
  viewPurchaseCollection(req, res) {
    this.purchaseCollectionRepo.get(req.session.email).then(
      (result) => {
        res.json(result);
      }
    );
  }

  /**
   * Gets a complete list of products and serial numbers from
   * the database and updates the list of available items
   * @return {Object} Promise to update inventory
   */
  getLatestInventory() {
    let prodDesc = this.inventoryRepo.getAllInventoryItems();
    return Promise.all([prodDesc]);
  }
}
module.exports = PurchaseController;
