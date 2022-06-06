$(document).ready(function () {
  // listen for click on delete buttons
  var delete_buttons = document.querySelectorAll('#deleteResume');
  for (var i = 0; i < delete_buttons.length; i++)
    delete_buttons[i].onclick = deleteResume;

  // listen for click on save button
  var submissionForm = $('.save-resume');

  submissionForm.on('click', function (event) {
    event.preventDefault();
    const id = event.target.getAttribute('data-id');
    var resumeName = $('#resume_name-edit-' + id);
    var resumeDescription = $('#resume_description-edit-' + id);

    var resumeData = {
      id: id,
      name: resumeName.val().trim(),
      description: resumeDescription.val().trim(),
    };
    console.log(resumeData);
    console.log(resumeData.name);
    console.log(resumeData.description);
    //Ensure that required fields have data
    if (!resumeData.name || !resumeData.description) {
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
    console.log(err);
  });

  // Reload page after saving changes
  window.location.reload();
}
