const rootPath = require('app-root-dir').get();

class Controller {
  constructor() {}
  processRegistration(req, res) {
    let userData = req.body;
    let password = userData['password'];
    let confirmPassword = userData['confirmPassword'];

    if (password != confirmPassword) {
      console.log('password confirmation failed. try again...');
      res.redirect('/registration');
    } else {
      delete userData['confirmPassword'];
      let email = userData['email'];
      const userRepo = require(rootPath +
        '/DataSource/Repository/UserRepository.js');
      userRepo.verifyEmail(email).then( (result) => {
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
  getAllInventoryItems(req, res){
    const desktopRepo = require( rootPath +
      '/DataSource/Repository/DesktopRepository.js');
    const laptopRepo = require( rootPath +
      '/DataSource/Repository/LaptopRepository.js');
    const monitorRepo = require( rootPath +
      '/DataSource/Repository/MonitorRepository.js');
    const tabletRepo = require( rootPath +
      '/DataSource/Repository/TabletRepository.js');
    const tvRepo = require( rootPath +
      '/DataSource/Repository/TVRepository.js');
    let laptopItems = laptopRepo.get('*');
    let desktopItems = desktopRepo.get('*');
    let monitorItems = monitorRepo.get('*');
    let tabletItems = tabletRepo.get('*');
    let tvItems = tvRepo.get('*');
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
}

module.exports = Controller;
