$(document).ready(function () {
  //Use bootstrap datepicker script
  var date_input = $('input[name="date"]');
  var container = "body";
  var options = {
    format: "mm/dd/yyyy",
    container: container,
    todayHighlight: true,
    autoclose: true,
  };
  date_input.datepicker(options);
});
