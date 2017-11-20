const authPages = ['loginRequest', 'inventoryAction', 'logout'];
const rootPath = require('app-root-dir').get();
const meld = require('meld');
const crypto = require('crypto');
const UserRepository = require(rootPath +
  '/DataSource/Repository/UserRepository.js');
let userRepo = new UserRepository();
let activeUsers = [];

/**
 * Aspect that manages authentication
 * @author Wai Lau, Daniel Isakov
 */
class Aspect {
  // constructor() {
  //   this.activeUsers = [];
  //   const that = this;
  // }
  initialize(controller) {
    meld.around(controller, authPages, (joinpoint) => {
      console.log('Caught by aspect, validating the user...');
      let req = joinpoint.args[0];
      let res = joinpoint.args[1];
      let data = {};
      if (!req.session.exists) {
        data = req.body;
        let hash = crypto.createHash('sha256');
        let salted = data.email + data.password + 'salt';
        salted = hash.update(salted).digest('hex');
        data.password = salted;
      } else {
        data = {
          email: req.session.email,
          password: req.session.hash,
        };
        for (let usr of activeUsers) {
          if (usr.getEmail() == req.session.email && usr.isInactive()) {
            console.log('user is innactive');
            usr.timeStamp();
          } else if (usr.getEmail() == req.session.email) {
            console.log('user found');
            usr.timeStamp();
          }
        }
      }
      return userRepo.authenticate(data).then((result) => {
        if (result.length <= 0) {
          console.log('Session rejected by aspect. ' +
            'Reason: Invalid user/pass.');
          req.session.destroy();
          res.redirect('/');
        } else if (result.length > 1) {
          console.log('Session rejected by aspect. ' +
            'Reason: Duplicate database entries detected.');
          req.session.destroy();
          res.redirect('/');
        } else if (result.length == 1) {
          if (!req.session.exists) {
            req.session.exists=true;
            req.session.hash=data.password;
            req.session.email=data.email;
            console.log('checking array');
            console.log(activeUsers);
            console.log('inputing tuple');
            activeUsers.push(new Tuple(data.email, new Date().getTime()));
            console.log('new array');
            console.log(activeUsers);
          }
          if (result[0].is_admin == 1) {
            // REVIEW: this should probably be removed - Artem
            console.log('User is admin.');
            req.session.isAdmin=true;
            req.session.user = data.email;
            return joinpoint.proceed(req, res);
          } else {
            // REVIEW: this should probably be removed - Artem
            console.log('User is not admin.');
            req.session.isAdmin=false;
            req.session.user=data.email;
            return joinpoint.proceed(req, res);
          }
        }
      }).catch((errors) => {
        console.log('Invalid Session.');
        req.session.destroy();
        res.redirect('/');
      });
    });

    meld.before(controller, 'logout', function() {
      const joinpoint = meld.joinpoint();
      const user = joinpoint.args[0].session.email;
      let index = 0;
      // console.log('checking array before logout');
      // console.log(activeUsers);
      // console.log('user to logout: ' + user);
      for (let usr of activeUsers) {
        if (usr.getEmail() == user) {
          console.log('user found');
          activeUsers[index] = null;
        }
        index+=1;
      }
      // console.log('checking new array');
      // console.log(activeUsers);
      // console.log('shrinking array');
      activeUsers = activeUsers.filter(function(val) {
        return val != null;
      });
    });
  }
}

class Tuple {
  constructor(email, lastRequest) {
    this.email = email;
    this.lastRequest = lastRequest;
  }

  getEmail() {
    return this.email;
  }
  timeStamp() {
    this.lastRequest = new Date().getTime();
  }

  isInactive() { // set to 20min
    if (new Date().getTime() > this.lastRequest + 20*60*1000) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Aspect;
