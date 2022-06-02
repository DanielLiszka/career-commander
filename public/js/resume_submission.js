$(document).ready(function () {
  var new_resume = $('.new_resume');
  var resumeName = $('#resume_name-input');
  var resumeDescription = $('#resume_description-input');

  new_resume.on('submit', function (event) {
    event.preventDefault();
    var userData = {
      name: resumeName.val().trim(),
      description: resumeDescription.val().trim(),
    };
    if (!userData.name || !userData.description) {
      return;
    }

    AddResume(userData.name, userData.description);
    resumeName.val('');
    resumeDescription.val('');
  });

  function AddResume(name, description) {
    $.post('/api/resume/', {
      name: name,
      description: description,
    })
      .then(function () {
        window.location.replace('/resume');
      })
      .catch(function (err) {
        console.log(err);
      });
  }
});
