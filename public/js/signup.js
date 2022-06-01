$(document).ready(function () {
  $("ul").hide();

  var loginForm = $("#signup");
  var firstNameInput = $("input#signup_first_name-input");
  var lastNameInput = $("input#signup_last_name-input");
  var emailInput = $("input#signup_email-input");
  var passwordInput = $("input#signup_password-input");

  loginForm.on("submit", function (event) {
    console.log(nameInput);
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim().toLowerCase(),
      password: passwordInput.val().trim(),
      first_name: str(firstNameInput),
      last_name: str(lastNameInput),
    };

    if (
      !userData.email ||
      !userData.password ||
      !userData.first_name ||
      !userData.last_name
    ) {
      return;
    }

    loginUser(
      userData.email,
      userData.password,
      userData.first_name,
      userData.last_name
    );
    nameInput.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  function loginUser(first_name, last_name, email, password) {
    $.post("/api/users", {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
    })
      .then(function () {
        window.location.replace("/dashboard");
      })
      .catch(function (err) {
        console.log(err);
      });
  }
});
