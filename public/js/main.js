// Example JavaScript provided by Bootstrap for disabling form submissions if there are invalid fields
(function () {
  'use strict';

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      'click',
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated');
      },
      false
    );
  });
})();

//execute "/logout" user route when "Logout" is clicked and redirect to login page.
$(document).ready(function () {
  var logOut = $('#logout');

  // Current Date
  var current_date = new Date().toLocaleString().split(',')[0];

  $('.date').html(current_date);
  // Clock function
  setInterval(function () {
    var hours = new dayjs().hour();
    $('.hours').html((hours < 10 ? '0' : '') + hours);
  }, 1000);
  setInterval(function () {
    var minutes = new dayjs().minute();
    $('.minutes').html((minutes < 10 ? '0' : '') + minutes);
  }, 1000);
  setInterval(function () {
    var seconds = new dayjs().second();
    $('.seconds').html((seconds < 10 ? '0' : '') + seconds);
  }, 1000);

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
