const scriptURL = 'https://script.google.com/macros/s/AKfycbwWHh7hyJF-Xlkzn84otOEn8hsHin8tuLqu_twgQAyBgUq-PKXKB2kq6bAUb_6tbL5K/exec';
const form = document.forms['contact-form'];

form.addEventListener('submit', async e => {
  e.preventDefault();

  // Display SweetAlert2 loading message
  const swalLoading = Swal.fire({
    title: "Submitting...",
    html: "Please wait.",
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    }
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
      showConfirmButton: false
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
      showConfirmButton: false
    });
  } finally {
    // Close the SweetAlert2 loading message
    swalLoading.close();
    // Optional: Reload the page after a delay (e.g., 2 seconds)
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
});





// const scriptURL = 'https://script.google.com/macros/s/AKfycbwWHh7hyJF-Xlkzn84otOEn8hsHin8tuLqu_twgQAyBgUq-PKXKB2kq6bAUb_6tbL5K/exec';

// const form = document.forms['contact-form'];

// form.addEventListener('submit', e => {
//   e.preventDefault();

//   // Display loading message
//   const loadingMessage = document.getElementById('loading-message');
//   if (loadingMessage) {
//     loadingMessage.textContent = 'Submitting...';
//   }

//   fetch(scriptURL, { method: 'POST', body: new FormData(form) })
//     .then(response => {
//       // Update loading message
//       if (loadingMessage) {
//         loadingMessage.textContent = 'Thank you! Your form is submitted successfully.';
//       }
//       // Add any further handling if needed
//     })
//     .catch(error => {
//       // Handle errors
//       console.error('Error!', error.message);
//       // Update loading message on error
//       if (loadingMessage) {
//         loadingMessage.textContent = 'Error submitting the form. Please try again.';
//       }
//     })
//     .finally(() => {
//       // Optional: Reload the page after a delay (e.g., 2 seconds)
//       setTimeout(() => {
//         window.location.reload();
//       }, 2000);
//     });
// });






//  <-------------------------- Get the current date---------------------->
var currentDateTime = new Date();
var year = currentDateTime.getFullYear();
var month = (currentDateTime.getMonth() + 1).toString().padStart(2, '0');
var day = currentDateTime.getDate().toString().padStart(2, '0');
var hours = currentDateTime.getHours().toString().padStart(2, '0');
var minutes = currentDateTime.getMinutes().toString().padStart(2, '0');

var formattedDateTime = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes;

document.getElementById('meeting-datetime').value = formattedDateTime;








//  <-------------------------- Sweet alert ---------------------->

//  let timerInterval;
// Swal.fire({
//   title: "Auto close alert!",
//   html: "I will close in <b></b> milliseconds.",
//   timer: 2000,
//   timerProgressBar: true,
//   didOpen: () => {
//     Swal.showLoading();
//     const timer = Swal.getPopup().querySelector("b");
//     timerInterval = setInterval(() => {
//       timer.textContent = `${Swal.getTimerLeft()}`;
//     }, 100);
//   },
//   willClose: () => {
//     clearInterval(timerInterval);
//   }
// }).then((result) => {
//   /* Read more about handling dismissals below */
//   if (result.dismiss === Swal.DismissReason.timer) {
//     console.log("I was closed by the timer");
//   }
// });