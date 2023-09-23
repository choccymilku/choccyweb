var tabsContainer = document.querySelector('#tabs');
var scrollAmount = 0;
var isScrolling = false;
var isEnabled = true; // Initially enabled

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
  scrollAmount += event.deltaY;

  if (!isScrolling) {
    requestAnimationFrame(scrollTabsContainer);
    isScrolling = true;
  }
}

function scrollTabsContainer() {
  if (!isEnabled) {
    isScrolling = false;
    return;
  }

  tabsContainer.scrollLeft += scrollAmount * 0.1; // Adjust the scroll speed as desired

  scrollAmount *= 0.9; // Adjust the damping factor as desired

  if (Math.abs(scrollAmount) < 0.1) {
    isScrolling = false;
    return;
  }

  requestAnimationFrame(scrollTabsContainer);
}

// Function to check viewport width and enable/disable scroll based on the width
function checkViewportWidth() {
  if (window.innerWidth < 0) {
    disableScroll();
  } else {
    enableScroll();
  }
}

// Initial check when the script is loaded
checkViewportWidth();

// Add a listener to continuously monitor the viewport width and adjust the behavior
window.addEventListener('resize', checkViewportWidth);

// Add the scroll event listener to #tabs container only
tabsContainer.addEventListener('wheel', handleScroll);
