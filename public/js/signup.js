$(document).ready(function () {
  $('ul').hide();

  var SignupForm = $('#signup');
  var firstNameInput = $('input#signup_first_name-input');
  var lastNameInput = $('input#signup_last_name-input');
  var emailInput = $('input#signup_email-input');
  var passwordInput = $('input#signup_password-input');

  SignupForm.on('submit', function (event) {
    event.preventDefault();
    var userData = {
      first_name: firstNameInput.val(),
      last_name: lastNameInput.val(),
      email: emailInput.val().trim().toLowerCase(),
      password: passwordInput.val().trim(),
    };
    //Remove Error Message
    $('#signup_error_message').remove();

    if (
      !userData.email ||
      !userData.password ||
      !userData.first_name ||
      !userData.last_name
    ) {
      appendSignupErrorMessage();
      return;
    }

    SignupUser(
      userData.first_name,
      userData.last_name,
      userData.email,
      userData.password
    );
    firstNameInput.val('');
    lastNameInput.val('');
    emailInput.val('');
    passwordInput.val('');
  });

  function SignupUser(first_name, last_name, email, password) {
    $.post('/api/users', {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
    })
      .then(function () {
        window.location.replace('/dashboard');
      })
      .catch(function (err) {  
        appendSignupErrorMessage();
        console.log(err);
      });
  }
  //Append error message 
  var appendSignupErrorMessage = function() {
    $('#signup').append("<div class='text-center alert alert-danger' id='signup_error_message' role='alert'><strong>Signup Failed</strong></div>")
  }
});
