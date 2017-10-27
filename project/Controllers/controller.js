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
      '/DataSource/Repository/InventoryItemRepository.js');
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

 /** // this function will be deleted because it got replaced by getAllInventory
  getAllInventoryItems(req, res, done) {
    // console.log(req.session.exists);

    let laptopItems = this.laptopRepo.get('*');
    let desktopItems = this.desktopRepo.get('*');
    let monitorItems = this.monitorRepo.get('*');
    let tabletItems = this.tabletRepo.get('*');
    let tvItems = this.tvRepo.get('*');

    Promise.all([laptopItems, tvItems, monitorItems, tabletItems, desktopItems])
    .then((values) => {
      let allItems = {
        laptops: values[0],
        tvs: values[1],
        mons: values[2],
        tabs: values[3],
        desks: values[4],
      };
      let items = JSON.stringify(allItems);
      // res.sess
      res.render('inventory', {items: items});
    }).catch((error) => {
      console.log(error);
    });
  } */

  // this funtion is getting all the product description from the database
  getAllInventory(req, res) {
    let inventoryItems = this.inventoryRepo.getAllInventoryItems();
    Promise.all([inventoryItems])
    .then((values) => {
      console.log('printing values');
      console.log(values);
      let items = JSON.stringify(values[0]);
      //res.render('inventory', {items: items});
      res.render('clientInventory', {items: items});
    })
    .catch((err) => {
      console.log(err);
    });
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
