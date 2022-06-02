$(document).ready(function () {
  var delete_buttons = document.querySelectorAll('#deleteResume');
  for (var i = 0, len = delete_buttons.length; i < len; i++)
    delete_buttons[i].onclick = deleteResume;
  var edit_buttons = document.querySelectorAll('#editResume');
  for (var i = 0, len = edit_buttons.length; i < len; i++)
    edit_buttons[i].onclick = editResume;
});

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

//WIP
const editResume = async (event) => {};
