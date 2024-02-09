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