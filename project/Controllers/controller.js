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
    this.tvRepo = require( this.rootPath +
      '/DataSource/Repository/TVRepository.js');
    this.userRepo = require(this.rootPath +
      '/DataSource/Repository/UserRepository.js');
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
          userRepo.save(userData).then( (result) => {
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
        console.log('something bad happened');
      });
    }
  }

  getAllInventoryItems(req, res) {
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
      res.render('inventory2', {items: items});
    }).catch((error) => {
      console.log(error);
    });
  }

  loginRequest(req, res) {
    let data = req.body;
    console.log(data);
    const userRepo = require(this.rootPath +
      '/DataSource/Repository/UserRepository.js');
    userRepo.authenticate(data).then((result) => {
      console.log('type of '+ result + ' is ' + typeof(result));
      if (result.length <= 0) {
        console.log('Invalid username or password.');
        res.redirect('/login');
      } else if (result.length > 1) {
        console.log('Duplicate users detected');
        res.redirect('/login');
      } else if (result.length == 1) {
        console.log('displaying items');
        res.redirect('/getAllInventoryItems');
      }
    });
  }
}

module.exports = Controller;
