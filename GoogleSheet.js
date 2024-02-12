const scriptURL = 'https://script.google.com/macros/s/AKfycbwWHh7hyJF-Xlkzn84otOEn8hsHin8tuLqu_twgQAyBgUq-PKXKB2kq6bAUb_6tbL5K/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  console.log("submitted")
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! your form is submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})






function openGallery() {
  // Create a hidden file input element
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.capture = '';
  input.style.display = 'none';

  // Attach an event listener to handle file selection from the gallery
  input.addEventListener('change', function () {
    // Access the selected file from the gallery
    var selectedFile = input.files[0];

    // Handle the selected file as needed (e.g., upload or display)
    console.log('Selected file from gallery:', selectedFile);
  });

  // Trigger the file input element to open the gallery
  input.click();
}