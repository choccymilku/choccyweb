const CHANNEL_IDS = ['#gallery_inner', '#gallery_full_images']; // IDs of the divs to append the images to
const maxRetries = 10; // Maximum number of retries
const retryInterval = 2000; // Retry interval in milliseconds (5 seconds)

const fetchDataWithRetry = (url, maxRetries, retryInterval) => {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error:', error);
      if (maxRetries > 0) {
        console.log('Retrying...');
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(fetchDataWithRetry(url, maxRetries - 1, retryInterval));
          }, retryInterval);
        });
      } else {
        throw error; // Maximum retries reached, rethrow the error
      }
    });
};

fetchDataWithRetry('https://gallerybot-reboot.choccymilku.repl.co/gallery', maxRetries, retryInterval)
  .then((data) => {
    // Assuming data is an array of objects
    let numberCount = 1; // Start the numbering from 1
    const promises = [];
    const imagesContainer = document.querySelector(CHANNEL_IDS[0]);
    
    data.forEach((item, index) => {
      const img = new Image(); // Create a new Image element
      const div = document.createElement('div');
      const number = document.createElement('div');
      div.classList.add('gallery_div');
      number.classList.add('gallery_image_number');
      number.innerHTML = numberCount;

      div.appendChild(number);
      div.appendChild(img);

      // Set up the load event listener for the image
      img.onload = () => {
        // Add the gallery_image class to the img element
        img.classList.add('gallery_image');
        img.classList.add('disabledrag');

        // Append the img to the container
        imagesContainer.appendChild(div);

        numberCount++; // Increment the number for the next iteration

        // Check if all images are loaded
        if (numberCount === data.length) {
          // Remove the skeleton loader once all images are loaded
          const skeletonLoader = document.querySelector('#skeleton_loader_gallery');
          const gallery_inner = document.querySelector('#gallery_inner');
          if (skeletonLoader) {
            skeletonLoader.remove();
            gallery_inner.style.overflowY = "scroll";
            gallery_inner.classList.add('inner_scrollables');
          }
        }
      };

      // Set the src attribute to trigger the load event
      img.src = item;
    });
  })
  .catch((error) => {
    console.error('Max retries reached. Unable to fetch data:', error);
  });

// show full view gallery

function updateGalleryVisibility() {
  if (localStorage.getItem('activeTab') === 'tab_gallery') {
    document.getElementById('full_gallery').style.display = "block";
  } else {
    document.getElementById('full_gallery').style.display = "none";
  }
}

// Initial setup
updateGalleryVisibility();

// Set up a timer to continuously check for localStorage changes
setInterval(function() {
  updateGalleryVisibility();
}, 0); // Check every 1 second (adjust as needed)


// switcher for gallery
  let slideIndex = 1;
  showSlides(slideIndex);
  
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  
  function showSlides(n) {
    try {
        let i;
        let slides = document.getElementsByClassName("gallery_image_full");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex-1].style.display = "block";
    } catch (error) {
    }
}

  // toggle full gallery
  function toggleGallery() {
    var galleryInner = document.getElementById('gallery_full_view');
    var fullGallery = document.getElementById('full_gallery');
    var fullGallery2 = document.getElementById('full_gallery2');
    
    if (galleryInner.style.display === "none" || galleryInner.style.display === "") {
      galleryInner.style.display = "block";
    } else {
      galleryInner.style.display = "none";
    }
  }

  // close full gallery
  function closeGallery() {
    var galleryInner = document.getElementById('gallery_full_view');
    var fullGallery2 = document.getElementById('full_gallery2');
    
    galleryInner.style.display = "none";
    // Add CSS changes for #full_gallery2 when the gallery is turned off
    fullGallery2.style.backgroundColor = ""; // Reset background color for full_gallery2
  }

  // Add click event listener to the full_gallery element
  document.getElementById('full_gallery').addEventListener('click', toggleGallery);

  // Add click event listener to the full_gallery2 element
  document.getElementById('full_gallery2').addEventListener('click', closeGallery);
  