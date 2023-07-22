const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const isVisible = 'is-visible';

// 'document.' is a way to query the HTML document.
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

// Full Site Modal "open buttons"
for (const elm of openModal) {
  elm.addEventListener('click', function() {
    // 'this' refers to 'elm' which is the list items in the HTML document in the navbar.
    // 'dataset' refers to the data attributes and 'open' is the data attribute that we want to access.
    const modalId = this.dataset.open; // This will return the value of the data attribute.

    // The data attributes on the list items in the navbar match the id of the associated modals.
    document.getElementById(modalId).classList.add(isVisible);
  })
}

for (const elm of closeModal) {
  elm.addEventListener('click', function() {
    // '.parentElement' grabs the parent element of the element in question.
    this.parentElement.parentElement.classList.remove(isVisible);
  })
}