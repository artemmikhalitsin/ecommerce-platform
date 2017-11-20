const rootPath = require('app-root-dir').get();
const meld = require('meld');
const crypto = require('crypto');
const UserRepository = require(rootPath +
  '/DataSource/Repository/UserRepository.js');

/**
 * Aspect that manages authentication
 * @author Wai Lau, Daniel Isakov
 */

const authPages = ['inventoryAction'];

class Aspect {
  constructor() {
     this.userRepo = new UserRepository();
     this.activeUsers = [];
  }

  // if you do not pass joinpoint:
  // validate session will not let caught function proceed after validation
  validateSession(req, res, data, joinpoint) {
    return this.userRepo.authenticate(data).then((result) => {
      if (result.length <= 0) {
        console.log('Terminated by aspect. Invalid user/pass.');
        req.session.destroy();
      } else if (result.length > 1) {
        console.log('Terminated by aspect. Duplicates detected.');
        req.session.destroy();
      } else if (result.length == 1) {
        req.session.exists=true;
        req.session.hash=data.password;
        req.session.email=data.email;
        req.session.isAdmin = result[0].is_admin == 1;
        let userExists = false;
        this.activeUsers.forEach((usr) => {
          if (usr.getEmail() == req.session.email) {
            usr.timeStamp();
            userExists = true;
          }
        });
        if (!userExists) {
          this.activeUsers.push(
            new ActiveUser(data.email, new Date().getTime())
          );
        }
        console.log(this.activeUsers);
        if (joinpoint) {
          return joinpoint.proceed(req, res);
        }
      }
    }).catch((errors) => {
      console.log('Terminated by aspect, invalid request.');
      req.session.destroy();
    });
  }

  monitor(controller) {
    meld.around(controller, authPages, (joinpoint) => {
      console.log('Caught by main aspect, validating the user...');
      let req = joinpoint.args[0];
      let res = joinpoint.args[1];
      if (!req.session.exists) {
        console.log('Terminated by aspect, session does not exist.');
        req.session.destroy();
      } else {
        let data = {
            email: req.session.email,
            password: req.session.hash,
        };
        this.validateSession(req, res, data, joinpoint);
      }
    });

    meld.around(controller, 'loginRequest', (joinpoint) => {
      console.log('Caught by login aspect, validating login credentials...');
      let req = joinpoint.args[0];
      let res = joinpoint.args[1];
      let data = req.body;
      let hash = crypto.createHash('sha256');
      let salted = data.email + data.password + 'salt';
      salted = hash.update(salted).digest('hex');
      data.password = salted;
      this.validateSession(req, res, data, joinpoint);
    });

    meld.around(controller, 'logout', (joinpoint) => {
      let req = joinpoint.args[0];
      let res = joinpoint.args[1];
      if (!req.session.exists) {
        console.log('Caught by logout aspect, user not logged in');
      } else {
        let data = {
            email: req.session.email,
            password: req.session.hash,
        };
        // authenticate session before giving access to active users table
        // i.e. they can only log out of their own account
        this.validateSession(req, res, data).then(() => {
          let user = req.session.email;
          this.activeUsers.forEach((usr, index) => {
            console.log('Deactivating ' + user);
            if (usr.getEmail() == user) {
              this.activeUsers[index] = null;
            }
          });
          this.activeUsers = this.activeUsers.filter((val) => {
              return val != null;
          });
          return joinpoint.proceed(req, res);
        });
      }
    });
  }
}

class ActiveUser {
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
