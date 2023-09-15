const editButtons = document.querySelectorAll('.editBtn');
let openForm = null;
const rows = document.querySelectorAll('#tr')
const elem = document.querySelectorAll('#tdid')
const elemId = elem.innerText;
function toggleFormVisibility(itemId) {
  const form = document.querySelector(`.hiddenform-${itemId}`);
  if (form) {
    // Close the currently open form (if any)
    if (openForm) {
      openForm.classList.add('hidden');
    }

    // Toggle the visibility of the clicked form
    form.classList.toggle('hidden');

    // Update the openForm reference to the currently open form
    openForm = form.classList.contains('hidden') ? null : form;
  }
}
window.addEventListener('click', (event) => {
  if (openForm && !openForm.contains(event.target)) {
    openForm.classList.add('hidden');
    openForm = null; 
  }
});


editButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation(); 
    const itemId = button.dataset.itemId;

    
    toggleFormVisibility(itemId);
  });
});

