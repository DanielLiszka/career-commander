$(document).ready(function () {
  //Use bootstrap datepicker script
  var now = Date();
  var date_input = $('input[name="date"]').datepicker({
    startDate: now,
  });
  var container = 'body';
  var options = {
    format: 'mm/dd/yyyy',
    container: container,
    todayHighlight: true,
    autoclose: true,
  };
  date_input.datepicker(options);

  var submissionForm = $('#application_submission');
  var resumeName = $('#resume_name-input');
  var resumeDescription = $('#resume_description-input');
  var positionLocation = $('input#position_location-input');
  var positionName = $('input#position_name-input');
  var companyName = $('input#company_name-input');
  var positionClosingDate = $('input#position_closing_date-input');
  var positionDescription = $('#position_description-input');
  var hiringManagerFirstName = $('input#hiring_manager_first_name-input');
  var hiringManagerLastName = $('input#hiring_manager_last_name-input');
  var hiringManagerEmail = $('input#hiring_manager_email-input');
  var hiringManagerPhoneNumber = $('input#hiring_manager_phone_number-input');
  var first_date = $('#1st_date');
  var second_date = $('#2nd_date');
  var third_date = $('#3rd_date');
  var fourth_date = $('#4th_date');
  var offer_check = $('input#offer_check');
  var acceptance_check = $('input#acceptance_check');

  // Example JavaScript provided by Bootstrap for disabling form submissions if there are invalid fields
  (function () {
    'use strict';

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        'submit',
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

  submissionForm.on('submit', function (event) {
    event.preventDefault();

    var userData = {
      hiring_manager_phone_number: hiringManagerPhoneNumber.val().trim(),
      hiring_manager_email: hiringManagerEmail.val().trim(),
      hiring_manager_last_name: hiringManagerLastName.val().trim(),
      hiring_manager_first_name: hiringManagerFirstName.val().trim(),
      position_description: positionDescription.val().trim(),
      position_closing_date: positionClosingDate
        .data('datepicker')
        .getFormattedDate('yyyy-mm-dd'),
      company_name: companyName.val().trim(),
      position_name: positionName.val().trim(),
      position_location: positionLocation.val().trim(),
      resume_name: resumeName.val().trim(),
      resume_description: resumeDescription.val().trim(),
      offer: offer_check.is(':checked'),
      accepted: acceptance_check.is(':checked'),
      interview1_date: first_date
        .data('datepicker')
        .getFormattedDate('yyyy-mm-dd'),
      interview2_date: second_date
        .data('datepicker')
        .getFormattedDate('yyyy-mm-dd'),
      interview3_date: third_date
        .data('datepicker')
        .getFormattedDate('yyyy-mm-dd'),
      interview4_date: fourth_date
        .data('datepicker')
        .getFormattedDate('yyyy-mm-dd'),
    };

    //Ensure that required fields have data
    if (
      !userData.resume_name ||
      !userData.resume_description ||
      !userData.hiring_manager_email ||
      !userData.hiring_manager_first_name ||
      !userData.hiring_manager_last_name ||
      !userData.hiring_manager_phone_number ||
      !userData.position_description ||
      !userData.position_location ||
      !userData.company_name ||
      !userData.position_closing_date ||
      !userData.position_name
    ) {
      return;
    }

    submitResume(userData.resume_name, userData.resume_description);

    submitApplication(
      userData.offer,
      userData.accepted,
      userData.interview1_date,
      userData.interview2_date,
      userData.interview3_date,
      userData.interview4_date
    );

    resumeName.val('');
    resumeDescription.val('');
    positionLocation.val('');
    positionName.val('');
    positionDescription.val('');
    hiringManagerFirstName.val('');
    hiringManagerLastName.val('');
    hiringManagerEmail.val('');
    hiringManagerPhoneNumber.val('');
    companyName.val('');
  });

  function submitApplication(
    offer,
    accepted,
    interview1_date,
    interview2_date,
    interview3_date,
    interview4_date
  ) {
    var plain_object = {
      offer: offer,
      accepted: accepted,
      interview1_date: interview1_date,
      interview2_date: interview2_date,
      interview3_date: interview3_date,
      interview4_date: interview4_date,
    };
    Object.keys(plain_object).forEach(function (key) {
      var item = plain_object[key];
      if (item === '') {
        delete plain_object[key];
      }
    });
    $.post('/api/applications', plain_object).catch(function (err) {
      console.log(err);
    });
  }

  // var delete_buttons = document.querySelectorAll('#deleteApplication');
  // for (var i = 0, len = delete_buttons.length; i < len; i++)
  //   delete_buttons[i].onclick = deleteApplication;
  // var edit_buttons = document.querySelectorAll('#saveApplication');
  // for (var i = 0, len = edit_buttons.length; i < len; i++)
  //   edit_buttons[i].onclick = editApplication;

  // const deleteApplication = async (event) => {
  //   if (event.target.hasAttribute('data-id')) {
  //     const id = event.target.getAttribute('data-id');

  //     const response = await fetch(`/api/applications/${id}`, {
  //       method: 'DELETE',
  //     });

  //     if (response.ok) {
  //       document.location.replace('/application');
  //     } else {
  //       console.log(response);
  //     }
  //   }
  // };

  function submitResume(resume_name, resume_description) {
    $.post('/api/resumes/', {
      resume_name: resume_name,
      resume_description: resume_description,
    }).catch(function (err) {
      console.log(err);
    });
  }

  // const editApplication = async (event) => {};

  // var delete_buttons = document.querySelectorAll('#deleteResume');
  // for (var i = 0, len = delete_buttons.length; i < len; i++)
  //   delete_buttons[i].onclick = deleteResume;
  // var edit_buttons = document.querySelectorAll('#editResume');
  // for (var i = 0, len = edit_buttons.length; i < len; i++)
  //   edit_buttons[i].onclick = editResume;

  // const deleteResume = async (event) => {
  //   if (event.target.hasAttribute('data-id')) {
  //     const id = event.target.getAttribute('data-id');

  //     const response = await fetch(`/api/resumes/${id}`, {
  //       method: 'DELETE',
  //     });

  //     if (response.ok) {
  //       document.location.replace('/resume');
  //     } else {
  //       console.log(response);
  //     }
  //   }
  // };

  //WIP
  //const editResume = async (event) => {};
});
