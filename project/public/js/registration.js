const FIRST_NAME = "firstname";
const LAST_NAME = "lastname";
const EMAIL = "email";
const PASSWORD = "password";
const CONFIRM_PASSWORD = "confirmPassword";
let submitRegistration = () => {
    let registrationData = $('form').serializeArray().reduce((obj, registration) => {
        obj[registration.name] = registration.value;
        return obj;
    }, {});
    if (data[PASSWORD] !== data[CONFIRM_PASSWORD]){
        window.alert("Passwords don't match!");
    } else {
        //submit registrationData
    }
}