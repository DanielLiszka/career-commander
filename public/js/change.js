$(document).ready(function () {
  var ChangeForm = $('#change');
  var userId = $('#user-id');
  var emailInput = $('input#change_email-input');
  var newPasswordInput = $('input#new_password-input');

  //Change Password Function
  ChangeForm.on('submit', function (event) {
    event.preventDefault();
    var userData = {
      id: userId.val().trim(),
      email: emailInput.val().trim().toLowerCase(),
      password: newPasswordInput.val().trim(),
    };
    //Remove Error Message
    $('#change_error_message').remove();

    if (!userData.id || !userData.email || !userData.password) {
      appendChangeErrorMessage();
      return;
    }

    ChangePassword(userData.id, userData.password);
    // emailInput.val('');
    newPasswordInput.val('');
    oldPasswordInput.val('');
  });

  function ChangePassword(id, password) {
    $.put(`/api/users/change/${id}`, {
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
