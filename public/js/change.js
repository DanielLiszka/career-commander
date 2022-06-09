$(document).ready(function () {
  $('ul').hide();

  var ChangeForm = $('#change');
  var emailInput = $('input#change_email-input');
  var newPasswordInput = $('input#new_password-input');
  var oldPasswordInput = $('input#old_password-input');

  //Change Password Function
  ChangeForm.on('submit', function (event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim().toLowerCase(),
      password: newPasswordInput.val().trim(),
      oldpassword: oldPasswordInput.val().trim(),
    };
    //Remove Error Message
    $('#change_error_message').remove();

    if (!userData.email || !userData.password || !userData.oldpassword) {
      appendChangeErrorMessage();
      return;
    }

    ChangePassword(userData.email, userData.password, userData.oldpassword);
    emailInput.val('');
    newPasswordInput.val('');
    oldPasswordInput.val('');
  });

  function ChangePassword(email, password) {
    $.put('/api/users/change', {
      email: email,
      password: password,
    })
      .then(function () {
        window.location.replace('/dashboard');
      })
      .catch(function (err) {
        appendChangeErrorMessage();
        console.log(err);
      });
  }
  //Append error message
  var appendChangeErrorMessage = function () {
    $('#change').append(
      "<div class='text-center alert alert-danger' id='change_error_message' role='alert'><strong>Password Change Failed</strong></div>"
    );
  };
});
