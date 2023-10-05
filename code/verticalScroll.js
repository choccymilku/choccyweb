var scroll2Containers = document.querySelectorAll('.inner_scrollables');
  var scrollAmounts = new Map();
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

    // Store the scroll amount for each container
    scroll2Containers.forEach(function(container) {
      scrollAmounts.set(container, (scrollAmounts.get(container) || 0) + event.deltaY);
    });

    if (!isScrolling) {
      requestAnimationFrame(scrollScrollContainers);
      isScrolling = true;
    }
  }

  function scrollScrollContainers() {
    if (!isEnabled) {
      isScrolling = false;
      return;
    }

    scroll2Containers.forEach(function(container) {
      var scrollAmount = scrollAmounts.get(container) || 0;
      container.scrollLeft += scrollAmount * 0.1; // Adjust the scroll speed as desired
      scrollAmounts.set(container, scrollAmount * 0.9); // Adjust the damping factor as desired

      if (Math.abs(scrollAmounts.get(container)) < 0.1) {
        scrollAmounts.delete(container);
      }
    });

    if (scrollAmounts.size === 0) {
      isScrolling = false;
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

  