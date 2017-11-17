$( document ).ready( function () {
	$( "#registrationForm" ).validate( {
		rules: {
			first_name: "required",
			last_name: "required",
			full_address: "required",
      phone_number: {
        required: true,
        digits: true,
        minlength: 10,
        maxlength: 10
      },
			password: {
				required: true,
				minlength: 6,
        maxlength: 20
			},
			confirmPassword: {
				required: true,
				minlength: 6,
        maxlength: 20,
				equalTo: "#password"
			},
			email: {
				required: true,
				email: true
			}
		},
		messages: {
			first_name: "Please enter your firstname",
			last_name: "Please enter your lastname",
			full_address: "Please enter an address",
      phone_number: {
        required: "Please enter your phone number",
        digits: "A phone number can only have digits",
        minlength: "A phone number needs exactly 10 digits",
        maxlength: "A phone number needs exactly 10 digits"
      },
			password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 6 characters long",
        maxlength: "Your password must be at most 20 characters long"
			},
			confirmPassword: {
				required: "Please provide a password",
				minlength: "Your password must be at least 6 characters long",
        maxlength: "Your password must be at most 20 characters long",
				equalTo: "Please enter the same password as above"
			},
			email: "Please enter a valid email address"
		},
		errorElement: "em",
		errorPlacement: function ( error, element ) {
			// Add the `help-block` class to the error element
			error.addClass( "alert-danger" );

			if ( element.prop( "type" ) === "checkbox" ) {
				error.insertAfter( element.parent( "label" ) );
			} else {
				error.insertAfter( element );
			}
		},
		highlight: function ( element, errorClass, validClass ) {
			$( element ).addClass( "alert-danger" ).removeClass( "alert-success" );
		},
		unhighlight: function (element, errorClass, validClass) {
			$( element ).addClass( "alert-success" ).removeClass( "alert-danger" );
		}
	} );
});
