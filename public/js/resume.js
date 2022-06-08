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
    $('#resume_post_error_message').removeClass('show');
    var resumeNamePost = $('#resume_name-post');
    var resumeDescriptionPost = $('#resume_description-post');
    var userData = {
      resume_name: resumeNamePost.val().trim(),
      resume_description: resumeDescriptionPost.val().trim(),
    };
    if (!userData.resume_name || !userData.resume_description) {
      $('#resume_post_error_message').addClass('show');
      return;
    }

    PostResume(userData.resume_name, userData.resume_description);
    resumeNamePost.val('');
    resumeDescriptionPost.val('');
  });

  // listen for click on delete buttons
  var delete_buttons = document.querySelectorAll('#deleteResume');
  for (var i = 0; i < delete_buttons.length; i++)
    delete_buttons[i].onclick = deleteResume;

  // listen for click on save button
  var submissionForm = $('.save-resume');

  submissionForm.on('click', function (event) {
    event.preventDefault();
    $('#resume_edit_error_message').removeClass('show');
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
      $('#resume_edit_error_message').addClass('show');
      return;
    }
    editResume(resumeData);
  });
});

// Delete single application
const deleteResume = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/resumes/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      document.location.replace('/resume');
    } else {
      $('#resume_delete_error_message').addClass('show');
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
    $('#resume_edit_error_message').addClass('show');
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
      $('#resume_post_error_message').addClass('show');
      console.log(err);
    });
}
