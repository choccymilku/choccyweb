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

fetchDataWithRetry('https://api.choccymilk.uk/server/discord-connect/1132778594704293989-81aa0f0d3c', maxRetries, retryInterval)
  .then((data) => {
    // Assuming data is an array of objects
    data.forEach((item, index) => {
      // Create an img element
      const img = document.createElement('img');
      img.src = item; // Set the src attribute to the URL
      img.loading = 'lazy'; // Set the loading attribute to "lazy" for lazy loading

      // Add the gallery_image class to the img element
      img.classList.add('gallery_image');
      img.classList.add('disabledrag');

      // Append the img to the first div
      const div1 = document.querySelector(CHANNEL_IDS[0]);
      if (div1) {
        div1.appendChild(img);
      }

      // Append the img to the second div with a different class
      const div2 = document.querySelector(CHANNEL_IDS[1]);
      if (div2) {
        const imgClone = img.cloneNode(true); // Clone the img element
        imgClone.classList.remove('gallery_image'); // Remove the initial class
        imgClone.classList.add('gallery_image_full'); // Add a different class
        div2.appendChild(imgClone);
      }
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
    let i;
    let slides = document.getElementsByClassName("gallery_image_full");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
  }

  