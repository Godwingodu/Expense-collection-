const scriptURL = 'https://script.google.com/macros/s/AKfycbwWHh7hyJF-Xlkzn84otOEn8hsHin8tuLqu_twgQAyBgUq-PKXKB2kq6bAUb_6tbL5K/exec';

const form = document.forms['contact-form'];

form.addEventListener('submit', e => {
  e.preventDefault();

  // Display loading message
  const loadingMessage = document.getElementById('loading-message');
  if (loadingMessage) {
    loadingMessage.textContent = 'Submitting...';
  }

  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
      // Update loading message
      if (loadingMessage) {
        loadingMessage.textContent = 'Thank you! Your form is submitted successfully.';
      }
      // Add any further handling if needed
    })
    .catch(error => {
      // Handle errors
      console.error('Error!', error.message);
      // Update loading message on error
      if (loadingMessage) {
        loadingMessage.textContent = 'Error submitting the form. Please try again.';
      }
    })
    .finally(() => {
      // Optional: Reload the page after a delay (e.g., 2 seconds)
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
});






//  <-------------------------- Get the current date---------------------->
 var currentDate = new Date();
 // Format the date as YYYY-MM-DD
 var year = currentDate.getFullYear();
 var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
 var day = currentDate.getDate().toString().padStart(2, '0');
 var formattedDate = year + '-' + month + '-' + day;

 // Set the input field value to the current date
 document.getElementById('meeting-time').value = formattedDate;