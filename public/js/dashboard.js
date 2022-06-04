$(document).ready(function () {
  var delete_buttons = document.querySelectorAll('#deleteApplication');
  for (var i = 0, len = delete_buttons.length; i < len; i++)
    delete_buttons[i].onclick = deleteApplication;
  //   var delete_all = document.querySelector('#deleteAllApplications');
  //   delete_all.onclick = deleteAllApplications;
  var edit_buttons = document.querySelectorAll('#editApplication');
  for (var i = 0, len = edit_buttons.length; i < len; i++)
    edit_buttons[i].onclick = editApplication;
});

const deleteApplication = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    console.log(id);
    const response = await fetch(`/api/applications/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      console.log(response);
    }
  }
};

// const deleteAllApplications = async (event) => {
//   try {
//     var all_id = document.querySelectorAll('[data-id]');
//     console.log(all_id);
//     for (var i = 0, len = all_id.length; i < len; i++) {
//       if (!all_id[i]) continue;
//       const response = await fetch(`/api/applications/${all_id[i]}`, {
//         method: 'DELETE',
//       });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

//Edit the application in a modal format and save the data WIP.
// async function editApplication(userData) {
//   userData.company_name;

//   userData.manager_first_name,
//     userData.manager_last_name,
//     userData.manager_email,
//     userData.manager_phone_number;

//   userData.position_name,
//     userData.position_description,
//     userData.position_location,
//     userData.position_closing_date;

//   userData.resume_name, userData.resume_description;

//   userData.offer,
//     userData.accepted,
//     userData.interview1_date,
//     userData.interview2_date,
//     userData.interview3_date,
//     userData.interview4_date;

//   const company_data = await $.put('/api/companies/', {
//     company_name: userData.company_name,
//   }).catch(function (err) {
//     console.log(err);
//   });
//   //console.log(company_data);

//   const manager_data = await $.put('/api/managers/', {
//     manager_first_name: userData.manager_first_name,
//     manager_last_name: userData.manager_last_name,
//     manager_email: userData.manager_email,
//     manager_phone: userData.manager_phone_number,
//     company_id: company_data.id,
//   }).catch(function (err) {
//     console.log(err);
//   });
//   //console.log(manager_data);

//   const position_data = await $.put('/api/positions/', {
//     position_name: userData.position_name,
//     position_description: userData.position_description,
//     position_location: userData.position_location,
//     position_close_date: userData.position_closing_date,
//     company_id: manager_data.company_id,
//     manager_id: manager_data.id,
//   }).catch(function (err) {
//     console.log(err);
//   });
//   //console.log(position_data);

//   const resume_data = await $.put('/api/resumes/', {
//     resume_name: userData.resume_name,
//     resume_description: userData.resume_description,
//   }).catch(function (err) {
//     console.log(err);
//   });
//   //console.log(resume_data);

//   var plain_object = {
//     offer: userData.offer,
//     accepted: userData.accepted,
//     interview1_date: userData.interview1_date,
//     interview2_date: userData.interview2_date,
//     interview3_date: userData.interview3_date,
//     interview4_date: userData.interview4_date,
//     position_id: position_data.id,
//     resume_id: resume_data.id,
//     company_id: company_data.id,
//     manager_id: manager_data.id,
//   };
//   Object.keys(plain_object).forEach(function (key) {
//     var item = plain_object[key];
//     if (item === '') {
//       delete plain_object[key];
//     }
//   });
//   const application_data = await $.put('/api/applications', plain_object)
//     .then(function () {
//       window.location.replace('/dashboard');
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
//   console.log(application_data);
// }
