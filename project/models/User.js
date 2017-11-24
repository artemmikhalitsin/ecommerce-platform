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
        this._email = email;
        this._name = name;
        this._address = address;
        this._password = password;
        this._isAdmin = isAdmin;
    }
    /**
     * email accessor
     * @return {string} the user's email
     */
    get email() {
      return this._email;
    }
    /**
     * name accessor
     * @return {string} the user's name
     */
    get name() {
       return this._name;
    }
    /**
     * password accessor
     * @return {string} the user's password
     */
    get password() {
      return this._password;
    }
    /**
     * address accessor
     * @return {string} the user's address
     */
    get address() {
      return this._address;
    }
    /**
     * isAdmin accessor
     * @return {boolean} whether the user is an admin
     */
    get isAdmin() {
      return this._isAdmin;
    }

    /**
     * email mutator
     * @param {string} email user's new email
     */
    set email(email) {
      this._email = email;
    }
    /**
     * name mutator
     * @param {string} name user's new name
     */
    set name(name) {
      this._name = name;
    }
    /**
     * password mutator
     * @param {string} password user's new password
     */
    set password(password) {
      this._password = password;
    }
    /**
     * address mutator
     * @param {string} address user's new address
     */
    set address(address) {
      this._address = address;
    }
    /**
     * email mutator
     * @param {boolean} isAdmin new specification of whether user is an admin
     */
    set isAdmin(isAdmin) {
      this._isAdmin = isAdmin;
    }
    /**
     * creates a clone of the user
     * @return {User} a copy of the object
     */
     clone() {
       return new User(
         this.email,
         this.name,
         this.address,
         this.password,
         this.isAdmin
       );
     }
}

module.exports = User;
