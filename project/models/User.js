class User {
    constructor(email, name, address, password, isAdmin) {
        this.email = email;
        this.name = name;
        this.address = address;
        this.password = password;
        this.isAdmin = isAdmin;
    }
    getEmail() {
      return this.email;
    }
    getName() {
       return this.name;
    }
    getPassword() {
      return this.password;
    }
    getAddress() {
      return this.address;
    }
    getIsAdmin() {
      return this.isAdmin;
    }

    setEmail(email) {
      this.email = email;
    }
    setName(name) {
      this.name = name;
    }
    setPassword(password) {
      this.password = password;
    }
    setAddress(address) {
      this.address = address;
    }
    setIsAdmin(isAdmin) {
      this.isAdmin = isAdmin;
    }
}

module.exports = User;
