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
    $('#signup_error_message').removeClass('show');

    if (
      !userData.email ||
      !userData.password ||
      !userData.first_name ||
      !userData.last_name
    ) {
      $('#signup_error_message').addClass('show');
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
        $('#signup_error_message').addClass('show');
        console.log(err);
      });
  }
});
