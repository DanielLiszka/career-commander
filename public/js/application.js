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

  submissionForm.on('click', function (event) {
    event.preventDefault();
    if (document.getElementById('selected-resume')) {
      var resumeName = $('#selected-resume');
    } else {
      var resumeName = $('#resume_name-input');
    }

    var userData = {
      manager_phone_number: hiringManagerPhoneNumber.val().trim(),
      manager_email: hiringManagerEmail.val().trim(),
      manager_last_name: hiringManagerLastName.val().trim(),
      manager_first_name: hiringManagerFirstName.val().trim(),
      position_name: positionName.val().trim(),
      position_location: positionLocation.val().trim(),
      position_description: positionDescription.val().trim(),
      position_closing_date: positionClosingDate
        .data('datepicker')
        .getFormattedDate('yyyy-mm-dd'),
      company_name: companyName.val().trim(),
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
      !userData.manager_email ||
      !userData.manager_first_name ||
      !userData.manager_last_name ||
      !userData.manager_phone_number ||
      !userData.position_description ||
      !userData.position_location ||
      !userData.company_name ||
      !userData.position_closing_date ||
      !userData.position_name
    ) {
      return;
    }

    //reset input fields
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

    submitApplication(userData);
  });

  async function submitApplication(userData) {
    const company_data = await $.post('/api/companies/', {
      company_name: userData.company_name,
    }).catch(function (err) {
      console.log(err);
    });
    //console.log(company_data);

    const manager_data = await $.post('/api/managers/', {
      manager_first_name: userData.manager_first_name,
      manager_last_name: userData.manager_last_name,
      manager_email: userData.manager_email,
      manager_phone: userData.manager_phone_number,
      company_id: company_data.id,
    }).catch(function (err) {
      console.log(err);
    });
    //console.log(manager_data);

    const position_data = await $.post('/api/positions/', {
      position_name: userData.position_name,
      position_description: userData.position_description,
      position_location: userData.position_location,
      position_close_date: userData.position_closing_date,
      company_id: manager_data.company_id,
      manager_id: manager_data.id,
    }).catch(function (err) {
      console.log(err);
    });
    //console.log(position_data);

    const resume_data = await $.post('/api/resumes/', {
      resume_name: userData.resume_name,
      resume_description: userData.resume_description,
    }).catch(function (err) {
      console.log(err);
    });
    //console.log(resume_data);

    var plain_object = {
      offer: userData.offer,
      accepted: userData.accepted,
      interview1_date: userData.interview1_date,
      interview2_date: userData.interview2_date,
      interview3_date: userData.interview3_date,
      interview4_date: userData.interview4_date,
      position_id: position_data.id,
      resume_id: resume_data.id,
      company_id: company_data.id,
      manager_id: manager_data.id,
    };
    Object.keys(plain_object).forEach(function (key) {
      var item = plain_object[key];
      if (item === '') {
        delete plain_object[key];
      }
    });
    const application_data = await $.post('/api/applications', plain_object)
      .then(function () {
        window.location.replace('/dashboard');
      })
      .catch(function (err) {
        console.log(err);
      });
    //console.log(application_data);
  }

  // get resume selection and display the description
  async function checkResumes() {
    // get the selected resume id
    var selectedResumeId = $('#selected-resume').val();

    // is a resume has been selected, get all the resume data
    if (selectedResumeId) {
      var resumeData = await $.get('/api/resumes', {}).catch((err) =>
        console.log(err)
      );
      // check to see if there are more than one resume
      if (resumeData.length > 1) {
        // If there is a list, wait for the change from a resume selection
        $('#selected-resume').on('change', async function (event) {
          event.preventDefault();
          //Get selected-resume value after change
          var selectedResumeId = $('#selected-resume').val();
          // using the resume id, get the description for that resume
          var selectedResumeData = await $.get(
            `/api/resumes/${selectedResumeId}`,
            {}
          ).catch((err) => console.log(err));
          var selectedDescription = selectedResumeData.description;

          // set the value of the resume description textarea to the selected description
          $('#resume_description-input').val(selectedDescription);
        });
        // there is only one resume, just go ahead and display the description
      } else {
        // using the resume id, get the description for that resume
        var selectedResumeData = await $.get(
          `/api/resumes/${selectedResumeId}`,
          {}
        ).catch((err) => console.log(err));

        var selectedDescription = selectedResumeData.description;

        // set the value of the resume description textarea to the selected description
        $('#resume_description-input').val(selectedDescription);
      }
    }
  }

  checkResumes();
});
