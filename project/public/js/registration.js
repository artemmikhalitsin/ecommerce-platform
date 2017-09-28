const FIRST_NAME = "firstname";
const LAST_NAME = "lastname";
const EMAIL = "email";
const PASSWORD = "password";
const CONFIRM_PASSWORD = "confirmPassword";
let thing = () => {
    // From http://test.com
    $.ajax({
      url: 'http://localhost:8080/test',
      data: 'JSON',
      success: function(data){
        console.log(data);
      }
    });
};

let makeAdminAccount = (registrationData) => {
    $.ajax({
        url: 'http://localhost:8080/makeAdminAccount',
        type: 'POST',
        data: registrationData,
        success: function(){
            alert("success!")
        },
        error: function
    })
}

let submitRegistration = () => {
    let registrationData = $('form').serializeArray().reduce((obj, registration) => {
        obj[registration.name] = registration.value;
        return obj;
    }, {});
    if (registrationData[PASSWORD] !== registrationData[CONFIRM_PASSWORD]){
        window.alert("Passwords don't match!");
    } else {
        //thing();
        makeAdminAccount(registrationData);
        //submit registrationData
    }
}

