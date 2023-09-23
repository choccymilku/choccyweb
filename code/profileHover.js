  // Get references to the profile elements
  const profile = document.getElementById('profile');
  const pfp = document.getElementById('pfp');
  const profileHover = document.getElementById('profile_hover');

  // Function to toggle the visibility of the profile_hover div
  function toggleProfileHover() {
    if (profileHover.style.display === 'block') {
      profileHover.style.display = 'none';
    } else {
      profileHover.style.display = 'block';
    }
  }

  // Event listener to show or hide profile_hover when clicking on pfp
  pfp.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevent event bubbling to the document click listener
    toggleProfileHover();
  });

  // Event listener to hide profile_hover when clicking outside the profile or profile_hover
  document.addEventListener('click', function (event) {
    const target = event.target;
    if (target !== profile && target !== profileHover && !profile.contains(target)) {
      hideProfileHover();
    }
  });

  // Function to hide the profile_hover div
  function hideProfileHover() {
    profileHover.style.display = 'none';
  }

  // Function to show the profile_hover div
  function showProfileHover() {
    profileHover.style.display = 'block';
  }