let registrationRequest = (registrationData) => {
    $.ajax({
        url: 'http://localhost:8080/registrationRequest',
        type: 'POST',
        data: registrationData,
        success: function(data) {
            alert('success!');
            console.log(data);
        },
        error: function(error) {
            console.log(error);
        },
    });
};

let submitRegistration = () => {
    let registrationData = $('form').serializeArray().reduce((obj, registration) => {
        obj[registration.name] = registration.value;
        return obj;
    }, {});
    registrationData['is_administrator'] = $('#adminBoolean').is(':checked') ? 1 : 0;
    if (registrationData['password'] !== registrationData['confirmPassword']){
        window.alert("Passwords don't match!");
        return false;
    } else {
        delete registrationData['confirmPassword'];
        registrationRequest(registrationData);
    }
};
