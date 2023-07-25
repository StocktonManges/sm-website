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

/* Portfolio */
const filterLink = document.querySelectorAll(dataFilter);
// Using 'querySelector' to select an id:
const searchBox = document.querySelector('#search');
// Array for createPortfolioCards function.
const portfolioCardData = [
  // data-attribute - image source - div contents - h3 contents
  ['web', "./assets/images/portfolio-1.jpg", 'Web Development', 'Food Website'],
  ['web', "./assets/images/portfolio-2.jpg", 'Web Development', 'Skate Website'],
  ['web', "./assets/images/portfolio-3.jpg", 'Web Development', 'Eating Website'],
  ['ui', "./assets/images/portfolio-4.jpg", 'UI Design', 'Cool Design'],
  ['app', "./assets/images/portfolio-5.jpg", 'App Development', 'Game App'],
  ['app', "./assets/images/portfolio-6.jpg", 'App Development', 'Gambling App'],
  ['app', "./assets/images/portfolio-7.jpg", 'App Development', 'Money App'],
  ['ui', "./assets/images/portfolio-8.jpg", 'UI Design', 'Fantastic Design'],
];

// Create each portfolio card
function createPortfolioCards(array) {
  for (const arr of array) {
    document.querySelector('.portfolio-grid').innerHTML += `
    <div class="portfolio-card" data-item=${arr[0]}>
      <div class="card-body">
        <img src=${arr[1]} alt="portfolio icon">
        <a href="#" class="card-popup-box">
          <div>${arr[2]}</div>
          <h3>${arr[3]}</h3>
        </a>
      </div>
    </div>`
  }
}
createPortfolioCards(portfolioCardData);
/* The Node List of all the 'data-item' values must be created after
createPortfolioCards is called because there are no elements with the
'data-item' attribute beforehand, thus negating the ability to filter
using data attributes. */
const portfolioItems = document.querySelectorAll(portfolioData);

/* Modal */
// 'document.' is a way to query the HTML document.
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

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

// Full Site Modal "open buttons"
for (const elm of openModal) {
  elm.addEventListener('click', function() {
    // 'this' refers to 'elm' which is the list items in the HTML document in the navbar.
    // 'dataset' refers to the data attributes and 'open' is the data attribute that we want to access.
    const modalId = this.dataset.open; // This will return the value of the data attribute.

    // The data attributes on the list items in the navbar match the id of the associated modals.
    document.getElementById(modalId).classList.add(isVisible);
  });
}

for (const elm of closeModal) {
  elm.addEventListener('click', function() {
    // '.parentElement' grabs the parent element of the element in question.
    this.parentElement.parentElement.classList.remove(isVisible);
  });
}
