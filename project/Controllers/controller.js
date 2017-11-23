const Promise = require('bluebird');
const rootPath = require('app-root-dir').get();
const ProductDescriptionRepository = require(rootPath +
  '/DataSource/Repository/ProductDescriptionRepository.js');
const InventoryItemRepository = require(rootPath +
  '/DataSource/Repository/InventoryItemRepository.js');
const UserRepository = require(rootPath +
  '/DataSource/Repository/UserRepository.js');

const User = require(rootPath + '/models/User.js');

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
      .catch((err) => {
        console.log(err);
        console.log('something bad happened while processing the request');
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
    let query = this.url.parse(req.url, true).query;
    let search = query.search;
    let inventory = [];
    let productDescriptions = this.productDescriptionRepo.getAllWithIncludes()
    .then((results)=>{
      // console.log('all the products are: ' + JSON.stringify(results));
       return Promise.each(results, (product)=>{
        return this.inventoryRepo.getByModelNumbers([product.modelNumber])
          .then((values)=>{
                  console.log('inventory item is ' + JSON.stringify(values));
                  product.serialNumbers = values.map((p) => p.serialNumber);
                  inventory.push(product);
                });
      });
    }).then((val)=>{
      // console.log('Values: ', JSON.stringify(inventory));
      if (req.session.exists==true && req.session.isAdmin==true) {
        res.render('inventory',
          {items: JSON.stringify(inventory), search: search});
      } else if (req.session.exists==true && req.session.isAdmin==false) {
        if (purchaseController) {
          purchaseController.getLatestInventory();
        }
        res.render('clientInventory',
          {items: JSON.stringify(inventory), search: search});
      } else {
        res.render('clientInventory',
          {items: JSON.stringify(inventory), search: search});
      }
    }).catch((err) => {
      console.log(err);
    });
    console.log(productDescriptions);
  }

  manageInventory(inventoryItems) {
    this.inventoryRepo.save(inventoryItems);
  }

  getProductDescription(req, res) {
    let query = this.url.parse(req.url, true).query;
    let search = query.search;
    // let catalog = [];
    let productDescriptions = this.productDescriptionRepo.getAllWithIncludes()
    .then((results)=>{
      // console.log('Product Descriptions: ', JSON.stringify(results));
      // res.render('catalog', {items: JSON.stringify(results), search: search});
      if (req.session.exists==true && req.session.isAdmin==true) {
        return res.send({items: results, search: search});
      }
    }).catch((err) => {
      console.log(err);
    });
    console.log(productDescriptions);
  }
  getCatalog(req, res) {
    let query = this.url.parse(req.url, true).query;
    let search = query.search;
    // let catalog = [];
    let productDescriptions = this.productDescriptionRepo.getAllWithIncludes()
    .then((results)=>{
        // res.render('catalog',
        // {items: JSON.stringify(results), search: search});
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
    console.log(productDescriptions);
  }
  manageProductCatalog(req, res) {
    let productDescriptions = JSON.parse(req.body.productDescriptions);
    console.log('Descriptions recieved by the controller'
      + (req.body.productDescriptions));
    let results = this.productDescriptionRepo.save(productDescriptions)
      .then((results) => {
      console.log('Success saving the Product descriptions!');
      this.getProductDescription(req, res);
    });
    console.log(results);
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
      let addSerials = JSON.parse(req.body.addSerials);
      let deleteSerials = JSON.parse(req.body.deleteSerials);
      let allItems = addSerials.concat(deleteSerials);
      // this.inventoryRepo.save(allItems);
      res.status(200).send({success: 'Actions complete'});
    }
    /*
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
    */
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
