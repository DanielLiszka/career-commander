$(document).ready(function () {
  var ChangeForm = $('#change-password');
  var userId = $('#user-id');
  var emailInput = $('#change_email-input');
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
    newPasswordInput.val('');
  });

  async function ChangePassword(id, password) {
    const company_data = await $.ajax({
      type: 'PUT',
      url: `/api/users/change/${id}`,
      data: JSON.stringify({ password }),
      contentType: 'application/json',
      success: (response) => {
        console.log(response);
        location.replace('/dashboard');
      },
    }).catch(function (err) {
      console.log(err);
      appendChangeErrorMessage();
    });
  }

  //Append error message
  var appendChangeErrorMessage = function () {
    $('#change').append(
      "<div class='text-center alert alert-danger' id='change_error_message' role='alert'><strong>Password Change Failed</strong></div>"
    );
  };
});
