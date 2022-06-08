//global selected resume name variable
var selectedResumeName 
var selectedResumeId
selection_input = false

$(document).ready(function () {
  //Default to manual resume input on page load 

  var delete_buttons = document.querySelectorAll('#deleteApplication');
  for (var i = 0, len = delete_buttons.length; i < len; i++)
    delete_buttons[i].onclick = deleteApplication;

  var searchButtton = $('#searchApplication');
  // Hides all parent cards with a string not matching the search query
  searchButtton.on('click', function (event) {
    //var top_header = $('#top_header');
    var searchQuery = $('#searchinput').val().trim().toLowerCase();
    var text = searchQuery;
    //Finds string inside children elements and hides the parent div if no match.
    var search = $('div#child_card_div').filter(function () {
      //reset search
      $(this).show();
      top_header.innerHTML = 'Saved Applications';
      //If no match then hide parent div
      if (!($(this).text().indexOf(text.toLowerCase()) >= 0)) {
        top_header.innerHTML = 'Saved Applications Search Results';
        $(this).hide();
      }
    });
  });
  // Select all child cards and change the Application # to descending order numbering.
  var main_header = document.querySelectorAll('#application_id_header');
  var modal_header = document.querySelectorAll('#application_id_modal_header');
  i;
  for (let i = 1; i < main_header.length + 1; i++) {
    main_header[i - 1].innerHTML =
      'Application # ' + (main_header.length + 1 - i);
    modal_header[i - 1].innerHTML =
      'Application # ' + (modal_header.length + 1 - i);
  }

  var submissionForm = $('.save-application');

  submissionForm.on('click', function (event) {
    event.preventDefault();
    const id = event.target.getAttribute('data-id');
    //Change selector depending on wether a resume is already saved.
    if (selection_input === false){
    var resumeName = $('#resume_name-edit-' + id).val().trim();
    } else {resumeName = selectedResumeName }

    var resumeDescription = $('#resume_description-edit-' + id);
    var positionLocation = $('input#position_location-edit-' + id);
    var positionName = $('input#position_name-edit-' + id);
    var companyName = $('input#company_name-edit-' + id);
    var positionClosingDate = $('input#position_closing_date-edit-' + id);
    var positionDescription = $('#position_description-edit-' + id);
    var hiringManagerFirstName = $(
      'input#hiring_manager_first_name-edit-' + id
    );
    var hiringManagerLastName = $('input#hiring_manager_last_name-edit-' + id);
    var hiringManagerEmail = $('input#hiring_manager_email-edit-' + id);
    var hiringManagerPhoneNumber = $(
      'input#hiring_manager_phone_number-edit-' + id
    );
    var first_date = $('#1st_date_edit-' + id);
    var second_date = $('#2nd_date_edit-' + id);
    var third_date = $('#3rd_date_edit-' + id);
    var fourth_date = $('#4th_date_edit-' + id);
    var offer_check = $('input#offer_check_edit-' + id);
    var acceptance_check = $('input#acceptance_check_edit-' + id);

    var userData = {
      id: id,
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
    //console.log(userData);
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

    editApplication(userData);
  });
  ModifiedCheckResumes();
});

// Delete single application
const deleteApplication = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    console.log(id);
    const response = await fetch(`/api/applications/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      console.log(response);
    }
  }
};

//Edit the application in a modal format and save the data WIP.
async function editApplication(userData) {
  var id = userData.id;
  console.log(id);
  var application_info = await $.get(`/api/applications/${id}`, {}).catch(
    function (err) {
      console.log(err);
    }
  );

  var name = userData.company_name;
  const company_data = await $.ajax({
    type: 'PUT',
    url: `/api/companies/${application_info.company.id}`,
    data: JSON.stringify({ name }),
    contentType: 'application/json',
  }).catch(function (err) {
    console.log(err);
  });

  var manager_first_name = userData.manager_first_name;
  var manager_last_name = userData.manager_last_name;
  var manager_email = userData.manager_email;
  var manager_phone = userData.manager_phone_number;
  var company_id = application_info.company.id;

  const manager_data = await $.ajax({
    type: 'PUT',
    url: `/api/managers/${application_info.manager.id}`,
    data: JSON.stringify({
      manager_first_name,
      manager_last_name,
      manager_email,
      manager_phone,
      company_id,
    }),
    contentType: 'application/json',
  }).catch(function (err) {
    console.log(err);
  });
  //console.log(manager_data);

  var position_name = userData.position_name;
  var position_description = userData.position_description;
  var position_location = userData.position_location;
  var position_close_date = userData.position_closing_date;
  var position_id = application_info.position.id;
  var manager_id = application_info.manager.id;

  const position_data = await $.ajax({
    type: 'PUT',
    url: `/api/positions/${application_info.position.id}`,
    data: JSON.stringify({
      position_name,
      position_description,
      position_location,
      position_close_date,
      company_id,
      manager_id,
    }),
    contentType: 'application/json',
  }).catch(function (err) {
    console.log(err);
  });
  //console.log(position_data);

  var resume_name = userData.resume_name;
  var resume_description = userData.resume_description;
  var resume_id = application_info.resume.id;

  // no need for put requests if input field is set to read only

  // const resume_data = await $.ajax({
  //   type: 'PUT',
  //   url: `/api/resumes/${resume_id}`,
  //   data: JSON.stringify({ resume_name, resume_description }),
  //   contentType: 'application/json',
  // }).catch(function (err) {
  //   console.log(err);
  // });
  //console.log(resume_data);

  var plain_object = {
    offer: userData.offer,
    accepted: userData.accepted,
    interview1_date: userData.interview1_date,
    interview2_date: userData.interview2_date,
    interview3_date: userData.interview3_date,
    interview4_date: userData.interview4_date,
    position_id: application_info.position.id,
    resume_id: selectedResumeId,
    company_id: application_info.company.id,
    manager_id: application_info.manager.id,
  };
  Object.keys(plain_object).forEach(function (key) {
    var item = plain_object[key];
    if (item === '') {
      plain_object[key] = null;
    }
  });
  //console.log(JSON.stringify(plain_object));
  const application_data = await $.ajax({
    type: 'PUT',
    url: `/api/applications/${application_info.id}`,
    data: JSON.stringify(plain_object),
    contentType: 'application/json',
  })
    .then(function () {
      window.location.replace('/dashboard');
    })
    .catch(function (err) {
      console.log(err);
    });
  //console.log(application_data);
}

  // get resume selection and display the description
  async function ModifiedCheckResumes() {
      let resumeData = await $.get('/api/resumes', {}).catch((err) =>
      console.log(err)
    );
    if (resumeData.length == 1) {
      $("*[id^='resume_description-edit-']").val(resumeData[0].description);
      console.log(resumeData[0].description)
    } else{ 
      // check to see if there are more than one resume
      if (resumeData.length > 0) {
        selection_input = true 
        // Select all elements with a matching portion of its ID.
        selectedResume = $("*[id^='dashboard-selected-resume-']")
        //console.log(selectedResume)
        selectedResume.on('change', async function (event) {
          event.preventDefault();
          // if there's only one resume then use its resume description.
          var id = event.target.getAttribute('data-id')
          //Get selected-resume value after change
          selectedResumeId = $('#dashboard-selected-resume-' + id).val();
          // using the resume id, get the description for that resume
          let selectedResumeData = await $.get(
            `/api/resumes/${selectedResumeId}`,
            {}
          ).catch((err) => console.log(err));
          var selectedDescription = selectedResumeData.description;
          selectedResumeName = selectedResumeData.name
          //console.log(selectedResumeName)
          // set the value of the resume description textarea to the selected description
          $('#resume_description-edit-' + id).val(selectedDescription);
          }
        );
      }
    }
  }