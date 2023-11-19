const CHANNEL_IDS = ['#column1', '#column2'];
const mobileColumnId = '#mobile_column';
const maxRetries = 10;
const retryInterval = 2000;

const fetchDataWithRetry = (url, maxRetries, retryInterval) => {
  return new Promise((resolve, reject) => {
    const fetchWithRetry = (retryCount) => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => resolve(data))
        .catch((error) => {
          console.error('Error:', error);
          if (retryCount < maxRetries) {
            console.log('Retrying...');
            setTimeout(() => fetchWithRetry(retryCount + 1), retryInterval);
          } else {
            reject(new Error('Max retries reached. Unable to fetch data.'));
          }
        });
    };

    fetchWithRetry(0);
  });
};

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
    img.src = src;
  });
};

const loadImages = async () => {
  try {
    const data = await fetchDataWithRetry('https://gallerybot-reboot.choccymilku.repl.co/gallery', maxRetries, retryInterval);

    const column1 = document.querySelector(CHANNEL_IDS[0]);
    const column2 = document.querySelector(CHANNEL_IDS[1]);
    const mobileColumn = document.querySelector(mobileColumnId);

    const loadedImages = [];

    for (const item of data) {
      const img = await loadImage(item);

      img.classList.add('gallery_image');
      img.classList.add('disabledrag');

      // Append the image to the corresponding column
      const columnToAppend = loadedImages.length % 2 === 0 ? column1 : column2;
      columnToAppend.appendChild(img);

      // Clone the image and append it to the mobile column
      const mobileImg = img.cloneNode(true);
      mobileColumn.appendChild(mobileImg);

      loadedImages.push(img);
    }

    // All images are loaded, you can add any additional logic here
  } catch (error) {
    console.error('Unable to fetch and load images:', error);
  }
};

// Call the function to load images
loadImages();
