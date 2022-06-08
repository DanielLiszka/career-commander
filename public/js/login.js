$(document).ready(function () {
  $('ul').hide();

  var loginForm = $('#login');
  var emailInput = $('input#login_email-input');
  var passwordInput = $('input#login_password-input');

  loginForm.on('submit', function (event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim().toLowerCase(),
      password: passwordInput.val().trim(),
    };
    //Remove Error Message
    $('#login_error_message').remove();
    if (!userData.email || !userData.password) {
      appendLoginErrorMessage();
      return;
    }

    loginUser(userData.email, userData.password);
    emailInput.val('');
    passwordInput.val('');
  });

  function loginUser(email, password) {
    $.post('/api/users/login', {
      email: email,
      password: password,
    })
      .then(function () {
        window.location.replace('/dashboard');
      })
      .catch(function (err) {
        appendLoginErrorMessage();
        console.log(err);
      });
  }

//Append error message
var appendLoginErrorMessage = function(){
  $('#login').append( 
    "<div class='text-center alert alert-danger' id='login_error_message' role='alert'><strong>Login Failed</strong></div>"
    );
}
});

