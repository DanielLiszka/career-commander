$(document).ready(function () {
  var delete_buttons = document.querySelectorAll('#deleteResume');
  for (var i = 0; i < delete_buttons.length; i++)
    delete_buttons[i].onclick = deleteResume;

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
    //Ensure that required fields have data
    if (!resumeData.resume_name || !resumeData.resume_description) {
      return;
    }

    editResume(resumeData);
  });
});

// Delete single application
const deleteResume = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    console.log('A delete has been triggerd on id ' + id);
    const response = await fetch(`/api/resume/${id}`, {
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
  var resume_info = await $.get(`/api/resume/${id}`, {}).catch(function (err) {
    console.log(err);
  });

  var resume_name = resumeData.name;
  var resume_description = resumeData.description;
  var resume_id = resumeData.id;

  const resume_data = await $.ajax({
    type: 'PUT',
    url: `/api/resumes/${resumeData.id}`,
    data: JSON.stringify({ resume_name, resume_description }),
    contentType: 'application/json',
  }).catch(function (err) {
    console.log(err);
  });
}
