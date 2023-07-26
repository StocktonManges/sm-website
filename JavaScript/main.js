const theme = 'theme';
const dataTheme = 'data-theme';
const themeTab = '.theme-tab';
const switcherBtn = '.switcher-btn';
const dark = 'dark';
const light = 'light';
const open = 'open';
const active = 'active';

const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const isVisible = 'is-visible';

const dataFilter = '[data-filter]';
const portfolioData = '[data-item]';

// Accesses the root of the HTML page.
const root = document.documentElement;

/* Theme */
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
// Stores the current theme locally sot he computer remembers for the
// next time the user opens the website.
const currentTheme = localStorage.getItem(theme);

/* Portfolio Cards and Modals*/
const filterLink = document.querySelectorAll(dataFilter);
// Using 'querySelector' to select an id:
const searchBox = document.querySelector('#search');
// Array for creating the portfolio cards and popup modals.
const portfolioCardAndPopupModalData = [
  /* Contents [
  0: data-item, 
  1: data-open / popup id, 
  2: popup header, 
  3: image source, 
  4: portfolio header, 
  5: portfolio subheader, 
  6: popup subheader, 
  7: first p element, 
  8: second p element, 
  ]*/
  ['web', 'web-1', 'Web Project 1', "./assets/images/portfolio-1.jpg", 'Web Development', 'Food Website', 'My first awesome website', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
  ['web', 'web-2', 'Web Project 2', "./assets/images/portfolio-2.jpg", 'Web Development', 'Skate Website', 'My second amazing website', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
  ['web', 'web-3', 'Web Project 3', "./assets/images/portfolio-3.jpg", 'Web Development', 'Eating Website', 'My third phenomenal website', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
  ['ui', 'ui-1', 'UI Project 1', "./assets/images/portfolio-4.jpg", 'UI Design', 'Cool Design', 'UI number one', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
  ['app', 'app-1', 'App Project 1', "./assets/images/portfolio-5.jpg", 'App Development', 'Game App', 'My first awesome app', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
  ['app', 'app-2', 'App Project 2', "./assets/images/portfolio-6.jpg", 'App Development', 'Gambling App', 'My second amazing app', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
  ['app', 'app-3', 'App Project 3', "./assets/images/portfolio-7.jpg", 'App Development', 'Money App', 'My third phenomenal app', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
  ['ui', 'ui-2', 'UI Project 2', "./assets/images/portfolio-8.jpg", 'UI Design', 'Fantastic Design', 'UI number two', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
]

// Create each portfolio card
for (const arr of portfolioCardAndPopupModalData) {
  document.querySelector('.portfolio-grid').innerHTML += `
  <div class="portfolio-card" data-item=${arr[0]} data-open="${arr[1]}">
    <div class="card-body">
      <img src=${arr[3]} alt="portfolio icon">
      <div class="card-popup-box">
        <div>${arr[4]}</div>
        <h3>${arr[5]}</h3>
      </div>
    </div>
  </div>`
}
/* The Node List of all the 'data-item' values must be created after
all portfolio cards are created because there are no elements with the
'data-item' attribute beforehand, thus negating the ability to filter
using data attributes. */
const portfolioItems = document.querySelectorAll(portfolioData);

// Create each popup modal
function createPopupModal(array) {
  document.querySelector('.popup-modal-container').innerHTML += `
  <div id="${array[1]}" class="modal" data-animation="slideInOutTop">
    <div class="modal-dialog">
      <header class="modal-header">
        <h3>${array[2]}</h3>
        <i class="fas fa-times" data-close></i>
      </header>
      <div class="modal-body">
        <div class="img-wrapper">
          <img src="${array[3]}" alt="portfolio image">
        </div>
        <div class="text-wrapper">
          <p><strong>${array[6]}</strong></p>
          <p>${array[7]}</p>
          <p>${array[8]}</p>
        </div>
      </div>
    </div>
  </div>`
}

const openModal = document.querySelectorAll(modalOpen);
let closeModal = document.querySelectorAll(modalClose);

/* Theme */
// Switches which theme switcher button is active.
const setActive = (elm, selector) => {
  if (document.querySelector(`${selector}.${active}`) !== null) {
    document.querySelector(`${selector}.${active}`).classList.remove(active);
  }
  elm.classList.add(active);
};

const setTheme = (val) => {
  if (val === dark) {
    // Adds the data attribute: data-theme='dark'
    root.setAttribute(dataTheme, dark);
    localStorage.setItem(theme, dark);
  } else {
    root.setAttribute(dataTheme, light);
    localStorage.setItem(theme, light);
  }
};

/* Checks the current theme when the page loads and puts the 'active'
class on the appropriate theme button. */
if (currentTheme) {
  root.setAttribute(dataTheme, currentTheme);
  switcher.forEach((btn) => {
    btn.classList.remove(active);
  });

  if (currentTheme === dark) {
    switcher[1].classList.add(active);
  } else {
    switcher[0].classList.add(active);
  }
}

toggleTheme.addEventListener('click', function() {
  const tab = this.parentElement.parentElement;
  if (!tab.className.includes(open)) {
    tab.classList.add(open);
  } else {
    tab.classList.remove(open);
  }
});

// Theme switcher buttons
for (const elm of switcher) {
  elm.addEventListener('click', function() {
    const toggle = this.dataset.toggle;
    setActive(elm, switcherBtn);
    setTheme(toggle);
  });
}

// Portfolio
searchBox.addEventListener('keyup', e => {
  // This assigns the value inside the search bar to 'searchInput'.
  const searchInput = e.target.value.toLowerCase().trim(); // .trim() removes spaces.
  portfolioItems.forEach((card) => {
    // If any of the data attributes include the searched value then display it.
    if (card.dataset.item.includes(searchInput)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  })
});

/* Adds the 'active' class to the portfolio filter headings when clicked
and displays the appropriate cards. */
for (const link of filterLink) {
  link.addEventListener('click', function() {
    setActive(link, '.filter-link')
    // 'this' refers to 'link'.
    const filter = this.dataset.filter;
    portfolioItems.forEach((card) => {
      if (filter === 'all') {
        card.style.display = 'block';
      } else if (card.dataset.item === filter) {
        /* This adds the 'display: block' attribute to the card if the
        data attribute matches the filtered attribute. */
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// Adds an event listener to all modals' X so that it can be used to exit.
function activateX() {
  for (const elm of closeModal) {
    elm.addEventListener('click', function() {
      // '.parentElement' grabs the parent element of the element in question.
      this.parentElement.parentElement.parentElement.classList.remove(isVisible);
      document.querySelector('.popup-modal-container').innerHTML = '';
    });
  }
}
activateX();

// Full Site Modal "open buttons"
for (const elm of openModal) {
  elm.addEventListener('click', function() {
    // 'this' refers to 'elm' which is the list items in the HTML document in the navbar.
    // 'dataset' refers to the data attributes and 'open' is the data attribute that we want to access.
    const modalId = this.dataset.open; // This will return the value of the data attribute.

    if (elm.classList[0] === 'portfolio-card') {
      for (const data of portfolioCardAndPopupModalData) {
        if (data.includes(elm.dataset.open)) {
          createPopupModal(data);
          closeModal = document.querySelectorAll(modalClose);
          activateX();
        }
      }
    }
    // The data attributes on the list items in the navbar match the id of the associated modals.
    document.getElementById(modalId).classList.add(isVisible);
  });
}

document.addEventListener('click', e => {
  if (e.target === document.querySelector('.modal.is-visible')) {
    document.querySelector('.modal.is-visible').classList.remove(isVisible);
    document.querySelector('.popup-modal-container').innerHTML = '';
  }
});

// 'keyup' listens for a key to be pressed on the keyboard.
document.addEventListener('keyup', e => {
  if (e.key === 'Escape') {
    document.querySelector('.modal.is-visible').classList.remove(isVisible);
    document.querySelector('.popup-modal-container').innerHTML = '';
  }
});
