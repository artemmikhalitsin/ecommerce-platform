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

module.exports = ActiveUser;
