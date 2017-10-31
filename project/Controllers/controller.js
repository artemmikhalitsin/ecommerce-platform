
let rootPath = require('app-root-dir').get();
let ProductDescriptionRepository = require(rootPath +
  '/DataSource/Repository/ProductDescriptionRepository.js');
let InventoryItemRepository = require(rootPath +
  '/DataSource/Repository/InventoryItemRepository.js');
let UserRepository = require(rootPath +
  '/DataSource/Repository/UserRepository.js');
class Controller {
  constructor() {
    this.userRepo = new UserRepository();
    this.inventoryRepo = new InventoryItemRepository();
    this.productDescriptionRepo = new ProductDescriptionRepository();
  }

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

  // this funtion is getting all the product description from the database
  getAllInventory(req, res) {
    let toSave = [{
      serial_number: ['133'],
      model_number: '133',
      brand_name: "b",
      price: 1,
      weight: 1,
      type: 'Desktop',
      processor_type: 'r',
      ram_size: 1,
      number_cpu_cores: 2,
      harddrive_size: 3,
      dimension: {depth: 1,
         height: 1,
         width: 1,
         dimensions_id: 2
      }
     },{
      serial_number: ['26'],
      model_number: '26',
      brand_name: "changed",
      price: 1,
      weight: 1,
      type: 'Desktop',
      processor_type: 'q',
      ram_size: 1,
      number_cpu_cores: 2,
      harddrive_size: 3,
      dimension: {depth: 1,
         height: 1,
         width: 1,
         dimensions_id:3
      }
     },{
      serial_number: ['12', '14'],
      model_number: '62',
      brand_name: "b",
      price: 1,
      weight: 1,
      type: 'Desktop',
      processor_type: 'n',
      ram_size: 1,
      number_cpu_cores: 2,
      harddrive_size: 3,
      dimension: {depth: 1,
         height: 1,
         width: 1,
         dimensions_id:1
       }
     }];
    let results = this.productDescriptionRepo.save(toSave);
    let prodDesc = this.productDescriptionRepo.getAll();
    Promise.all([prodDesc])
    .then((values) => {
      let items = JSON.stringify(values[0]);
      items = JSON.stringify(toSave);
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

  // this functon is adding a new user to the database
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
          console.log('You an admin broo');
          req.session.isAdmin=true;
        } else {
          console.log('user not admin');
          req.session.isAdmin=false;
        }
        // console.log(req.session.exists);
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
