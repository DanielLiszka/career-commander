$(document).ready(function () {
  var new_resume = $('.new_resume');
  var resumeName = $('#resume_name-input');
  var resumeDescription = $('#resume_description-input');

  new_resume.on('submit', function (event) {
    event.preventDefault();
    var userData = {
      resume_name: resumeName.val().trim(),
      resume_description: resumeDescription.val().trim(),
    };
    if (!userData.resume_name || !userData.resume_description) {
      return;
    }

    AddResume(userData.resume_name, userData.resume_description);
    resumeName.val('');
    resumeDescription.val('');
  });

  function AddResume(resume_name, resume_description) {
    $.post('/api/resumes/', {
      resume_name: resume_name,
      resume_description: resume_description,
    })
      .then(function () {
        window.location.replace('/resume');
      })
      .catch(function (err) {
        console.log(err);
      });
  }
});
