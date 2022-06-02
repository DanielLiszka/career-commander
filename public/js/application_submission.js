$(document).ready(function () {
  //Use bootstrap datepicker script
  var date_input = $('input[name="date"]');
  var container = 'body';
  var options = {
    format: 'yyyy/mm/dd',
    container: container,
    todayHighlight: true,
    autoclose: true,
  };
  date_input.datepicker(options);

  var submissionForm = $('#application_submission');
  var position_location = $('input#position_location-input');
  var position_name = $('input#position_name-input');
  var company_name = $('input#company_name-input');
  var position_closing_date = $('input#position_closing_date-input');
  var position_description = $('input#position_description-input');
  var hiring_manager_first_name = $('input#hiring_manager_first_name-input');
  var hiring_manger_last_name = $('input#hiring_manager_last_name-input');
  var hiring_manager_email = $('input#hiring_manager_email-input');
  var hiring_manager_phone_number = $(
    'input#hiring_manager_phone_number-input'
  );
  var first_date = $('#1st_date');
  var second_date = $('#2nd_date');
  var third_date = $('#3rd_date');
  var fourth_date = $('#4th_date');
  var offer_check = $('input#offer_check');
  var acceptance_check = $('input#acceptance_check');

  submissionForm.on('click', function (event) {
    event.preventDefault();
    var userData = {
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
      // position:
      // name
      // location
      // description
      // company:
      // name
      // manager:
      // first_name
      // last_name
      // email
      // phone
    };

    submitApplication(
      userData.offer,
      userData.accepted,
      userData.interview1_date,
      userData.interview2_date,
      userData.interview3_date,
      userData.interview4_date
    );
    //offer_check.val(false);
    //accepted.val(false);
    //interview1_date.val('');
    //interview2_date.val('');
    //interview3_date.val('');
    //interview4_date.val('');
  });

  function submitApplication(
    offer,
    accepted,
    interview1_date,
    interview2_date,
    interview3_date,
    interview4_date
  ) {
    var plain_object = {
      offer: offer,
      accepted: accepted,
      interview1_date: interview1_date,
      interview2_date: interview2_date,
      interview3_date: interview3_date,
      interview4_date: interview4_date,
    };
    Object.keys(plain_object).forEach(function (key) {
      var item = plain_object[key];
      if (item === '') {
        delete plain_object[key];
      }
    });
    $.post('/api/applications', plain_object)
      .then(function () {
        window.location.replace('/application');
      })
      .catch(function (err) {
        console.log(err);
      });
  }
});
