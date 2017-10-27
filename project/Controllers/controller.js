
let rootPath = require('app-root-dir').get();
let ProductDescriptionRepository = require(rootPath +
  '/DataSource/Repository/ProductDescriptionRepository.js');
class Controller {
  constructor() {
    this.desktopRepo = require( rootPath +
      '/DataSource/Repository/DesktopRepository.js');
    this.laptopRepo = require( rootPath +
      '/DataSource/Repository/LaptopRepository.js');
    this.monitorRepo = require( rootPath +
      '/DataSource/Repository/MonitorRepository.js');
    this.tabletRepo = require( rootPath +
      '/DataSource/Repository/TabletRepository.js');
    this.userRepo = require(rootPath +
      '/DataSource/Repository/UserRepository.js');
    this.inventoryRepo = require(rootPath +
      '/DataSource/Repository/InventoryItemRepository.js');
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
      serial_number: '22',
      model_number: '22',
      brand_name: "b",
      price: 1,
      weight: 1,
      type: 'Desktop',
      processor_type: 'r',
      ram_size: 1,
      number_cpu_cores: 2,
      harddrive_size: 3,
      dimensions: {depth: 1,
         height: 1,
         width: 1}
     },{
      serial_number: '1234',
      model_number: '61',
      brand_name: "changed",
      price: 1,
      weight: 1,
      type: 'Desktop',
      processor_type: 'q',
      ram_size: 1,
      number_cpu_cores: 2,
      harddrive_size: 3,
      dimensions: {depth: 1,
         height: 1,
         width: 1}
     },{
      serial_number: '12',
      model_number: '62',
      brand_name: "b",
      price: 1,
      weight: 1,
      type: 'Desktop',
      processor_type: 'n',
      ram_size: 1,
      number_cpu_cores: 2,
      harddrive_size: 3,
      dimensions: {depth: 1,
         height: 1,
         width: 1}
     }];
    let results = this.productDescriptionRepo.save(toSave);
    let prodDesc = this.productDescriptionRepo.getAll();
    let inventoryItems = this.inventoryRepo.getAllInventoryItems();
    Promise.all([inventoryItems])
    .then((values) => {
      /*
      console.log('printing values');
      console.log(values);
      */
      let items = JSON.stringify(values[0]);
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
