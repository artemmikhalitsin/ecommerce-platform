'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Promise = require('bluebird');
var rootPath = require('app-root-dir').get();
var ProductDescriptionRepository = require(rootPath + '/DataSource/Repository/ProductDescriptionRepository.js');
var InventoryItemRepository = require(rootPath + '/DataSource/Repository/InventoryItemRepository.js');
var UserRepository = require(rootPath + '/DataSource/Repository/UserRepository.js');
var PurchaseCollectionRepo = require(rootPath + '/DataSource/Repository/PurchaseCollectionRepository.js');
var ShoppingCart = require(rootPath + '/models/ShoppingCart.js');
var InventoryItem = require(rootPath + '/models/InventoryItem.js');

/**
 * Identity map of inventory items
 * @author Wai Lau, Amanda Wai
 * REVIEW: Please make sure the comments are correct - Artem
 */

var Controller = function () {
  /**
   * Constructor creates a new instanted of a user item and product repos
   */
  function Controller() {
    _classCallCheck(this, Controller);

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
   * Validates the registration request sent by the user
   * @author Ajmer
   * NOTE: Still in progress
   */


  _createClass(Controller, [{
    key: 'validateRegistrationRequest',
    value: function validateRegistrationRequest(userData) {
      var errors = [];
      var errorMessage = void 0;
      Object.keys(userData).forEach(function (element) {
        if (userData[element] == "") {
          errorMessage = "The " + element + " cannot be empty!";
          errors.push(errorMessage);
        }
      });

      if (errors.length == 0) {
        console.log("there are no errors");
        var phone = userData['phone_number'];
        var email = userData['email'];
        var password = userData['password'];
        var confirmPassword = userData['confirmPassword'];

        // validating the phone number
        // phone number regex \b\d{3}[-. ]?\d{3}[-. ]?\d{4}\b
        if (!isNaN(phone)) {
          console.log("is a number");
          if (phone.length < 10 || phone.length > 10) {
            console.log("less/more then 10 digits");
            errors.push("The phone number should have exactly 10 digits");
          }
        } else {
          errors.push("The phone number can only contain digits");
          console.log("not a number");
        }

        // checking email (BAD)
        if (email.includes("@")) {
          console.log("email contains @ sign");
        } else {
          console.log("invalid email");
        }

        // Checking password
        if (password.length < 6 || password.length > 20) {
          console.log("Password is not between 6 and 20 characters");
        } else {
          if (password === confirmPassword) {
            console.log("password matches");
          } else {
            console.log("password dont match");
          }
        }
      } else {
        console.log("there was at least one error. they are as follows");
        console.log(errors);
      }
    }

    /**
     * Processes a registration registrationRequest
     * @param {Object} req Incoming HTTP request containing registration info
     * @param {Object} res HTTP Response object to be sent back to user
     */

  }, {
    key: 'registrationRequest',
    value: function registrationRequest(req, res) {
      var userData = req.body;
      this.validateRegistrationRequest(userData);

      /*
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
        */
    }

    /**
     * Updates the Controller's list of current items
     * @param {Object} newInventory Inventory items
    */

  }, {
    key: 'updateInventoryList',
    value: function updateInventoryList(newInventory) {
      var _this = this;

      newInventory.forEach(function (product, index) {
        product.serial_numbers.forEach(function (serialNumber, index) {
          if (!_this.clientInventory[serialNumber]) {
            _this.clientInventory[serialNumber] = {
              locked: false,
              timeout: null };
          }
        });
      });
    }

    /**
      *@param {String} req user who added an item to their cart
      *@param {String} res item user wants to add to their cart
    */

  }, {
    key: 'addToShoppingCart',
    value: function addToShoppingCart(req, res) {
      var _this2 = this;

      var _checkPostcondition = function _checkPostcondition(it) {
        if (!_this2.shoppingCartList[req.session.user.toString()].getCartSerialNumbers().includes(req.body.serialNumber)) {
          throw new Error('Item was not added to the cart');
        }

        if (!_this2.clientInventory[req.body.serialNumber].locked) {
          throw new Error('Item isn\'t locked');
        }

        return it;
      };

      if (!(req.session.user != null)) {
        throw new Error('User is not logged in');
      }

      if (!(Object.keys(this.clientInventory).length != 0)) {
        throw new Error('Catalog is empty');
      }

      if (!!this.clientInventory[req.body.serialNumber].locked) {
        throw new Error('Item is locked');
      }

      if (this.shoppingCartList[req.session.user.toString()]) {
        if (!(Object.keys(this.shoppingCartList[req.session.user.toString()].getCart()).length < 7)) {
          throw new Error('Cart has more than 7 items!');
        }
      }


      var item = req.body.serialNumber;
      var productNumber = req.body.modelNumber;
      if (this.lockItem(item)) {
        var _user = req.session.user.toString();
        if (!this.shoppingCartList[_user]) {
          this.shoppingCartList[_user] = new ShoppingCart();
        }
        this.shoppingCartList[_user].addToCart(item, productNumber);
        res.status(200).send({ success: 'successfully added' });
      } else {
        res.status(500).send({ error: 'item already in another cart' });
      }

      _checkPostcondition();
    }
  }, {
    key: 'removeFromShoppingCart',
    value: function removeFromShoppingCart(req, res) {
      var _this3 = this;

      var _checkPostcondition2 = function _checkPostcondition2(it) {
        if (!!_this3.shoppingCartList[req.session.user.toString()].getCartSerialNumbers().includes(req.body.serialNumber)) {
          throw new Error('Item was not removed from the cart');
        }

        if (!!_this3.clientInventory[req.body.serialNumber].locked) {
          throw new Error('Item is still locked');
        }

        return it;
      };

      if (!(req.session.user != null)) {
        throw new Error('User is not logged in');
      }

      if (!(this.shoppingCartList[req.session.user.toString()] != null)) {
        throw new Error('Shopping cart doesn\'t exists');
      }

      var item = req.body.serialNumber;
      this.shoppingCartList[user].removeFromCart(item);
      clearTimeout(this.clientInventory[item].timeout);

      _checkPostcondition2();
    }

    /**
      * Unlocks a previously locked items
      * @param {String} itemToUnlock Serial number of item to unlock
    **/

  }, {
    key: 'unlockItem',
    value: function unlockItem(itemToUnlock) {
      var _this4 = this;

      var _checkPostcondition3 = function _checkPostcondition3(it) {
        if (!!_this4.clientInventory[itemToUnlock].locked) {
          throw new Error('Item is still locked');
        }

        return it;
      };

      if (!this.clientInventory[itemToUnlock].locked) {
        throw new Error('Item isn\'t locked');
      }

      this.clientInventory[itemToUnlock].locked = false;
      this.clientInventory[itemToUnlock].timeout = null;

      _checkPostcondition3();
    }

    /**
     * Locks an item to a user's shopping cart if it isn't already locked
     * @param {Object} itemToLock serial number of item to lock
     * @return {Boolean} Returns whether or not the item was locked
    */

  }, {
    key: 'lockItem',
    value: function lockItem(itemToLock) {
      var _this5 = this;

      var _checkPostcondition4 = function _checkPostcondition4(it) {
        if (!(_this5.clientInventory[itemToLock].locked === true)) {
          throw new Error('Item was not successfully locked');
        }

        return it;
      };

      if (!(this.clientInventory[itemToLock] != null)) {
        throw new Error('Inventory item doesn\'t exists!');
      }

      if (this.clientInventory[itemToLock] == null || this.clientInventory[itemToLock].locked) {
        return _checkPostcondition4(false);
      } else {
        this.clientInventory[itemToLock].locked = true;
        // Store pointer of timeout function
        this.clientInventory[itemToLock].timeout = setTimeout(this.unlockItem.bind(this), 100000, itemToLock);
        return _checkPostcondition4(true);
      }

      _checkPostcondition4();
    }

    /**
    * Deletes the user's shopping cart
    * @param {String} user This user will have their shopping cart removed
    */

  }, {
    key: 'deleteShoppingCart',
    value: function deleteShoppingCart(user) {
      delete this.shoppingCartList[user];
    }

    /**
     * Submits purchase transaction to database
     * @param {Object} req
     * @param {Object} res
    */

  }, {
    key: 'completePurchaseTransaction',
    value: function completePurchaseTransaction(req, res) {
      var _this6 = this;

      var _checkPostcondition5 = function _checkPostcondition5(it) {
        if (!(_this6.shoppingCartList[req.session.user.toString()] == null)) {
          throw new Error('Shopping cart still exists');
        }

        return it;
      };

      if (!(Object.keys(this.shoppingCartList[req.session.user.toString()].getCart()).length <= 7)) {
        throw new Error('Cart size too big');
      }

      var user = req.session.user.toString();
      var cart = Object.values(this.shoppingCartList[user].getCart());
      var purchases = [];
      for (var i in Object.keys(cart)) {
        if (cart[i]) {
          clearTimeout(this.clientInventory[cart[i].serial].timeout);
          purchases.push({ client: user,
            model_number: cart[i].model,
            serial_number: cart[i].serial,
            purchase_Id: cart[i].cartItemId });

          delete this.clientInventory[cart[i].serial];
        }
      }
      this.purchaseCollectionRepo.save(purchases);
      this.deleteShoppingCart(user);
      console.log('purchase completed successfully');
      res.status(200).send({ success: 'Successful purchase' });

      _checkPostcondition5();
    }

    /**
     * Submits cancel transaction and frees locked items, if any
     * @param {Object} req
     * @param {Object} res
    */

  }, {
    key: 'cancelPurchaseTransaction',
    value: function cancelPurchaseTransaction(req, res) {
      var _this7 = this;

      var _checkPostcondition6 = function _checkPostcondition6(it) {
        if (!(_this7.shoppingCartList[req.session.user.toString()] == null)) {
          throw new Error('Function  postcondition failed: this.shoppingCartList[req.session.user.toString()] == null');
        }

        return it;
      };

      if (!(this.shoppingCartList[req.session.user.toString()] != null)) {
        throw new Error('Function  precondition failed: this.shoppingCartList[req.session.user.toString()] != null');
      }

      var user = req.session.user.toString();
      var cartItems = this.shoppingCartList[user].getCartSerialNumbers();
      for (var item = 0; item < cartItems.length; item++) {
        console.log(cartItems[item]);
        this.unlockItem(cartItems[item]);
        clearTimeout(this.clientInventory[cartItems[item]].timeout);
      }
      delete this.shoppingCartList[user];
      res.status(200).send({ success: 'Successfully canceled' });

      _checkPostcondition6();
    }

    /**
     * Submits return transaction to database
     * @param {Object} req
     * @param {Object} res list/array of serial numbers of returned items
    */

  }, {
    key: 'returnPurchaseTransaction',
    value: function returnPurchaseTransaction(req, res) {
      var returnItem = res;

      /* res.forEach((product, serialNumber) => {
        });*/

      this.purchaseCollectionRepo.returnItems(returnItem);
    }
  }, {
    key: 'viewPurchaseCollection',
    value: function viewPurchaseCollection(req, res) {
      var cart = this.purchaseCollectionRepo.get('*');
      Promise.all([cart]).then(function (values) {
        var items = JSON.stringify(values[0]);
        console.log(items);
      }).catch(function (err) {
        console.log(err);
      });
    }

    /**
     * Retrieves a complete list of products and serial numbers from
     * the database
     * @param {Object} req HTTP Request object containing query info
     * @param {Object} res HTTP Response object to be send back to the user
     */

  }, {
    key: 'getAllInventory',
    value: function getAllInventory(req, res) {
      var _this8 = this;

      var query = this.url.parse(req.url, true).query;
      var search = query.search;
      var inventory = [];
      var productDescriptions = this.productDescriptionRepo.getAllWithIncludes().then(function (results) {
        console.log("all the products are: " + JSON.stringify(results));
        return Promise.each(results, function (product) {
          return _this8.inventoryRepo.getByModelNumbers([product.modelNumber]).then(function (values) {
            console.log("inventory item is " + JSON.stringify(values));
            product.serial_numbers = values.map(function (p) {
              return p.serialNumber;
            });
            inventory.push(product);
          });
        });
      }).then(function (val) {
        console.log('Values: ', JSON.stringify(inventory));
        if (req.session.exists == true && req.session.isAdmin == true) {
          res.render('inventory', { items: JSON.stringify(inventory), search: search });
        } else if (req.session.exists == true && req.session.isAdmin == false) {
          _this8.updateInventoryList(inventory);
          res.render('clientInventory', { items: JSON.stringify(inventory), search: search });
        } else {
          res.render('clientInventory', { items: JSON.stringify(inventory), search: search });
        }
      }).catch(function (err) {
        console.log(err);
      });
    }

    /*
    manageInventory() {
      let results = this.inventoryRepo.save(toSave);
    }
    manageProductCatalog() {
      let results = this.productDescriptionRepo.save(toSave);
    }
    */

  }, {
    key: 'logout',
    value: function logout(req, res) {
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

  }, {
    key: 'inventoryAction',
    value: function inventoryAction(req, res) {
      if (req.session.exists == true && req.session.isAdmin == true) {
        var request = req.body;
        console.log(request.actions);
        var actions = JSON.parse(request.actions);
        for (var key in actions) {
          if (key == 'deleteSerials') {
            console.log('To be deleted: ');
            for (var i = 0; i < actions[key].length; i++) {
              var serialsToDelete = actions[key][i];
              if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+/.test(serialsToDelete)) {
                var serial = serialsToDelete.split('@')[0];
                var model = serialsToDelete.split('@')[1];
                console.log(i + ': ' + serial + ': ' + model);
              }
            }
          }
          if (key == 'addSerials') {
            console.log('To be added: ');
            for (var _i = 0; _i < actions[key].length; _i++) {
              var serialsToAdd = actions[key][_i];
              if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+/.test(serialsToAdd)) {
                var _serial = serialsToAdd.split('@')[0];
                var _model = serialsToAdd.split('@')[1];
                console.log(_i + ': ' + _serial + ': ' + _model);
                // Insert actual add function later
                if (_serial === 'break') {
                  res.status(500).send({ error: 'Something bad happened' });
                }
              }
            }
          }
        }
        res.status(200).send({ success: 'Something gud happened' });
      } else {
        console.log('Not admin, fool!');
      }
    }

    /**
     * Processes a login request
     * @param {Object} req HTTP request containing login info
     * @param {Object} res HTTP response to be returned to the user
     */

  }, {
    key: 'loginRequest',
    value: function loginRequest(req, res) {
      if (req.session.exists) {
        res.redirect('/getAllInventoryItems');
      } else {
        res.render('login', { error: 'Invalid username/password' });
      }
    }
  }]);

  return Controller;
}();

module.exports = Controller;