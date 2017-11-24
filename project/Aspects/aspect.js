const rootPath = require('app-root-dir').get();
const meld = require('meld');
const crypto = require('crypto');
const UserRepository = require(rootPath +
  '/DataSource/Repository/UserRepository.js');
const ProcessQueue = require(rootPath +
  '/Aspects/processQueue.js');

/**
 * Aspect that manages authentication
 * @author Wai Lau, Daniel Isakov
 */

const authRequests = [
  'getCatalog',
  'getAllInventory',
  'manageProductCatalog',
  'getProductDescription',
  'registrationRequest',
  'inventoryAction',
  'addToShoppingCart',
  'removeFromShoppingCart',
  'completePurchaseTransaction',
  'cancelPurchaseTransaction',
  'addToReturnCart',
  'returnPurchaseTransaction',
  'viewPurchaseCollection',
  'getProductInfo',
  'getClients',
  'getProductDescription',
  'cancelReturnTransaction',
  'deleteClient',
];

class Aspect {
  constructor() {
     this.userRepo = new UserRepository();
     this.activeUsers = [];
     this.processQueue = new ProcessQueue();
  }

 /** Determines if a caught message should proceed or not 
  * based on user at that time
  * if you do not pass joinpoint:
  * validate session will not let caught function proceed after validation
  * @param {Object} req 
  * @param {Object} res
  * @param {Object} data user information when getting caught by aspect
  * @param {jointpoint} joinpoint
  * @return {function} proceed or not
  */
  validateSession(req, res, data, joinpoint) {
    return this.userRepo.authenticate(data).then((result) => {
      if (result.length <= 0 || result.length > 1) {
        console.log('Terminated by aspect. Invalid user/pass.');
        if (req.session.exists) {
          req.session.destroy();
        }
        if (joinpoint) {
          this.processQueue.anonReq(joinpoint);
        }
      } else {
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
          if (req.session.isAdmin) {
            this.processQueue.adminReq(joinpoint, req, res);
          } else {
            this.processQueue.clientReq(joinpoint, req, res);
          }
        }
      }
    }).catch((errors) => {
      console.log(errors);
      console.log('Terminated by aspect, invalid request.');
      req.session.destroy();
    });
  }

  watch(controller) {
    meld.around(controller, authRequests, (joinpoint) => {
      console.log('Caught by main aspect, validating the user...');
      let req = joinpoint.args[0];
      let res = joinpoint.args[1];
      let data;
      if (req.session.exists) {
        data = {
            email: req.session.email,
            password: req.session.hash,
        };
        this.validateSession(req, res, data, joinpoint);
      } else {
        this.processQueue.anonReq(joinpoint);
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
        this.processQueue.anonReq(joinpoint);
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
          this.processQueue.anonReq(joinpoint);
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
