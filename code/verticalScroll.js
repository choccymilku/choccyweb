var friendsContainer = document.querySelector('#friends_inner, #gallery_inner');
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
    requestAnimationFrame(scrollFriendsContainer);
    isScrolling = true;
  }
}

function scrollFriendsContainer() {
  if (!isEnabled) {
    isScrolling = false;
    return;
  }

  friendsContainer.scrollLeft += scrollAmount * 0.1; // Adjust the scroll speed as desired

  scrollAmount *= 0.9; // Adjust the damping factor as desired

  if (Math.abs(scrollAmount) < 0.1) {
    isScrolling = false;
    return;
  }

  requestAnimationFrame(scrollFriendsContainer);
}

// Function to check viewport width and enable/disable scroll based on the width
function checkViewportWidth() {
  if (window.innerWidth < 580) {
    disableScroll();
  } else {
    enableScroll();
  }
}

// Initial check when the script is loaded
checkViewportWidth();

// Add a listener to continuously monitor the viewport width and adjust the behavior
window.addEventListener('resize', checkViewportWidth);

// Add the scroll event listener to #friends_inner container only
friendsContainer.addEventListener('wheel', handleScroll);
