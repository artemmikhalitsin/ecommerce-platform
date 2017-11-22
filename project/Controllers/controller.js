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
const TransactionLogRepository = require(rootPath +
  '/DataSource/Repository/TransactionLogRepository.js');
const InventoryItem = require(rootPath +
  '/models/InventoryItem.js');
const User = require(rootPath +
  '/models/User.js');

let validator = require('validator');

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
    this.url = require('url');
    this.crypto = require('crypto');
  }

  /**
   * Validates the registration request sent by the user
   * @author Ajmer Singh Gadreh
   * @param {Object} userData it contains all the data sent from the user
   * NOTE: Still in progress
   */
  validateRegistrationRequest(userData) {
    let errors = [];

    // Checking for empty data fields
    Object.keys(userData).forEach((element) => {
      let data = validator.trim(userData[element]);
      if (validator.isEmpty(data)) {
        errors.push('The ' + element + ' cannot be empty OR have only spaces');
      }
    });

    // Validating the fields
    if (errors.length == 0) {
      let phone = validator.blacklist(userData['phone_number'], ' ( ) ');
      let email = userData['email'];
      let password = userData['password'];
      let confirmPassword = userData['confirmPassword'];

      // validating phone number
      if (!validator.isMobilePhone(phone, 'en-CA')) {
        errors.push('The phone number is invalid');
      }

      // checking email
      if (!validator.isEmail(email)) {
        errors.push('The email is invalid');
      }

      // Checking password length
      if (!validator.isLength(password, {min: 6, max: 20})) {
        errors.push('Password length is not between 6 and 20');
      }

      // Comparing password with confirmPassword
      if (!validator.equals(password, confirmPassword)) {
        errors.push('Confirmation of password failed');
      }

      // Checking white spaces in password
      if (validator.contains(password, ' ')) {
        errors.push('Password cannot contain spaces');
      }
    }

    return errors;
  }

  /**
   * Processes a registration registrationRequest
   * @author Ajmer Singh Gadreh
   * @param {Object} req Incoming HTTP request containing registration info
   * @param {Object} res HTTP Response object to be sent back to user
   */
  registrationRequest(req, res) {
    let messages = [];
    let userData = req.body;
    let errors = this.validateRegistrationRequest(userData);

    if (errors.length > 0) {
      // if it reaches here, then some validation failed. Send errors back
      res.redirect('/registration');
    } else {
      this.userRepo.verifyEmail(userData['email']).then( (result) => {
        if (result.length == 0) {
          let hash = this.crypto.createHash('sha256');
          let salted = userData['email'] + userData['password'] + 'salt';
          userData['password'] = hash.update(salted).digest('hex');

          // creating a user object by using the provided data
          let user = new User(
            userData['first_name'], userData['last_name'],
            userData['phone_number'], userData['email'],
            userData['full_address'], userData['password'], false
          );

          // About to save the user into the database
          this.userRepo.save(user).then( () => {
            // the following message should be passed to login page
            messages.push('Your account has been created! You can login now!');
            res.redirect('/login');
          })
          .catch( (err) => {
            // send the following error to the registration page
            errors.push('Something bad happened while processing the request');
            res.redirect('/registration');
          });
        } else {
          // send the following error to the registration page
          errors.push('The email is already taken! Please provide another one');
          res.redirect('/registration');
        }
      })
      .catch( (err) => {
        console.log(err);
        console.log('something bad happened while processing the request');
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
      req.session.email != null, 'User is not logged in';
      Object.keys(this.clientInventory).length != 0, 'Catalog is empty';
      !this.clientInventory[req.body.serialNumber].locked, 'Item is locked';
      if (this.shoppingCartList[req.session.email.toString()]) {
        Object.keys(this.shoppingCartList[req.session.email.toString()]
          .getCart()).length < 7, 'Cart has more than 7 items!';
      }
    }

    let item = req.body.serialNumber;
    let productNumber = req.body.modelNumber;
    if (this.lockItem(item)) {
      let user = req.session.email.toString();
      if (!this.shoppingCartList[user]) {
        this.shoppingCartList[user] = new ShoppingCart();
      }
      this.shoppingCartList[user].addToCart(item, productNumber);
      res.status(200).send({success: 'successfully added'});
    } else {
      res.status(500).send({error: 'item already in another cart'});
    }

    post: {
      this.shoppingCartList[req.session.email.toString()]
        .getCartSerialNumbers()
        .includes(req.body.serialNumber), 'Item was not added to the cart';
      this.clientInventory[req.body.serialNumber].locked,
        'Item isn\'t locked';
    }
  }

  removeFromShoppingCart(req, res) {
    pre : {
      req.session.email != null, 'User is not logged in';
      this.clientInventory[req.body.serialNumber].locked,
        'Item is not locked';
      this.shoppingCartList[req.session.email.toString()] != null,
        'Shopping cart doesn\'t exists';
    }
    let user = req.session.email;
    let item = req.body.serialNumber;
    this.shoppingCartList[user].removeFromCart(item);
    this.clientInventory[item].locked = false;
    clearTimeout(this.clientInventory[item].timeout);
    res.status(200).send({success: 'Hurray!'});
    post : {
      !this.shoppingCartList[req.session.email.toString()]
        .getCartSerialNumbers().includes(req.body.serialNumber),
        'Item was not removed from the cart';
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
        this.unlockItem.bind(this), 300000, itemToLock);
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
      Object.keys(this.shoppingCartList[req.session.email.toString()]
        .getCart()).length <= 7, 'Cart size too big';
    }

    let user = req.session.email.toString();
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
    let transaction = [{client: user,
                        timestamp: new Date().toISOString()}];

    this.purchaseCollectionRepo.save(purchases);
    this.transactionRepo.save(transaction);
    this.deleteShoppingCart(user);
    res.status(200).send({success: 'Successful purchase'});
    post: {
      this.shoppingCartList[req.session.email.toString()] == null,
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
      this.shoppingCartList[req.session.email.toString()] != null;
    }

    let user = req.session.email.toString();
    let cartItems = this.shoppingCartList[user].getCartSerialNumbers();
    for (let item = 0; item < cartItems.length; item++) {
      console.log(cartItems[item]);
      this.unlockItem(cartItems[item]);
      clearTimeout(this.clientInventory[cartItems[item]].timeout);
    }
    delete this.shoppingCartList[user];
    res.status(200).send({success: 'Successfully canceled'});

    post: {
      this.shoppingCartList[req.session.email.toString()] == null;
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
   * @author Katia & Ajmer
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
        return this.inventoryRepo.getByModelNumbers([product.modelNumber]).then(
          (values)=>{
            product.serial_numbers = values.map((p) => p.serial_number);
            inventory.push(product);
          });
        });
      }).then((val)=>{
        console.log('Values: ', JSON.stringify(inventory));
      if (req.session.exists==true && req.session.isAdmin==true) {
        res.render('inventory',
                   {items: JSON.stringify(inventory), search: search});
      } else if (req.session.exists==true && req.session.isAdmin==false) {
        this.updateInventoryList(inventory);
        res.render('clientInventory',
                   {items: JSON.stringify(inventory), search: search});
      } else {
        res.render('clientInventory',
                   {items: JSON.stringify(inventory), search: search});
      }
      }).catch((err) => {
        console.log(err);
      });
  }

  manageProductCatalog(req, res) {
    let productDescriptions = JSON.parse(req.body.productDescriptions);
    let results = this.productDescriptionRepo.save(productDescriptions).then(
      (results) => {
        console.log('Success saving the Product descriptions!');
        this.getCatalog(req, res);
      });
  }

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
