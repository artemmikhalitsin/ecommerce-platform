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
    '/models/ShoppingCart.js');


/**
 * Identity map of inventory items
 * @author TODO: IF YOU WROTE THIS CLASS, ATTRIBUTE IT TO YOURSELF
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
    this.clientInventory = {}; // List of inventory items, key: serial number, value: locked or not locked
    this.shoppingCartList = {}; // List of shopping carts associated to users key:user, value: shopping cart
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
          if (userData['is_admin'] == 'on') {
            userData['is_admin'] = true;
          } else {
            userData['is_admin'] = false;
          }
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
  }

  removeFromShoppingCart(req, res) {
    let item = req.body.serialNumber;
    this.shoppingCartList[user].removeFromCart(item);
    clearTimeout(this.clientInventory[item].timeout);
  }

  /**
    * Unlocks a previously locked items
    * @param {String} itemToUnlock Serial number of item to unlock
  **/
  unlockItem(itemToUnlock) {
    this.clientInventory[itemToUnlock].locked = false;
    this.clientInventory[itemToUnlock].timeout = null;
  }

  /**
   * Locks an item to a user's shopping cart if it isn't already locked
   * @param {Object} itemToLock serial number of item to lock
   * @return {Boolean} Returns whether or not the item was locked
  */
  lockItem(itemToLock) {
    if (this.clientInventory[itemToLock] == null ||
        this.clientInventory[itemToLock].locked) {
      return false;
    } else {
      this.clientInventory[itemToLock].locked = true;
      // Store pointer of timeout function
      this.clientInventory[itemToLock].timeout = setTimeout(
        this.unlockItem.bind(this), 10000, itemToLock);
      return true;
    }
  }

  /**
   * Submits purchase transaction to database
   * @param {Object} req
   * @param {Object} res
  */
  completePurchaseTransaction(req, res) {
    let user = req.session.user.toString();
    let cart = Object.values(this.shoppingCartList[user].getCart());
    let purchases = [];
    for (let i in Object.keys(cart)) {
      if (cart[i]) {
      console.log(cart[i]);
      purchases.push({client: user,
                            model_number: cart[i].model,
                            serial_number: cart[i].serial,
                            purchase_Id: cart[i].cartItemId});
      }
    }
    this.purchaseCollectionRepo.save(purchases);
  }

  /**
   * Submits cancel transaction and frees locked items, if any
   * @param {Object} req
   * @param {Object} res
  */
  cancelPurchaseTransaction(req, res) {
    let user = req.session.user.toString();
    let cartItems = this.shoppingCartList[user].getCartSerialNumbers();
    for (let item = 0; item < cartItems.length; item++) {
      this.unlockItem(cartItems[item].serial);
      clearTimeout(this.clientInventory[cartItems[item].serial].timeout);
    }
    delete this.shoppingCartList[user];
    res.status(200).send({success: 'Successfully canceled'});
  }

  /**
   * Submits return transaction to database
   * @param {Object} req
   * @param {Object} res list/array of serial numbers of returned items
  */
  returnPurchaseTransaction(req, res) {
    let returnItem = res;

    res.forEach((product, serialNumber) => {

    });

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
    let toSave = [{
      serial_number: ['1'],
      model_number: '1',
      brand_name: 'b',
      price: 1,
      weight: 1,
      id: 1,
      type: 'Desktop',
      processor_type: 'r',
      ram_size: 1,
      number_cpu_cores: 2,
      harddrive_size: 3,
      comp_id: 3,
      dimension: {depth: 1,
         height: 1,
         width: 1,
         dimensions_id: 2,
      },
     }, {
      serial_number: ['2'],
      model_number: '2',
      brand_name: 'changed',
      price: 1,
      weight: 1,
      type: 'Desktop',
      id: 2,
      processor_type: 'q',
      ram_size: 1,
      number_cpu_cores: 2,
      harddrive_size: 3,
      comp_id: 2,
      dimension: {depth: 1,
         height: 1,
         width: 1,
         dimensions_id: 3,
      },
     }, {
      serial_number: ['3', '4'],
      model_number: '3',
      brand_name: 'b',
      price: 1,
      weight: 1,
      type: 'Desktop',
      id: 3,
      processor_type: 'n',
      ram_size: 1,
      number_cpu_cores: 2,
      harddrive_size: 3,
      comp_id: 1,
      dimension: {depth: 1,
         height: 1,
         width: 1,
         dimensions_id: 1,
       },
     }, {
      serial_number: ['7'],
      model_number: '5',
      brand_name: 'b',
      price: 1,
      weight: 1,
      type: 'Monitor',
      id: 3,
      processor_type: 'n',
      ram_size: 1,
      number_cpu_cores: 2,
      harddrive_size: 3,
      comp_id: 1,
      dimension: {depth: 1,
         height: 1,
         width: 1,
         dimensions_id: 1,
       },
     }];
    // let results = this.productDescriptionRepo.save(toSave);
    // this.manageProductCatalog();
    this.manageInventory();


    let prodDesc = this.inventoryRepo.getAllInventoryItems();
    Promise.all([prodDesc])
    .then((values) => {
      let items = JSON.stringify(values[0]);
      // items = JSON.stringify(toSave);
      console.log('Values: ', items);
      if (req.session.exists==true && req.session.isAdmin==true) {
        res.render('inventory', {items: items});
      } else if (req.session.exists==true && req.session.isAdmin==false) {
        this.updateInventoryList(values[0]);
        res.render('clientInventory', {items: items});
      } else {
        res.redirect('/login');
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
  manageInventory() {
    let toSave = [{
      serial_number: ['1'],
      model_number: '1',
     }, {
      serial_number: ['2'],
      model_number: '2',
     }, {
      serial_number: ['3', '34'],
      model_number: '3',
     }, {
      serial_number: ['7'],
      model_number: '5',
     }];
    let results = this.inventoryRepo.save(toSave);
  }
  manageProductCatalog() {
    let toSave = [{
      model_number: '1',
      brand_name: 'b',
      price: 1,
      weight: 1,
      id: 1,
      type: 'Desktop',
      processor_type: 'adding',
      ram_size: 1,
      number_cpu_cores: 2,
      harddrive_size: 3,
      comp_id: 3,
      dimension: {depth: 1,
         height: 1,
         width: 1,
         dimensions_id: 2,
      },
     }, {
      model_number: '2',
      brand_name: 'changed product desc',
      price: 1,
      weight: 1,
      type: 'Desktop',
      id: 2,
      processor_type: 'q',
      ram_size: 1,
      number_cpu_cores: 2,
      harddrive_size: 3,
      comp_id: 2,
      dimension: {depth: 1,
         height: 1,
         width: 1,
         dimensions_id: 3,
      },
     }, {
      model_number: '3',
      brand_name: 'b',
      price: 1,
      weight: 1,
      type: 'Desktop',
      id: 3,
      processor_type: 'n',
      ram_size: 1,
      number_cpu_cores: 2,
      harddrive_size: 3,
      comp_id: 1,
      dimension: {depth: 1,
         height: 1,
         width: 1,
         dimensions_id: 1,
       },
     }, {
      model_number: '5',
      brand_name: 'b',
      price: 1,
      weight: 1,
      type: 'Monitor',
      id: 3,
      processor_type: 'n',
      ram_size: 1,
      number_cpu_cores: 2,
      harddrive_size: 3,
      comp_id: 1,
      dimension: {depth: 1,
         height: 1,
         width: 1,
         dimensions_id: 1,
       },
     }];
    let results = this.productDescriptionRepo.save(toSave);
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

  loginRequestDeprecated(req, res) {
    let data = req.body;
    this.userRepo.authenticate(data).then((result) => {
      if (result.length <= 0) {
        console.log('Invalid username or password.');
        res.render('login', {error: 'Invalid username/password'});
      } else if (result.length > 1) {
        console.log('Duplicate users detected');
        res.render('login', {error: 'Duplicate users detected'});
      } else if (result.length == 1) {
        req.session.exists=true;
        if (result[0].is_admin == 1) {
          // REVIEW: this should probably be removed - Artem
          console.log('You an admin broo');
          req.session.isAdmin=true;
        } else {
          // REVIEW: this should probably be removed - Artem
          console.log('user not admin');
          req.session.isAdmin= false;
          req.session.user = data.email;
        }
        console.log('displaying items');
        req.session.save(function(err) {
            if (err) console.error(err);
            res.redirect('/getAllInventoryItems');
        });
      }
    });
  }
}

module.exports = Controller;
