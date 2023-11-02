var scroll2Containers = document.querySelectorAll('#gallery_inner, #tabs');
var scrollAmounts = new Map();
var isScrolling = false;
var isEnabled = true; // Initially enabled
var scrollingContainer = null; // Variable to keep track of the currently scrolling container

function enableScroll() {
  isEnabled = true;
}

function disableScroll() {
  isEnabled = false;
}

function handleScroll(event) {
  if (!isEnabled) {
    return;
  }

  event.preventDefault();

  // Check if any other container is currently scrolling
  if (isScrolling && scrollingContainer !== event.currentTarget) {
    return;
  }

  // Store the current scrolling container
  scrollingContainer = event.currentTarget;

  // Store the scroll amount for the current container
  scrollAmounts.set(scrollingContainer, (scrollAmounts.get(scrollingContainer) || 0) + event.deltaY);

  if (!isScrolling) {
    requestAnimationFrame(scrollScrollContainers);
    isScrolling = true;
  }
}

function scrollScrollContainers() {
  if (!isEnabled) {
    isScrolling = false;
    scrollingContainer = null;
    return;
  }

  // Get the currently scrolling container
  var container = scrollingContainer;

  var scrollAmount = scrollAmounts.get(container) || 0;
  container.scrollLeft += scrollAmount * 0.1; // Adjust the scroll speed as desired
  scrollAmounts.set(container, scrollAmount * 0.9); // Adjust the damping factor as desired

  if (Math.abs(scrollAmounts.get(container)) < 0.1) {
    scrollAmounts.delete(container);
    isScrolling = false;
    scrollingContainer = null;
    return;
  }

  requestAnimationFrame(scrollScrollContainers);
}

// Function to check viewport width and enable/disable scroll based on the width
function checkViewportWidth() {
  if (window.innerWidth < 550) {
    disableScroll();
  } else {
    enableScroll();
  }
}

// Initial check when the script is loaded
checkViewportWidth();

// Add a listener to continuously monitor the viewport width and adjust the behavior
window.addEventListener('resize', checkViewportWidth);

// Add the scroll event listener to all containers with the "scroll-container" class
scroll2Containers.forEach(function(container) {
  container.addEventListener('wheel', handleScroll);
});

var lastfm_recent = document.getElementById('lastfm_recent');
var recent_outer = document.getElementById('lastfm_recent_outer');
var lastfm_top = document.getElementById('lastfm_top');
var lastfm_artist = document.getElementById('lastfm_artist');
var games = document.getElementById('games_data');

var recent_left = document.getElementById('recent_left');
var recent_right = document.getElementById('recent_right');
var top_left = document.getElementById('top_left');
var top_right = document.getElementById('top_right');
var artist_left = document.getElementById('artist_left');
var artist_right = document.getElementById('artist_right');
var games_left = document.getElementById('games_left');
var games_right = document.getElementById('games_right');

var childWidth = 160; // Width of each child element
var recent_isAnimating = false;
var top_isAnimating = false;
var artist_isAnimating = false;
var games_isAnimating = false;

function setupScrolling(container, leftButton, rightButton) {
    var lastfm_recent = document.getElementById(container);
    var recent_left = document.getElementById(leftButton);
    var recent_right = document.getElementById(rightButton);
    var childWidth = 100; // Set your child element width here
    var recent_isAnimating = false;

    lastfm_recent.addEventListener('scroll', function() {
        var maxScrollLeft = lastfm_recent.scrollWidth - lastfm_recent.clientWidth;

        if (lastfm_recent.scrollLeft <= 0) {
            console.log('start ' + container); // Log "start" when it reaches the start
            recent_left.style.cursor = 'context-menu'; // Change cursor to default
            lastfm_recent.scrollLeft = 0; // Prevent scrolling to the left
        } else if (lastfm_recent.scrollLeft >= maxScrollLeft) {
            console.log('end ' + container); // Log "end" when it reaches the end
            recent_right.style.cursor = 'context-menu'; // Change cursor to default
            lastfm_recent.scrollLeft = maxScrollLeft; // Prevent scrolling to the right
        } else {
            recent_left.style.cursor = 'pointer'; // Set cursor to 'pointer' for enabled left button
            recent_right.style.cursor = 'pointer'; // Set cursor to 'pointer' for enabled right button
        }
    });

    lastfm_recent.dispatchEvent(new Event('scroll'));

    recent_left.addEventListener('click', function () {
        scroll(-1);
        recent_left.style.backgroundColor = 'var(--color5)'; // Change left button color when clicked
        recent_right.style.backgroundColor = ''; // Reset right button color
    });

    recent_right.addEventListener('click', function () {
        scroll(1);
        recent_right.style.backgroundColor = 'var(--color5)'; // Change right button color when clicked
        recent_left.style.backgroundColor = ''; // Reset left button color
    });

    function scroll(direction) {
        var maxScrollLeft = lastfm_recent.scrollWidth - lastfm_recent.clientWidth;
        if (!recent_isAnimating && ((direction === -1 && lastfm_recent.scrollLeft > 0) || (direction === 1 && lastfm_recent.scrollLeft < maxScrollLeft))) {
            recent_isAnimating = true;
            recent_right.style.backgroundColor = 'var(--color5)'; // Reset right button color
            recent_left.style.backgroundColor = 'var(--color5)'; // Reset left button color
            console.log('Scrolling ' + (direction === -1 ? 'left' : 'right') + ' ' + container);
            var scrollAmount = direction * getVisibleChildren() * childWidth;
            lastfm_recent.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
            setTimeout(function() {
                recent_isAnimating = false;
                recent_right.style.backgroundColor = ''; // Reset right button color
                recent_left.style.backgroundColor = ''; // Reset left button color
            }, 500);
        }
    }

    function getVisibleChildren() {
        return Math.floor(lastfm_recent.clientWidth / childWidth);
    }
}

// check if device is mobile
var isMobile = false;
if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)) {
    isMobile = true;
    const container = document.querySelectorAll('.data_move');
    recent_left.style.display = 'none';
    recent_right.style.display = 'none';
    top_left.style.display = 'none';
    top_right.style.display = 'none';
    artist_left.style.display = 'none';
    artist_right.style.display = 'none';
    games_left.style.display = 'none';
    games_right.style.display = 'none';
    container.forEach(function (container) {
        container.style.marginTop = '0px';
    });
} else {
    setupScrolling('lastfm_recent', 'recent_left', 'recent_right');
setupScrolling('lastfm_top', 'top_left', 'top_right');
setupScrolling('lastfm_artist', 'artist_left', 'artist_right');
setupScrolling('games_data', 'games_left', 'games_right');
}
console.log('🐛 isMobile?: ' + isMobile);