  // Get references to the profile elements
  const version = document.getElementById('version');
  const pfp2 = document.getElementById('version');
  const versionHover = document.getElementById('version_container');

  // Function to toggle the visibility of the profile_hover div
  function toggleVersionHover() {
    if (versionHover.style.display === 'block') {
        versionHover.style.display = 'none';
    } else {
        versionHover.style.display = 'block';
    }
  }

  // Event listener to show or hide profile_hover when clicking on pfp
  pfp2.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevent event bubbling to the document click listener
    toggleVersionHover();
  });

  // Event listener to hide profile_hover when clicking outside the profile or profile_hover
  document.addEventListener('click', function (event) {
    const target = event.target;
    if (target !== profile && target !== versionHover && !profile.contains(target)) {
      hideVersionHover();
    }
  });

  // Function to hide the profile_hover div
  function hideVersionHover() {
    versionHover.style.display = 'none';
  }

  // Function to show the profile_hover div
  function showVersionHover() {
    versionHover.style.display = 'block';
  }