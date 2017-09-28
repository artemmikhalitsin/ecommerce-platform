const FIRST_NAME = "firstname";
const LAST_NAME = "lastname";
const EMAIL = "email";
const PASSWORD = "password";
const CONFIRM_PASSWORD = "confirmPassword";

let registrationRequest = (registrationData) => {
    $.ajax({
        url: 'http://localhost:8080/registrationRequest',
        type: 'POST',
        data: registrationData,
        success: function(data){
            alert("success!");
            console.log(data);
        },
        error: function(error){
            console.log(error);
        }
    })
}

let submitRegistration = () => {
    let registrationData = $('form').serializeArray().reduce((obj, registration) => {
        obj[registration.name] = registration.value;
        return obj;
    }, {});
    registrationData['is_admin'] = $('#adminBoolean').is(':checked') ? 1 : 0;
    if (registrationData[PASSWORD] !== registrationData[CONFIRM_PASSWORD]){
        window.alert("Passwords don't match!");
    } else {
        delete registrationData[CONFIRM_PASSWORD];
        registrationRequest(registrationData);
    }
}

