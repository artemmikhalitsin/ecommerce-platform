/**
 * Class representing a User
 * @author Catherine & Ajmer
 */
class User {
    /**
     * Given a user's info, creates a new user object
     * @param {string} first_name user's first name
     * @param {string} last_name user's last name
     * @param {string} phone_number user's phone number
     * @param {string} email email of the user
     * @param {string} full_address user's full address
     * @param {string} password user's password
     * @param {boolean} is_admin whether the user is an admin
     */
    constructor(first_name, last_name, phone_number, email, full_address, password,
                is_admin) {
      this.first_name = first_name;
      this.last_name = last_name;
      this.phone_number = phone_number;
      this.email = email;
      this.full_address = full_address;
      this.password = password;
      this.is_admin = is_admin;
    }

    /**
     * email accessor
     * @return {string} the user's email
     */
    getEmail() {
      return this.email;
    }

    /**
     * first_name accessor
     * @return {string} the user's first name
     */
    getfirst_name() {
       return this.first_name;
    }

    /**
     * last_name accessor
     * @return {string} the user's last name
     */
    getlast_name() {
      return this.last_name;
    }

    /**
     * phone_number accessor
     * @return {string} the user's phone number
     */
    getphone_number() {
      return this.phone_number;
    }

    /**
     * password accessor
     * @return {string} the user's password
     */
    getPassword() {
      return this.password;
    }

    /**
     * full_address accessor
     * @return {string} the user's full address
     */
    getfull_address() {
      return this.full_address;
    }

    /**
     * is_admin accessor
     * @return {boolean} whether the user is an admin
     */
    getis_admin() {
      return this.is_admin;
    }

    /**
     * email mutator
     * @param {string} email user's email
     */
    setEmail(email) {
      this.email = email;
    }

    /**
     * first name mutator
     * @param {string} first_name user's first name
     */
    setfirst_name(first_name) {
      this.first_name = first_name;
    }

    /**
     * last name mutator
     * @param {string} last_name user's last name
     */
    setlast_name(last_name) {
      this.last_name = last_name;
    }

    /**
     * phone number mutator
     * @param {string} phone_number user's phone number
     */
    setphone_number(phone_number) {
      this.phone_number = phone_number;
    }

    /**
     * password mutator
     * @param {string} password user's password
     */
    setPassword(password) {
      this.password = password;
    }

    /**
     * full address mutator
     * @param {string} full_address user's full address
     */
    setfull_address(full_address) {
      this.full_address = full_address;
    }

    /**
     * is_admin mutator
     * @param {boolean} is_admin new specification of whether user is an admin
     */
    setis_admin(is_admin) {
      this.is_admin = is_admin;
    }
}

module.exports = User;
