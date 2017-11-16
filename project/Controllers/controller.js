const Promise = require('bluebird');
const rootPath = require('app-root-dir').get();
const ProductDescriptionRepository = require(rootPath +
  '/DataSource/Repository/ProductDescriptionRepository.js');
const InventoryItemRepository = require(rootPath +
  '/DataSource/Repository/InventoryItemRepository.js');
const UserRepository = require(rootPath +
  '/DataSource/Repository/UserRepository.js');
const PurchaseCollectionRepo = require(rootPath +
  '/DataSource/Repository/PurchaseCollectionRepository.js');
const ShoppingCart = require(rootPath +
  '/models/ShoppingCart.js');
const InventoryItem = require(rootPath +
  '/models/InventoryItem.js');

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
    // List of inventory items, key: serial number, value: locked or not locked
    this.clientInventory = {};
    // List of shopping carts associated to users key:user, value: shopping cart
    this.shoppingCartList = {};
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
      console.log('password confirmation failed. please try again...');
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
    newInventory.forEach((product, index) => {
      product.serial_numbers.forEach((serialNumber, index) => {
        if (!this.clientInventory[serialNumber]) {
          this.clientInventory[serialNumber] = {
                                                locked: false,
                                                timeout: null};
        }
      });
    });
  }

  /**
    *@param {String} req user who added an item to their cart
    *@param {String} res item user wants to add to their cart
  */
  addToShoppingCart(req, res) {
    pre: {
      req.session.user != null, 'User is not logged in';
      Object.keys(this.clientInventory).length != 0, 'Catalog is empty';
      !this.clientInventory[req.body.serialNumber].locked, 'Item is locked';
      if (this.shoppingCartList[req.session.user.toString()]) {
        Object.keys(this.shoppingCartList[req.session.user.toString()]
          .getCart()).length < 7, 'Cart has more than 7 items!';
      }
    }

    let item = req.body.serialNumber;
    let productNumber = req.body.modelNumber;
    if (this.lockItem(item)) {
      let user = req.session.user.toString();
      if (!this.shoppingCartList[user]) {
        this.shoppingCartList[user] = new ShoppingCart();
      }
      this.shoppingCartList[user].addToCart(item, productNumber);
      res.status(200).send({success: 'successfully added'});
    } else {
      res.status(500).send({error: 'item already in another cart'});
    }

    post: {
      this.shoppingCartList[req.session.user.toString()].getCartSerialNumbers()
        .includes(req.body.serialNumber), 'Item was not added to the cart';
      this.clientInventory[req.body.serialNumber].locked, 'Item isn\'t locked';
    }
  }

  removeFromShoppingCart(req, res) {
    pre : {
      req.session.user != null, 'User is not logged in';
      this.shoppingCartList[req.session.user.toString()] != null,
        'Shopping cart doesn\'t exists';
    }

    let item = req.body.serialNumber;
    this.shoppingCartList[user].removeFromCart(item);
    clearTimeout(this.clientInventory[item].timeout);

    post : {
      !this.shoppingCartList[req.session.user.toString()].getCartSerialNumbers()
        .includes(req.body.serialNumber), 'Item was not removed from the cart';
      !this.clientInventory[req.body.serialNumber].locked,
        'Item is still locked';
    }
  }

  /**
    * Unlocks a previously locked items
    * @param {String} itemToUnlock Serial number of item to unlock
  **/
  unlockItem(itemToUnlock) {
    pre: {
      this.clientInventory[itemToUnlock].locked, 'Item isn\'t locked';
    }
    this.clientInventory[itemToUnlock].locked = false;
    this.clientInventory[itemToUnlock].timeout = null;

    post: {
      !this.clientInventory[itemToUnlock].locked, 'Item is still locked';
    }
  }

  /**
   * Locks an item to a user's shopping cart if it isn't already locked
   * @param {Object} itemToLock serial number of item to lock
   * @return {Boolean} Returns whether or not the item was locked
  */
  lockItem(itemToLock) {
    pre: {
      this.clientInventory[itemToLock] != null,
        'Inventory item doesn\'t exists!';
    }
    if (this.clientInventory[itemToLock] == null ||
        this.clientInventory[itemToLock].locked) {
      return false;
    } else {
      this.clientInventory[itemToLock].locked = true;
      // Store pointer of timeout function
      this.clientInventory[itemToLock].timeout = setTimeout(
        this.unlockItem.bind(this), 100000, itemToLock);
      return true;
    }
    post: {
      this.clientInventory[itemToLock].locked === true,
        'Item was not successfully locked';
    }
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
    pre: {
      Object.keys(this.shoppingCartList[req.session.user.toString()]
        .getCart()).length <= 7, 'Cart size too big';
    }

    let user = req.session.user.toString();
    let cart = Object.values(this.shoppingCartList[user].getCart());
    let purchases = [];
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
    this.purchaseCollectionRepo.save(purchases);
    this.deleteShoppingCart(user);
    console.log('purchase completed successfully');
    res.status(200).send({success: 'Successful purchase'});
    post: {
      this.shoppingCartList[req.session.user.toString()] == null,
        'Shopping cart still exists';
    }
  }

  /**
   * Submits cancel transaction and frees locked items, if any
   * @param {Object} req
   * @param {Object} res
  */
  cancelPurchaseTransaction(req, res) {
    pre: {
      this.shoppingCartList[req.session.user.toString()] != null;
    }

    let user = req.session.user.toString();
    let cartItems = this.shoppingCartList[user].getCartSerialNumbers();
    for (let item = 0; item < cartItems.length; item++) {
      console.log(cartItems[item]);
      this.unlockItem(cartItems[item]);
      clearTimeout(this.clientInventory[cartItems[item]].timeout);
    }
    delete this.shoppingCartList[user];
    res.status(200).send({success: 'Successfully canceled'});

    post: {
      this.shoppingCartList[req.session.user.toString()] == null;
    }
  }

  /**
   * Submits return transaction to database
   * @param {Object} req
   * @param {Object} res list/array of serial numbers of returned items
  */
  returnPurchaseTransaction(req, res) {
    let returnItem = res;

    /* res.forEach((product, serialNumber) => {

    });*/

    this.purchaseCollectionRepo.returnItems(returnItem);
  }

  viewPurchaseCollection(req, res) {
    let cart = this.purchaseCollectionRepo.get('*');
    Promise.all([cart])
    .then((values) => {
      let items = JSON.stringify(values[0]);
      console.log(items);
    })
    .catch((err) => {
      console.log(err);
    });
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
    let inventory = [];
    let productDescriptions = this.productDescriptionRepo.getAllWithIncludes()
    .then((results)=>{
       return Promise.each(results, (product)=>{
        return this.inventoryRepo.getByModelNumbers([product.modelNumber]).then((values)=>{
                  product.serial_numbers = values.map((p) => p.serialNumber);
                  inventory.push(product);
                });
      });
      }).then((val)=>{
        console.log('Values: ', JSON.stringify(inventory));
      if (req.session.exists==true && req.session.isAdmin==true) {
        res.render('inventory', {items: JSON.stringify(inventory), search: search});
      } else if (req.session.exists==true && req.session.isAdmin==false) {
        this.updateInventoryList(inventory);
        res.render('clientInventory', {items: JSON.stringify(inventory), search: search});
      } else {
        res.render('clientInventory', {items: JSON.stringify(inventory), search: search});
      }
      }).catch((err) => {
      console.log(err); 
    });
  }

  manageInventory(inventoryItems) {
    let results = this.inventoryRepo.save(inventoryItems);
  }
  getProductDescription(req, res){
    let query = this.url.parse(req.url, true).query;
    let search = query.search;
    let catalog = [];
    let productDescriptions = this.productDescriptionRepo.getAllWithIncludes()
    .then((results)=>{
        console.log('Product Descriptions: ', JSON.stringify(results));
        //res.render('catalog', {items: JSON.stringify(results), search: search});
      if (req.session.exists==true && req.session.isAdmin==true) {
        return res.send({items: results, search: search});
      } 
      }).catch((err) => {
      console.log(err);
    });
  }
  getCatalog(req, res) {
    let query = this.url.parse(req.url, true).query;
    let search = query.search;
    let catalog = [];
    let productDescriptions = this.productDescriptionRepo.getAllWithIncludes()
    .then((results)=>{
        console.log('Product Descriptions: ', JSON.stringify(results));
        //res.render('catalog', {items: JSON.stringify(results), search: search});
      if (req.session.exists==true && req.session.isAdmin==true) {
        res.render('catalog', {items: JSON.stringify(results), search: search});
      } else if (req.session.exists==true && req.session.isAdmin==false) {
        //update descriptions?
        //this.updateInventoryList(results);
        res.render('catalog', {items: JSON.stringify(results), search: search});
      } else {
        res.render('catalog', {items: JSON.stringify(results), search: search});
      }
      }).catch((err) => {
      console.log(err);
    });
  }
  /*
  manageInventory() {
    let results = this.inventoryRepo.save(toSave);
>>>>>>> 2413f9c6a06c9a687673fe13e9b0e25e5630ad9b
  }
  manageProductCatalog(productDescriptions) {
    let results = this.productDescriptionRepo.save(productDescriptions);
  }
<<<<<<< HEAD
  mapInventoryItems(inventory){

  }
  mapRPoductDescriptions(catalog){

  }
=======
  */

  logout(req, res) {
    if (req.session.exists) {
      req.session.destroy();
      res.redirect('/');
    }
  }
  /**
   * Processes an inventory action initiated by the user
   * @param {Object} req HTTP request object containing action info
   * @param {Object} res HTTP response object to be returned to the user
   */
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
}

module.exports = Controller;
