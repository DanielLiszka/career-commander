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

    if (!userData.email || !userData.password) {
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
        console.log(err);
      });
  }
});
