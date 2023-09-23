  var containers = document.querySelectorAll('#friends_inner, #tabs');
  var scrollAmounts = {};
  var isScrolling = false;
  var isEnabled = true; // Initially enabled

  function enableScroll() {
    isEnabled = true;
  }

  function disableScroll() {
    isEnabled = false;
  }

  function handleScroll(container, event) {
    if (!isEnabled) {
      return;
    }

    event.preventDefault();
    scrollAmounts[container.id] += event.deltaY;

    if (!isScrolling) {
      requestAnimationFrame(function () {
        scrollContainer(container);
      });
      isScrolling = true;
    }
  }

  function scrollContainer(container) {
    if (!isEnabled) {
      isScrolling = false;
      return;
    }

    container.scrollLeft += scrollAmounts[container.id] * 0.1; // Adjust the scroll speed as desired

    scrollAmounts[container.id] *= 0.9; // Adjust the damping factor as desired

    if (Math.abs(scrollAmounts[container.id]) < 0.1) {
      isScrolling = false;
      return;
    }

    requestAnimationFrame(function () {
      scrollContainer(container);
    });
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

  // Add the scroll event listener to each container
  containers.forEach(function (container) {
    scrollAmounts[container.id] = 0;

    container.addEventListener('wheel', function (event) {
      handleScroll(container, event);
    });
  });