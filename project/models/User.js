/**
 * Class representing a User
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS PLEASE
 * ATTRIBUTE THIS TO YOURSELF
 */
class User {
    /**
     * Given a user's info, creates a new user object
     * @param {string} email email of the user
     * @param {string} name user's full name
     * @param {string} address user's address
     * @param {string} password user's password
     * @param {boolean} isAdmin whether the user is an admin
     */
    constructor(email, name, address, password, isAdmin) {
        this.email = email;
        this.name = name;
        this.address = address;
        this.password = password;
        this.isAdmin = isAdmin;
    }
    /**
     * email accessor
     * @return {string} the user's email
     */
    getEmail() {
      return this.email;
    }
    /**
     * name accessor
     * @return {string} the user's name
     */
    getName() {
       return this.name;
    }
    /**
     * password accessor
     * @return {string} the user's password
     */
    getPassword() {
      return this.password;
    }
    /**
     * address accessor
     * @return {string} the user's address
     */
    getAddress() {
      return this.address;
    }
    /**
     * isAdmin accessor
     * @return {boolean} whether the user is an admin
     */
    getIsAdmin() {
      return this.isAdmin;
    }

    /**
     * email mutator
     * @param {string} email user's new email
     */
    setEmail(email) {
      this.email = email;
    }
    /**
     * name mutator
     * @param {string} name user's new name
     */
    setName(name) {
      this.name = name;
    }
    /**
     * password mutator
     * @param {string} password user's new password
     */
    setPassword(password) {
      this.password = password;
    }
    /**
     * address mutator
     * @param {string} address user's new address
     */
    setAddress(address) {
      this.address = address;
    }
    /**
     * email mutator
     * @param {boolean} isAdmin new specification of whether user is an admin
     */
    setIsAdmin(isAdmin) {
      this.isAdmin = isAdmin;
    }
}

module.exports = User;
