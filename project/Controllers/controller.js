const rootPath = require('app-root-dir').get();
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
  * Constructor gets references to Repositories
  */
  constructor() {
    this.userRepo = UserRepository.instance();
    this.inventoryRepo = InventoryItemRepository.instance();
    this.productDescriptionRepo = ProductDescriptionRepository.instance();
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
      this.userRepo.verifyEmail(email).then((result) => {
        console.log(result);
        if (result.length == 0) {
          console.log('adding new user');
          userData['isAdmin'] = false;
          console.log(userData);
          this.userRepo.save(userData).then((result) => {
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
      .catch((err) => {
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
    let products = [];
    let inventoryItems = [];
    // Get all items from the product description repo
    this.productDescriptionRepo.getAll()
    .then(
      (result) => {
        // Store the result for future use
        products = result;
        // Get a list of the model numbers
        let modelNumbers = products.map(
          (product) => {
            return product.modelNumber;
          });
        // Retrieve the associated inventory items (async)
        return this.inventoryRepo.getByModelNumbers(modelNumbers);
      })
      .then(
        (result) => {
          // Store the inventory items for future use
          inventoryItems = result;
          return inventoryItems;
        }
      ).then(
        () => {
          /* Now, combine products and inventory items and output everything
          in a front-end friendly format */
          inventory = products.map(
            // for each product, find it's inventory items, and produce a
            // front-end friendly object containing all the info
            (product) => {
              // Get the serial numbers which correspond to this product
              let productItems = inventoryItems.filter(
                (item) => {
                  return item.modelNumber === product.modelNumber;
                }
              );
              let productSerials = productItems.map(
                (item) => {
                  return item.serialNumber;
                }
              );
              // Produce a front-end friendly object
              let result = product.frontendFriendlify();
              result.serialNumbers = productSerials;
              // Add the product to the array
              return result;
            });
            // Pass the list of front-end friendly objects to next step
            return inventory;
        }
      )
      .then(
        (inventory) => {
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
      })
      .catch((err) => {
          console.log(err);
      });
  }

  manageInventory(inventoryItems) {
    this.inventoryRepo.save(inventoryItems);
  }

  getProductDescription(req, res) {
    let query = url.parse(req.url, true).query;
    let search = query.search;
    this.productDescriptionRepo.getAll()
    .then((results)=>{
      // Map to frontend friendly objects
      results = results.map(
        (product) => {
          return product.frontendFriendlify();
        }
      );
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
      if (req.session.exists && req.session.isAdmin) {
        res.render('catalog', {search: search});
      } else {
        res.redirect('/login');
      }
  }

  manageProductCatalog(req, res) {
    let productDescriptions = JSON.parse(req.body.productDescriptions);
    this.productDescriptionRepo.save(productDescriptions).then((results) => {
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
    req.session.destroy();
    res.redirect('/');
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
      res.render('login');
    }
  }


  getProductInfo(req, res) {
    let inventory = [];
    this.productDescriptionRepo.getAllWithIncludes()
    .then((results)=>{
      return Promise.each(results, (product)=>{
        return this.inventoryRepo.getByModelNumbers([product.modelNumber])
        .then((values)=>{
          // console.log('inventory item is ' + JSON.stringify(values));
          product.serialNumbers = values.map((p) => p.serialNumber);
          inventory.push(product);
        });
      });
    }).then((val)=>{
      console.log('Values: ', JSON.stringify(inventory));
      res.json(inventory);
    }).catch((err) => {
      console.log(err);
    });
  }

  getClients(req, res) {
    this.userRepo.getAdmins().then((result) => {
      res.json(result);
    });
  }
}

module.exports = Controller;
