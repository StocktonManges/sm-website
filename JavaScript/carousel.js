const slides = document.querySelectorAll('.review-item');
const buttons = document.querySelectorAll('.slide-ctrl-container button');

let current = Math.floor(Math.random() * slides.length);
let next = current < slides.length - 1 ? current + 1 : 0;
let prev = current > 0 ? current - 1 : slides.length - 1;

const dummySlides = [
  // slide 0
  // slide 1
  // slide 2 - current [next] = current + 1
  // slide 3 - next
];

/* create eventListener for prev/next buttons */
// goToNext()
// goToPrev()
// updateIndexes(param)
// updateCSS()

// -- decide how to call prev/next
// -- update variables
// --- [current] = newIndex
// --- [next] current + 1 : 0
// --- [prev] current - 1 : length - 1
// -- update the CSS