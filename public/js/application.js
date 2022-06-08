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

  submissionForm.on('click', async function (event) {
    event.preventDefault();
    $('#application_error_message').remove();
    // if a drop down menu us present for the resumes, get the resume name from the selected resume id
    if (document.getElementById('selected-resume')) {
      // Value is the resume id, but we need the resume name.
      var resumeId = $('#selected-resume').val().trim();
      var selectedResumeData = await $.get(
        `/api/resumes/${resumeId}`,
        {}
      ).catch((err) => console.log(err));
      var resumeName = selectedResumeData.name;
    } else {
      // if we don't have a drop down menu for the resumes, then get the name entered in that input field
      var resumeName = $('#resume_name-input').val().trim();
      console.log(resumeName);
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
      resume_name: resumeName,
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
      appendApplicationErrorMessage();
      return;
    }

    //reseting inputs may not be ideal if a API error is encountered.
    // resumeName.val('');

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

    // need to check if a drop down list is present for resumes - i.e., we are using an existing resume
    if (document.getElementById('selected-resume')) {
      // if so, set the resume id for the application to the content of the resume name field(id)
      var resume_data_id = $('#selected-resume').val();
      console.log(resume_data_id);
    } else {
      // else, we have a new resume and need to save it
      const resume_data = await $.post('/api/resumes/', {
        resume_name: userData.resume_name,
        resume_description: userData.resume_description,
      }).catch(function (err) {
        console.log(err);
      });
      // set the resume id for the application to the returned resume id
      var resume_data_id = resume_data.id;
      console.log(resume_data_id);
    }

    var plain_object = {
      offer: userData.offer,
      accepted: userData.accepted,
      interview1_date: userData.interview1_date,
      interview2_date: userData.interview2_date,
      interview3_date: userData.interview3_date,
      interview4_date: userData.interview4_date,
      position_id: position_data.id,
      resume_id: resume_data_id,
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
        appendApplicationErrorMessage();
        console.log(err);
      });
    //console.log(application_data);
  }

  // get resume selection and display the description
  async function checkResumes() {
    // get the selected resume id
    let selectedResumeId = $('#selected-resume').val();

    // if a resume has been selected, get all the resume data
    if (selectedResumeId) {
      let resumeData = await $.get('/api/resumes', {}).catch((err) =>
        console.log(err)
      );
      // initially set the description to the first resume in the list
      var selectedDescription = resumeData[0].description;

      // set the value of the resume description textarea to the selected description
      $('#resume_description-input').val(selectedDescription);

      // check to see if there are more than one resume
      if (resumeData.length > 1) {
        // If there is a list, wait for the change from a resume selection
        $('#selected-resume').on('change', async function (event) {
          event.preventDefault();
          //Get selected-resume value after change
          selectedResumeId = $('#selected-resume').val();
          // using the resume id, get the description for that resume
          let selectedResumeData = await $.get(
            `/api/resumes/${selectedResumeId}`,
            {}
          ).catch((err) => console.log(err));
          var selectedDescription = selectedResumeData.description;

          // set the value of the resume description textarea to the selected description
          $('#resume_description-input').val(selectedDescription);
        });
      }
    }
  }
var appendApplicationErrorMessage = function() {
  $('#application_top_div').append("<div class='text-center alert alert-danger' id='application_error_message' role='alert'><strong>Application Submission Failed</strong></div>"
  );
}
  checkResumes();
});
