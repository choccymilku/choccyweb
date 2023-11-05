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

function setupScrolling(container, leftButton, rightButton) {
    var containers = document.getElementById(container);
    var left = document.getElementById(leftButton);
    var right = document.getElementById(rightButton);
    var childWidth = 160; // Set your child element width here
    var recent_isAnimating = false;

    containers.addEventListener('scroll', function() {
        var maxScrollLeft = containers.scrollWidth - containers.clientWidth;

        if (containers.scrollLeft <= 0) {
            console.log('🐛 start ' + container); // Log "start" when it reaches the start
            left.style.cursor = 'context-menu'; // Change cursor to default
            containers.scrollLeft = 0; // Prevent scrolling to the left
        } else if (containers.scrollLeft >= maxScrollLeft) {
            console.log('🐛 end ' + container); // Log "end" when it reaches the end
            right.style.cursor = 'context-menu'; // Change cursor to default
            right.style.backgroundColor = ''; // Reset right button color
            left.style.backgroundColor = ''; // Reset left button color
            containers.scrollLeft = maxScrollLeft; // Prevent scrolling to the right
        } else {
            left.style.cursor = 'pointer'; // Set cursor to 'pointer' for enabled left button
            right.style.cursor = 'pointer'; // Set cursor to 'pointer' for enabled right button
        }
    });

    containers.dispatchEvent(new Event('scroll'));

    left.addEventListener('click', function () {
        scroll(-1);
        right.style.backgroundColor = ''; // Reset right button color
    });

    right.addEventListener('click', function () {
        scroll(1);
        left.style.backgroundColor = ''; // Reset left button color
    });

    function scroll(direction) {
        var maxScrollLeft = containers.scrollWidth - containers.clientWidth;
        if (!recent_isAnimating && ((direction === -1 && containers.scrollLeft > 0) || (direction === 1 && containers.scrollLeft < maxScrollLeft))) {
            recent_isAnimating = true;
            right.style.backgroundColor = 'var(--color5)'; // Reset right button color
            left.style.backgroundColor = 'var(--color5)'; // Reset left button color
            console.log('🐛 Scrolling ' + (direction === -1 ? 'left' : 'right') + ' ' + container);
            var scrollAmount = direction * getVisibleChildren() * childWidth;
            containers.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
            setTimeout(function() {
                recent_isAnimating = false;
                right.style.backgroundColor = ''; // Reset right button color
                left.style.backgroundColor = ''; // Reset left button color
            }, 500);
        }
    }

    function getVisibleChildren() {
        return Math.floor(containers.clientWidth / childWidth);
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