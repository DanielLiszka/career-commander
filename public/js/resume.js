$(document).ready(function () {
  var delete_buttons = document.querySelectorAll('#deleteResume');
  for (var i = 0, len = delete_buttons.length; i < len; i++)
    delete_buttons[i].onclick = deleteResume;
  var edit_buttons = document.querySelectorAll('#saveResume');
  for (var i = 0, len = edit_buttons.length; i < len; i++)
    edit_buttons[i].onclick = editResume;
});

const deleteResume = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

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

//WIP
const editResume = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const resumeName = document.querySelector('#resume-name').value;
    const resumeDescription = document.querySelector('#resume-desc').value;

    $.put(`/api/resume/${id}`, {
      resume_name: resumeName,
      resume_description: resumeDescription,
    })
      .then(function () {
        window.location.replace('/resume');
      })
      .catch(function (err) {
        console.log(err);
      });
  }
};
