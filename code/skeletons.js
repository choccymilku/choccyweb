
  // create skeleton loaders
  const gallerySkeleton = document.getElementById('skeleton_loader_gallery');
  const projectsSkeleton = document.getElementById('skeleton_loader_projects');
  const friendsSkeleton = document.getElementById('skeleton_loader_friends');
  const lastfmArtistSkeleton = document.getElementById('lastfm_loader_artist');
  const lastfmTopSkeleton = document.getElementById('lastfm_loader_top');
  const gameSkeleton = document.getElementById('games_loader');
  let totalWidthProjects = 0;
  let totalWidthFriends = 0;
  let totalWidth = 0;
  let totalWidthLastfm = 0;
  let totalWidthLastfmTop = 0;
  let totalWidthGame = 0;
  
  for (let i = 0; i < 3; i++) {
    // Generate a random width between 250 and 450 pixels
    const width = Math.floor(Math.random() * (450 - 250 + 1)) + 250;
  
    // Create a div element
    const gallerySkeletonImage = document.createElement('div');
    gallerySkeletonImage.classList.add('skeleton_loader_gallery_image');
    gallerySkeletonImage.style.width = `${width}px`; // Set the width of the div

    // if window is less than 1000px, set the width to 1000px
    if (window.innerWidth < 550) {
      gallerySkeletonImage.style.height = `${width}px`;
      gallerySkeletonImage.style.width = `calc(100% - 5px)`;
      gallerySkeletonImage.style.marginBottom = `5px`;

      const skeleton_loader_gallery = document.getElementById('skeleton_loader_gallery');
      skeleton_loader_gallery.style.display = `block`;
    }
  
    // Append the div to the skeleton_loader_gallery container
    gallerySkeleton.appendChild(gallerySkeletonImage);
  
    // Update total width
    totalWidth += width;
  } 

  for (let i = 0; i < 6; i++) {

    const height = Math.floor(Math.random() * (450 - 250 + 1)) + 250;
    // Create a div element
    const projectsSkeletonImage = document.createElement('div');
    projectsSkeletonImage.classList.add('skeleton_loader_projects_image');
    projectsSkeletonImage.style.width = `100%`;
    projectsSkeletonImage.style.height = `${height}px`;
    projectsSkeletonImage.style.marginBottom = `5px`;


  
    // Append the div to the skeleton_loader_gallery container
    projectsSkeleton.appendChild(projectsSkeletonImage);
  
    // Update total width
    totalWidthProjects += height;
  }

  for (let i = 0; i < 8; i++) {
    // Create a div element
    const friendsSkeletonImage = document.createElement('div');
    friendsSkeletonImage.classList.add('skeleton_loader_friends_image');
    friendsSkeletonImage.style.width = `155px`;
    friendsSkeletonImage.style.height = `195px`;
    friendsSkeletonImage.style.marginBottom = `5px`;
  
    // Append the div to the skeleton_loader_gallery container
    friendsSkeleton.appendChild(friendsSkeletonImage);
  }

  for (let i = 0; i < 10; i++) {
    // Create a div element
    const lastfmArtistSkeletonImage = document.createElement('div');
    lastfmArtistSkeletonImage.classList.add('lastfm_loader_top');
  
    // Append the div to the skeleton_loader_gallery container
    lastfmArtistSkeleton.appendChild(lastfmArtistSkeletonImage);
  }

  for (let i = 0; i < 10; i++) {
    // Create a div element
    const lastfmTopSkeletonImage = document.createElement('div');
    lastfmTopSkeletonImage.classList.add('lastfm_loader_top');
  
    // Append the div to the skeleton_loader_gallery container
    lastfmTopSkeleton.appendChild(lastfmTopSkeletonImage);
  }

  for (let i = 0; i < 10; i++) {
    // Create a div element
    const gameSkeletonImage = document.createElement('div');
    gameSkeletonImage.classList.add('lastfm_loader_top');
  
    // Append the div to the skeleton_loader_gallery container
    gameSkeleton.appendChild(gameSkeletonImage);
  }
  
  // Ensure the total width is equal or over 1000 pixels
  if (totalWidth < 1000) {
    // If total width is less than 1000 pixels, adjust the width of a random div to meet the requirement
    const randomIndex = Math.floor(Math.random() * 3);
    const remainingWidth = 1000 - totalWidth;
    const additionalWidth = Math.max(remainingWidth, 250); // Ensure additional width is at least 250 pixels
    gallerySkeleton.children[randomIndex].style.width = `${additionalWidth}px`;
  }