class Controller {
  constructor() {
    this.rootPath = require('app-root-dir').get();
    this.desktopRepo = require( this.rootPath +
      '/DataSource/Repository/DesktopRepository.js');
    this.laptopRepo = require( this.rootPath +
      '/DataSource/Repository/LaptopRepository.js');
    this.monitorRepo = require( this.rootPath +
      '/DataSource/Repository/MonitorRepository.js');
    this.tabletRepo = require( this.rootPath +
      '/DataSource/Repository/TabletRepository.js');
    this.userRepo = require(this.rootPath +
      '/DataSource/Repository/UserRepository.js');
    this.inventoryRepo = require(this.rootPath +
      '/DataSource/Repository/inventoryItemRepository.js');
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
    let inventoryItems = this.inventoryRepo.getAllInventoryItems();
    Promise.all([inventoryItems])
    .then((values) => {
      /*
      console.log('printing values');
      console.log(values);
      */
      let items = JSON.stringify(values[0]);
      res.render('inventory', {items: items});
      // res.render('clientInventory', {items: items});
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
          for (let i = 0; i < actions[key].length; i++) {
            let serial = actions[key][i].split('@')[0];
            let model = actions[key][i].split('@')[1];
            console.log(i + ': ' + serial + ': ' + model);
          }
        }
      }
      res.redirect('/getAllInventoryItems');
    } else {
      console.log('Not admin, fool!');
    }
  }

  // this functon is adding a new user to the database
  loginRequest(req, res) {
    let data = req.body;
    console.log(data);
    this.userRepo.authenticate(data).then((result) => {
      if (result.length <= 0) {
        console.log('Invalid username or password.');
        res.redirect('/login');
      } else if (result.length > 1) {
        console.log('Duplicate users detected');
        res.redirect('/login');
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
