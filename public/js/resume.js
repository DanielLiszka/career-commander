$(document).ready(function () {
  // Current in ascending order. May need to create a sorting-function to match the descending order of the dashboard page.
  var main_header = document.querySelectorAll('#resume_id_header');
  var modal_header = document.querySelectorAll('#resume_id_modal_header');
  i;
  for (let i = 1; i < main_header.length + 1; i++) {
    main_header[i - 1].innerHTML = 'Resume # ' + i;
    modal_header[i - 1].innerHTML = 'Resume # ' + i;
  }
  // list for click on Add a New Resume button
  var new_resume = $('#post-resume');

  new_resume.on('click', function (event) {
    event.preventDefault();
    $('#resume_post_error_message').remove();
    var resumeNamePost = $('#resume_name-post');
    var resumeDescriptionPost = $('#resume_description-post');
    var userData = {
      resume_name: resumeNamePost.val().trim(),
      resume_description: resumeDescriptionPost.val().trim(),
    };
    if (!userData.resume_name || !userData.resume_description) {
      appendPostResumeErrorMessage();
      return;
    }

    PostResume(userData.resume_name, userData.resume_description);
    resumeNamePost.val('');
    resumeDescriptionPost.val('');
  });

  // listen for click on edit buttons
  // var edit_buttons = document.querySelectorAll('#editResume');
  // for (var i = 0; i < edit_buttons.length; i++)
  //   edit_buttons[i].onclick = displayEditModal;

  // listen for click on delete buttons
  var delete_buttons = document.querySelectorAll('#deleteResume');
  for (var i = 0; i < delete_buttons.length; i++)
    delete_buttons[i].onclick = deleteResume;

  // listen for click on save button
  var submissionForm = $('.save-resume');
  submissionForm.on('click', function (event) {
    event.preventDefault();
    $('#resume_edit_error_message').remove();
    const id = event.target.getAttribute('data-id');
    var resumeName = $('#resume_name-edit-' + id);
    var resumeDescription = $('#resume_description-edit-' + id);

    var resumeData = {
      id: id,
      name: resumeName.val().trim(),
      description: resumeDescription.val().trim(),
    };
    //console.log(resumeData);
    //console.log(resumeData.name);
    //console.log(resumeData.description);
    //Ensure that required fields have data
    if (!resumeData.name || !resumeData.description) {
      appendEditResumeErrorMessage();
      return;
    }
    editResume(resumeData);
  });
});

// Delete single resume
const deleteResume = async (event) => {
  $('#resume_delete_error_message').remove();
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/resumes/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      document.location.replace('/resume');
    } else {
      appendDeleteResumeErrorMessage();
      console.log(response);
    }
  }
};

//Edit the resume in a modal format and save the data WIP.
async function editResume(resumeData) {
  var id = resumeData.id;
  console.log(id);
  var resume_info = await $.get(`/api/resumes/${id}`, {}).catch(function (err) {
    console.log(err);
  });

  var resume_name = resumeData.name;
  var resume_description = resumeData.description;
  var resume_id = resumeData.id;

  console.log(resume_id);

  const resume_data = await $.ajax({
    type: 'PUT',
    url: `/api/resumes/${resumeData.id}`,
    data: JSON.stringify({ resume_name, resume_description }),
    contentType: 'application/json',
  }).catch(function (err) {
    appendEditResumeErrorMessage();
    console.log(err);
  });

  // Reload page after saving changes
  window.location.reload();
}

function PostResume(resume_name, resume_description) {
  $.post('/api/resumes/', {
    resume_name: resume_name,
    resume_description: resume_description,
  })
    .then(function () {
      window.location.replace('/resume');
    })
    .catch(function (err) {
      appendPostResumeErrorMessage();
      console.log(err);
    });
}

async function displayEditModal() {
  //get resume id
  var selectedResume = $("*[id^='editResumeModal-']");
  var selectedResumeId = selectedResume.getAttribute('data-resume');
  // get resume info with id
  let selectedResumeData = await $.get(
    `/api/resumes/${selectedResumeId}`,
    {}
  ).catch((err) => console.log(err));
  // display resume name
}

//Append Error Messages
var appendDeleteResumeErrorMessage = function () {
  $('#delete_top_div').append(
    "<div class='text-center alert alert-danger' id='resume_delete_error_message' role='alert'><strong>Resume Deletion Failed</strong></div>"
  );
};

var appendPostResumeErrorMessage = function () {
  $('#post_top_div').append(
    "<div class='text-center alert alert-danger' id='resume_post_error_message' role='alert'><strong>Resume Submission Failed</strong></div"
  );
};

var appendEditResumeErrorMessage = function () {
  $('#edit_top_div').append(
    "<div class='text-center alert alert-danger' id='resume_edit_error_message' role='alert'><strong>Resume Editing Failed</strong></div>"
  );
};
