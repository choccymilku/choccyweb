const CHANNEl_ID = 'gallery_inner'; // ID of the div to append the images to
const maxRetries = 5; // Maximum number of retries
const retryInterval = 5000; // Retry interval in milliseconds (5 seconds)

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
      data.forEach((item) => {
        // Create an img element
        const img = document.createElement('img');
        img.src = item; // Set the src attribute to the URL
        img.loading = 'lazy'; // Set the loading attribute to "lazy" for lazy loading
        img.classList.add('gallery_image'); // Add the gallery_image class to the img element
  
        // Append the img to the imageData div
        document.getElementById(CHANNEl_ID).appendChild(img);
      });
    })
    .catch((error) => {
      console.error('Max retries reached. Unable to fetch data:', error);
    });
  