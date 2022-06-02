//execute "/logout" user route when "Logout" is clicked and redirect to login page.
$(document).ready(function () {
  var logOut = $('#logout');

  logOut.on('click', function (event) {
    event.preventDefault();
    $.post('/api/users/logout', {})
      .then(function () {
        window.location.replace('/');
      })
      .catch(function (err) {
        console.log(err);
      });
  });
});
