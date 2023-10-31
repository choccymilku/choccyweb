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

recent_left.addEventListener('click', function () {
    if (!recent_isAnimating) {
        recent_isAnimating = true;
        recent_left.style.backgroundColor = 'var(--color5)'; // Change button color
        recent_right.style.backgroundColor = 'var(--color5)'; // Change button color
        var visibleChildren = getChildren();
        var scrollAmount = visibleChildren * childWidth;
        if (lastfm_recent.scrollLeft > 0) {
            lastfm_recent.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
        setTimeout(function() {
            recent_isAnimating = false;
            recent_left.style.backgroundColor = ''; // Change button color back to default
            recent_right.style.backgroundColor = ''; // Change button color back to default
        }, 500); // Set a timeout of 500ms to prevent rapid scrolling
    }
});

recent_right.addEventListener('click', function () {
    if (!recent_isAnimating) {
        recent_isAnimating = true;
        recent_left.style.backgroundColor = 'var(--color5)'; // Change button color
        recent_right.style.backgroundColor = 'var(--color5)'; // Change button color
        var visibleChildren = getChildren();
        var maxScrollLeft = lastfm_recent.scrollWidth - lastfm_recent.clientWidth;
        var scrollAmount = visibleChildren * childWidth;
        if (lastfm_recent.scrollLeft < maxScrollLeft) {
            lastfm_recent.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
        setTimeout(function() {
            recent_isAnimating = false;
            recent_left.style.backgroundColor = ''; // Change button color back to default
            recent_right.style.backgroundColor = ''; // Change button color back to default
        }, 500); // Set a timeout of 500ms to prevent rapid scrolling
    }
});

top_left.addEventListener('click', function () {
    if (!top_isAnimating) {
        top_isAnimating = true;
        top_left.style.backgroundColor = 'var(--color5)'; // Change button color
        top_right.style.backgroundColor = 'var(--color5)'; // Change button color
        var visibleChildren = getChildren();
        var scrollAmount = visibleChildren * childWidth;
        if (lastfm_top.scrollLeft > 0) {
            lastfm_top.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
        setTimeout(function() {
            top_isAnimating = false;
            top_left.style.backgroundColor = ''; // Change button color back to default
            top_right.style.backgroundColor = ''; // Change button color back to default
        }, 500); // Set a timeout of 500ms to prevent rapid scrolling
    }
});

top_right.addEventListener('click', function () {
    if (!top_isAnimating) {
        top_isAnimating = true;
        top_left.style.backgroundColor = 'var(--color5)'; // Change button color
        top_right.style.backgroundColor = 'var(--color5)'; // Change button color
        var visibleChildren = getChildren();
        var maxScrollLeft = lastfm_top.scrollWidth - lastfm_top.clientWidth;
        var scrollAmount = visibleChildren * childWidth;
        if (lastfm_top.scrollLeft < maxScrollLeft) {
            lastfm_top.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
        setTimeout(function() {
            top_isAnimating = false;
            top_left.style.backgroundColor = ''; // Change button color back to default
            top_right.style.backgroundColor = ''; // Change button color back to default
        }, 500); // Set a timeout of 500ms to prevent rapid scrolling
    }
});

artist_left.addEventListener('click', function () {
    if (!artist_isAnimating) {
        artist_isAnimating = true;
        artist_left.style.backgroundColor = 'var(--color5)'; // Change button color
        artist_right.style.backgroundColor = 'var(--color5)'; // Change button color
        var visibleChildren = getChildren();
        var scrollAmount = visibleChildren * childWidth;
        if (lastfm_artist.scrollLeft > 0) {
            lastfm_artist.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
        setTimeout(function() {
            artist_isAnimating = false;
            artist_left.style.backgroundColor = ''; // Change button color back to default
            artist_right.style.backgroundColor = ''; // Change button color back to default
        }, 500); // Set a timeout of 500ms to prevent rapid scrolling
    }
});

artist_right.addEventListener('click', function () {
    if (!artist_isAnimating) {
        artist_isAnimating = true;
        artist_left.style.backgroundColor = 'var(--color5)'; // Change button color
        artist_right.style.backgroundColor = 'var(--color5)'; // Change button color
        var visibleChildren = getChildren();
        var maxScrollLeft = lastfm_artist.scrollWidth - lastfm_artist.clientWidth;
        var scrollAmount = visibleChildren * childWidth;
        if (lastfm_artist.scrollLeft < maxScrollLeft) {
            lastfm_artist.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
        setTimeout(function() {
            artist_isAnimating = false;
            artist_left.style.backgroundColor = ''; // Change button color back to default
            artist_right.style.backgroundColor = ''; // Change button color back to default
        }, 500); // Set a timeout of 500ms to prevent rapid scrolling
    }
});

games_left.addEventListener('click', function () {
    if (!games_isAnimating) {
        games_isAnimating = true;
        games_left.style.backgroundColor = 'var(--color5)'; // Change button color
        games_right.style.backgroundColor = 'var(--color5)'; // Change button color
        var visibleChildren = getChildren();
        var scrollAmount = visibleChildren * childWidth;
        if (games.scrollLeft > 0) {
            games.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
        setTimeout(function() {
            games_isAnimating = false;
            games_left.style.backgroundColor = ''; // Change button color back to default
            games_right.style.backgroundColor = ''; // Change button color back to default
        }, 500); // Set a timeout of 500ms to prevent rapid scrolling
    }
});

games_right.addEventListener('click', function () {
    if (!games_isAnimating) {
        games_isAnimating = true;
        games_left.style.backgroundColor = 'var(--color5)'; // Change button color
        games_right.style.backgroundColor = 'var(--color5)'; // Change button color
        var visibleChildren = getChildren();
        var maxScrollLeft = games.scrollWidth - games.clientWidth;
        var scrollAmount = visibleChildren * childWidth;
        if (games.scrollLeft < maxScrollLeft) {
            games.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
        setTimeout(function() {
            games_isAnimating = false;
            games_left.style.backgroundColor = ''; // Change button color back to default
            games_right.style.backgroundColor = ''; // Change button color back to default
        }, 500); // Set a timeout of 500ms to prevent rapid scrolling
    }
});

function getChildren() {
    var children = lastfm_recent.children;
    var visibleChildren = 0;
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var rect = child.getBoundingClientRect();
        if (rect.right <= recent_outer.getBoundingClientRect().right && rect.left >= recent_outer.getBoundingClientRect().left) {
            visibleChildren++;
        }
    }
    return visibleChildren;
}
