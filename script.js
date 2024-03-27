//  <-------------------------- Sweet alert ---------------------->
document.addEventListener('DOMContentLoaded', () => {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwWHh7hyJF-Xlkzn84otOEn8hsHin8tuLqu_twgQAyBgUq-PKXKB2kq6bAUb_6tbL5K/exec';
  const form = document.forms['contact-form'];

  form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Display SweetAlert2 loading message
      const swalLoading = Swal.fire({
          title: 'Submitting...',
          html: 'Please wait.',
          showConfirmButton: false,
          willOpen: () => {
              Swal.showLoading();
          },
      });

      try {
          const response = await fetch(scriptURL, { method: 'POST', body: new FormData(form) });
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }

          // Show success message
          Swal.fire({
              icon: 'success',
              title: 'Thank you!',
              text: 'Your Expense is submitted successfully.',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
          });
      } catch (error) {
          // Handle errors
          console.error('Error!', error.message);
          // Show error message
          Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error submitting the form. Please try again.',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
          });
      } finally {
          // Close the SweetAlert2 loading message
          swalLoading.close();
          // Optional: Reload the page after a delay (e.g., 2 seconds)
          setTimeout(() => {
              window.location.reload();
          }, 1000);
      }
  });
});




//  <-------------------------- Get the current date---------------------->
function setDefaultDateTime() {
  var currentDateTime = new Date();
  var year = currentDateTime.getFullYear();
  var month = (currentDateTime.getMonth() + 1).toString().padStart(2, '0');
  var day = currentDateTime.getDate().toString().padStart(2, '0');
  var hours = currentDateTime.getHours().toString().padStart(2, '0');
  var minutes = currentDateTime.getMinutes().toString().padStart(2, '0');

  var formattedDateTime = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes;

  document.getElementById('meeting-datetime').value = formattedDateTime;
}



//  <-------------------------- Get User Location ---------------------->
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    document.getElementById("demo").value = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  // Using OpenStreetMap Nominatim API
  var nominatimApiUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

  // Make a request to the Nominatim API
  fetch(nominatimApiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.display_name) {
        var address = data.display_name;
        document.getElementById("demo").value = address;
      } else {
        document.getElementById("demo").value = "Could not determine location.";
      }
    })
    .catch(error => {
      console.error("Error fetching location data:", error);
      document.getElementById("demo").value = "Error fetching location data.";
    });
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      document.getElementById("demo").value = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      document.getElementById("demo").value = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      document.getElementById("demo").value = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      document.getElementById("demo").value = "An unknown error occurred.";
      break;
  }
}

// Call the getLocation function to initiate the geolocation process
getLocation();





//  <-------------------------- Select corresponding options for payment type ---------------------->
function showOptions(type) {
  const allOptions = document.querySelectorAll('.creditOption, .debitOption, .bankOption');

  // Hide all options
  allOptions.forEach(option => {
      option.classList.add('hidden');
  });

  // Show the selected options
  const selectedOptions = document.querySelectorAll(`.${type}Option`);
  selectedOptions.forEach(option => {
      option.classList.remove('hidden');
  });
}



//  <-------------------------- Image Uploader ---------------------->
var fileUploader = document.getElementById("imageUpload");
var msg = document.getElementById("msg");
function uploadFi1es() {
  msg.innerHTML = "Uploading file... ";

  var file = fileUploader.files[0];
  var reader = new FileReader();
  reader.onload = function () {
    google.script.run
      .withSuccessHandler(function () {
        msg.innerHTML = "Uploaded. ";
      })
      .uploadFi1esToGoog1eDrive(reader.result, file.name, file.type);
  };
  reader.readAsText(file);
}






//  <-------------------------- Split the date and time ---------------------->
function submitForm(event) {
  event.preventDefault(); // Prevent form submission

  var dateTimeInput = document.getElementById('meeting-datetime').value;
  var dateTimeComponents = dateTimeInput.split('T'); // Split date and time

  var date = dateTimeComponents[0];
  var timeInput = dateTimeComponents[1].substring(0, 5); // Extract time part
  var hours = parseInt(timeInput.substring(0, 2));
  var minutes = parseInt(timeInput.substring(3, 5));
  var ampm = (hours >= 12) ? 'PM' : 'AM'; // Determine AM/PM

  // Convert hours to 12-hour format
  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }

  var timeWithAmPm = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ' ' + ampm; // Combine time and AM/PM

  // Assign date and time with AM/PM to separate inputs
  document.getElementById('date-input').value = date;
  document.getElementById('time-ampm-input').value = timeWithAmPm;

  // Submit the form
  // document.getElementById('myForm').submit(); // Uncomment this line if you want to submit the form automatically
}
