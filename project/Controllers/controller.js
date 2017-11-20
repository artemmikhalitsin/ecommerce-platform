const rootPath = require('app-root-dir').get();
const ProductDescriptionRepository = require(rootPath +
  '/DataSource/Repository/ProductDescriptionRepository.js');
const InventoryItemRepository = require(rootPath +
  '/DataSource/Repository/InventoryItemRepository.js');
const UserRepository = require(rootPath +
  '/DataSource/Repository/UserRepository.js');
const PurchaseCollectionRepo = require(rootPath
    + '/DataSource/Repository/PurchaseCollectionRepository.js');
const ShoppingCart = require(rootPath +
<<<<<<< HEAD
    '/models/ShoppingCart.js');
const ReturnCart = require(rootPath
    + '/models/ReturnCart.js');
=======
    '/Cart/ShoppingCart.js');
>>>>>>> 1ea10958ff93a9e9a62e7354f1e53a66ffe30090
const TransactionLogRepository = require(rootPath
      + '/DataSource/Repository/TransactionLogRepository.js');

/**
 * Identity map of inventory items
 * @author Wai Lau, Amanda Wai
 * REVIEW: Please make sure the comments are correct - Artem
 */
class Controller {
  /**
   * Constructor creates a new instanted of a user item and product repos
   */
  constructor() {
    this.userRepo = new UserRepository();
    this.inventoryRepo = new InventoryItemRepository();
    this.productDescriptionRepo = new ProductDescriptionRepository();
    this.purchaseCollectionRepo = new PurchaseCollectionRepo();
    this.transactionRepo = new TransactionLogRepository();
    this.clientInventory = {}; // key: serial, value: locked or not locked
    this.shoppingCartList = {}; // carts associated to users k:user, v: cart
    this.returnCartList = {}; // carts for returns.
    this.url = require('url');
    this.crypto = require('crypto');
  }

  /**
   * Processes a registration registrationRequest
   * @param {Object} req Incoming HTTP request containing registration info
   * @param {Object} res HTTP Response object to be sent back to user
   */
  registrationRequest(req, res) {
    let userData = req.body;
    let password = userData['password'];
    let confirmPassword = userData['confirmPassword'];
    let hash = this.crypto.createHash('sha256');
    let salted = userData['email'] + password + 'salt';
    userData['password'] = hash.update(salted).digest('hex');
    if (password != confirmPassword) {
      console.log('password confirmation failed. try again...');
      res.redirect('/registration');
    } else {
      delete userData['confirmPassword'];
      let email = userData['email'];
      this.userRepo.verifyEmail(email).then( (result) => {
        console.log(result);
        if (result.length == 0) {
          console.log('adding new user');
          userData['is_admin'] = false;
          console.log(userData);
          this.userRepo.save(userData).then( (result) => {
            console.log('success: ' + result);
            res.redirect('/login');
          })
          .catch( (err) => {
            console.log('failed: ' + err);
            res.redirect('/registration');
          });
        } else {
          console.log('Email already exists');
          res.redirect('/registration');
        }
      })
      .catch( (err) => {
        console.log(err);
        console.log('something bad happened');
      });
    }
  }


  /**
   * Updates the Controller's list of current items
   * @param {Object} newInventory Inventory items
  */
  updateInventoryList(newInventory) {
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
<<<<<<< HEAD
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
=======
    invariant: req.session.email != null, 'User is not logged in';
    let returnItem = res;

    /* res.forEach((product, serialNumber) => {
>>>>>>> 1ea10958ff93a9e9a62e7354f1e53a66ffe30090

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
   * Retrieves a complete list of products and serial numbers from
   * the database
   * @param {Object} req HTTP Request object containing query info
   * @param {Object} res HTTP Response object to be send back to the user
   */

  getAllInventory(req, res) {
    let query = this.url.parse(req.url, true).query;
    let search = query.search;
    let prodDesc = this.inventoryRepo.getAllInventoryItems();
    Promise.all([prodDesc])
    .then((values) => {
      let items = JSON.stringify(values[0]);
      // items = JSON.stringify(toSave);
      // console.log('Values: ', items);

      if (req.session.exists==true && req.session.isAdmin==true) {
        res.render('inventory', {items: items, search: search});
      } else {
        this.updateInventoryList(values[0]); // Populate shopping inventory list
        res.render('clientInventory', {search: search});
      }
    })
    .catch((err) => {
      console.log(err);
    });
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

  /**
   * Processes an inventory action initiated by the user
   * @param {Object} req HTTP request object containing action info
   * @param {Object} res HTTP response object to be returned to the user
   */

  logout(req, res) {
    if (req.session.exists) {
      req.session.destroy();
      res.redirect('/');
    }
  }


  inventoryAction(req, res) {
    if (req.session.exists==true && req.session.isAdmin==true) {
      let request = req.body;
      console.log(request.actions);
      let actions = JSON.parse(request.actions);
      for (let key in actions) {
        if (key == 'deleteSerials') {
          console.log('To be deleted: ');
          for (let i = 0; i < actions[key].length; i++) {
            let serialsToDelete = actions[key][i];
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+/.test(serialsToDelete)) {
              let serial = serialsToDelete.split('@')[0];
              let model = serialsToDelete.split('@')[1];
              console.log(i + ': ' + serial + ': ' + model);
            }
          }
        }
        if (key == 'addSerials') {
          console.log('To be added: ');
          for (let i = 0; i < actions[key].length; i++) {
            let serialsToAdd = actions[key][i];
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+/.test(serialsToAdd)) {
              let serial = serialsToAdd.split('@')[0];
              let model = serialsToAdd.split('@')[1];
              console.log(i + ': ' + serial + ': ' + model);
              // Insert actual add function later
              if (serial === 'break') {
                res.status(500).send({error: 'Something bad happened'});
              }
            }
          }
        }
      }
      res.status(200).send({success: 'Something gud happened'});
    } else {
      console.log('Not admin, fool!');
    }
  }

  /**
   * Processes a login request
   * @param {Object} req HTTP request containing login info
   * @param {Object} res HTTP response to be returned to the user
   */

  loginRequest(req, res) {
    if (req.session.exists) {
      res.redirect('/getAllInventoryItems');
    } else {
      res.render('login', {error: 'Invalid username/password'});
    }
  }

  getProductInfo(req, res, other) {
    this.inventoryRepo.getAllInventoryItems().then(
      (result) => {
        res.json(result);
      }
    );
  }

  getClients(req, res) {
    this.userRepo.getAdmins().then(
      (result) => {
        res.json(result);
      }
    );
  }
}

module.exports = Controller;
