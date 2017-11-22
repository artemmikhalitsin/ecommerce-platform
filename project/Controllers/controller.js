const Promise = require('bluebird');
const rootPath = require('app-root-dir').get();
const InventoryItem = require(rootPath +
  '/models/InventoryItem.js');
const ProductDescriptionRepository = require(rootPath +
  '/DataSource/Repository/ProductDescriptionRepository.js');
const InventoryItemRepository = require(rootPath +
  '/DataSource/Repository/InventoryItemRepository.js');
const UserRepository = require(rootPath +
  '/DataSource/Repository/UserRepository.js');
const url = require('url');
const crypto = require('crypto');

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
    let hash = crypto.createHash('sha256');
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
   * Retrieves a complete list of products and serial numbers from
   * the database
   * @param {Object} req HTTP Request object containing query info
   * @param {Object} res HTTP Response object to be send back to the user
   */

  getAllInventory(req, res, purchaseController) {
    let query = url.parse(req.url, true).query;
    let search = query.search;
    let inventory = [];
    // Get all items from the product description repo
    this.productDescriptionRepo
    .getAll()
    .then(
      (results) => {
        console.log('all the products are: ' + JSON.stringify(results));
        return Promise.each(results,
          (product) => {
            return this.inventoryRepo
            .getByModelNumbers([product.getModelNumber()])
            .then(
              (values)=>{
                    console.log('inventory item is ' + JSON.stringify(values));
                    product.serial_numbers = values.map((p) => p.serialNumber);
                    inventory.push(product);
                });
              });
      }).then((val)=>{
        console.log('Values: ', JSON.stringify(inventory));
      if (req.session.exists==true && req.session.isAdmin==true) {
        res.render('inventory', {items: JSON.stringify(inventory), search: search});
      } else if (req.session.exists==true && req.session.isAdmin==false) {
        if (purchaseController) {
          purchaseController.updateInventoryList(inventory);
        }
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
  getProductDescription(req, res) {
    let query = url.parse(req.url, true).query;
    let search = query.search;
    let catalog = [];
    let productDescriptions = this.productDescriptionRepo.getAll()
    .then((results)=>{
        console.log('Product Descriptions: ', JSON.stringify(results));
        // res.render('catalog', {items: JSON.stringify(results), search: search});
      if (req.session.exists==true && req.session.isAdmin==true) {
        return res.send({items: results, search: search});
      }
      }).catch((err) => {
      console.log(err);
    });
  }
  getCatalog(req, res) {
    let query = url.parse(req.url, true).query;
    let search = query.search;
    let catalog = [];
    let productDescriptions = this.productDescriptionRepo.getAll()
    .then((results)=>{
        // res.render('catalog', {items: JSON.stringify(results), search: search});
      if (req.session.exists==true && req.session.isAdmin==true) {
        res.render('catalog', {items: JSON.stringify(results), search: search});
      } else if (req.session.exists==true && req.session.isAdmin==false) {
        res.redirect('/login');
      } else {
        res.redirect('/login');
      }
      }).catch((err) => {
      console.log(err);
    });
  }
  manageProductCatalog(req, res) {
    let productDescriptions = JSON.parse(req.body.productDescriptions);
    console.log('Descriptions recieved by the controller' + (req.body.productDescriptions));
    let results = this.productDescriptionRepo.save(productDescriptions).then((results) => {
      console.log('Success saving the Product descriptions!');
      this.getProductDescription(req, res);
    });
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


  getProductInfo(req, res) {
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
