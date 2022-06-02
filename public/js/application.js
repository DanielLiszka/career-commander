$(document).ready(function () {
  var delete_buttons = document.querySelectorAll('#deleteApplication');
  for (var i = 0, len = delete_buttons.length; i < len; i++)
    delete_buttons[i].onclick = deleteApplication;
  var edit_buttons = document.querySelectorAll('#saveApplication');
  for (var i = 0, len = edit_buttons.length; i < len; i++)
    edit_buttons[i].onclick = editApplication;
});

const deleteApplication = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/applications/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/application');
    } else {
      console.log(response);
    }
  }
};

const editApplication = async (event) => {};
