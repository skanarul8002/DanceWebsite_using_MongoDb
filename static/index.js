const updateForm = document.querySelector('.myForm');

updateForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const id = updateForm.id.value.trim();
  const name = updateForm.name.value.trim();
  const phone = updateForm.phone.value.trim();
  const email = updateForm.email.value.trim();
  const address = updateForm.address.value.trim();
  const desc = updateForm.desc.value.trim();

  if (!id || !name || !phone || !email || !address || !desc) {
    alert('Please fill all fields');
    return;
  }

  fetch('/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: id,
      name: name,
      phone: phone,
      email: email,
      address: address,
      desc: desc
    })
  })
  .then(response => response.text())
  .then(message => {
    alert(message);
    location.reload();
  })
  .catch(error => console.error(error));
});
