const rootPath = require('app-root-dir').get();
const ProductDescriptionRepository = require(rootPath +
  '/DataSource/Repository/ProductDescriptionRepository.js');
const InventoryItemRepository = require(rootPath +
  '/DataSource/Repository/InventoryItemRepository.js');
const UserRepository = require(rootPath +
  '/DataSource/Repository/UserRepository.js');

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
   * Retrieves a complete list of products and serial numbers from
   * the database
   * @param {Object} req HTTP Request object containing query info
   * @param {Object} res HTTP Response object to be send back to the user
   */
  getAllInventory(req, res) {
    // let toSave = [{
    //   serial_number: ['1'],
    //   model_number: '1',
    //   brand_name: "b",
    //   price: 1,
    //   weight: 1,
    //   id: 1,
    //   type: 'Desktop',
    //   processor_type: 'r',
    //   ram_size: 1,
    //   number_cpu_cores: 2,
    //   harddrive_size: 3,
    //   comp_id: 3,
    //   dimension: {depth: 1,
    //      height: 1,
    //      width: 1,
    //      dimensions_id: 2
    //   }
    //  },{
    //   serial_number: ['2'],
    //   model_number: '2',
    //   brand_name: "changed",
    //   price: 1,
    //   weight: 1,
    //   type: 'Desktop',
    //   id: 2,
    //   processor_type: 'q',
    //   ram_size: 1,
    //   number_cpu_cores: 2,
    //   harddrive_size: 3,
    //   comp_id: 2,
    //   dimension: {depth: 1,
    //      height: 1,
    //      width: 1,
    //      dimensions_id:3
    //   }
    //  },{
    //   serial_number: ['3', '4'],
    //   model_number: '3',
    //   brand_name: "b",
    //   price: 1,
    //   weight: 1,
    //   type: 'Desktop',
    //   id: 3,
    //   processor_type: 'n',
    //   ram_size: 1,
    //   number_cpu_cores: 2,
    //   harddrive_size: 3,
    //   comp_id: 1,
    //   dimension: {depth: 1,
    //      height: 1,
    //      width: 1,
    //      dimensions_id:1
    //    }
    //  },{
    //   serial_number: ['7'],
    //   model_number: '5',
    //   brand_name: "b",
    //   price: 1,
    //   weight: 1,
    //   type: 'Monitor',
    //   id: 3,
    //   processor_type: 'n',
    //   ram_size: 1,
    //   number_cpu_cores: 2,
    //   harddrive_size: 3,
    //   comp_id: 1,
    //   dimension: {depth: 1,
    //      height: 1,
    //      width: 1,
    //      dimensions_id:1
    //    }
    //  }];
    // let results = this.productDescriptionRepo.save(toSave);
    let prodDesc = this.inventoryRepo.getAllInventoryItems();
    Promise.all([prodDesc])
    .then((values) => {
      let items = JSON.stringify(values[0]);
      // items = JSON.stringify(toSave);
      if (req.session.exists==true && req.session.isAdmin==true) {
        res.render('inventory', {items: items});
      } else if (req.session.exists==true && req.session.isAdmin==false) {
        res.render('clientInventory', {items: items});
      } else {
        res.redirect('/login');
      }
    })
    .catch((err) => {
      console.log(err);
    });
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
    //
  }

  /**
   * Processes a login request
   * @param {Object} req HTTP request containing login info
   * @param {Object} res HTTP response to be returned to the user
   */
  loginRequest(req, res) {
    let data = req.body;
    console.log(data);
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
          req.session.isAdmin=false;
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
