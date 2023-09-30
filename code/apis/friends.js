const discordUserIds = [
  // example user IDs
  '669956621618642985', // vulpy
  '535185683325648904', // meow
  '906701264887382027', // Danny
  '768656516885774371', // prax
  '984835890608230430', // vin
  '1035262868586766376', // Ben
  '503676030536646716' // ashy
];

function calculateLuminance(hexColor) {
  // Remove the '#' if it exists
  hexColor = hexColor.replace(/^#/, '');

  // Calculate the relative luminance using the formula for sRGB color space
  const r = parseInt(hexColor.slice(0, 2), 16) / 255;
  const g = parseInt(hexColor.slice(2, 4), 16) / 255;
  const b = parseInt(hexColor.slice(4, 6), 16) / 255;

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luminance;
}

function setTextColorAndLinkColorBasedOnLuminance(container, hexColor) {
  // Set the text color based on luminance
  const textColor = calculateLuminance(hexColor) > 0.5 ? 'black' : 'white';
  container.style.color = textColor;

  // Set the link (a element) color
  const links = container.querySelectorAll('a');
  links.forEach(link => {
    link.style.color = textColor;
  });
}

function fetchDataAndUpdateLocalStorage() {
  console.log('🐛 Fetching friends data...');

  Promise.all(discordUserIds.map(id => fetch(`https://lookup.choccymilk.uk/api?id=${id}`)))
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(data => {
      console.log('Data fetched! :D'); // Log when data is fetched successfully
      const timestamp = Date.now();
      const savedData = { data, timestamp };
      localStorage.setItem('discordFriends', JSON.stringify(savedData));

      // generate friend elements
      const friendsContainers = document.querySelectorAll('#friends_inner');
      friendsContainers.forEach(friendsContainer => {
        data.forEach(friendData => {
          const id = friendData.id;
          const container = document.createElement('div');
          container.setAttribute('id', 'friends_container');
          container.style.backgroundColor = friendData.banner_color;

          const avatar = document.createElement('img');
          avatar.setAttribute('src', friendData.avatar);
          avatar.setAttribute('id', 'friends_avatar');
          avatar.setAttribute('loading', 'lazy');
          avatar.setAttribute('class', 'disabledrag');

          const name = document.createElement('h6');
          name.textContent = friendData.global_name;
          name.setAttribute('class', 'friends_name');
          name.title = friendData.global_name;

          container.appendChild(avatar);
          container.appendChild(name);

          // Set the text color and link color based on luminance
          setTextColorAndLinkColorBasedOnLuminance(container, friendData.banner_color);

          if (id === '1035262868586766376') {
            const link = document.createElement('a');
            link.href = 'https://benreyland.crd.co';
            link.textContent = friendData.global_name;
            link.target = '_blank';
            name.textContent = '';
            name.appendChild(link);

            // Set the link (a element) color based on luminance
            setTextColorAndLinkColorBasedOnLuminance(link, friendData.banner_color);
          }

          friendsContainer.appendChild(container);
        });
      });

      const timeUntilNextFetch = (timestamp - Date.parse(localStorage.getItem('discordFriends').timestamp)) / 1000;
      console.log(`Next fetch in ${12 * 3600 - timeUntilNextFetch} seconds.`);
    })
    .catch(error => console.error(error));
}

// Check if there is cached data in localStorage and it's less than 12 hours old
const savedData = JSON.parse(localStorage.getItem('discordFriends'));

if (!savedData || Date.now() - savedData.timestamp >= 12 * 3600 * 1000) {
  // If no data or data is outdated, fetch and update
  fetchDataAndUpdateLocalStorage();
} else {
  // Use the cached data
  const friendsContainers = document.querySelectorAll('#friends_inner');
  friendsContainers.forEach(friendsContainer => {
    savedData.data.forEach(friendData => {
      const id = friendData.id;
      const container = document.createElement('div');
      container.setAttribute('id', 'friends_container');
      container.style.backgroundColor = friendData.banner_color;

      const avatar = document.createElement('img');
      avatar.setAttribute('src', friendData.avatar);
      avatar.setAttribute('id', 'friends_avatar');
      avatar.setAttribute('loading', 'lazy');
      avatar.setAttribute('class', 'disabledrag');

      const name = document.createElement('h6');
      name.textContent = friendData.global_name;
      name.setAttribute('class', 'friends_name');
      name.title = friendData.global_name;

      container.appendChild(avatar);
      container.appendChild(name);

      // Set the text color and link color based on luminance
      setTextColorAndLinkColorBasedOnLuminance(container, friendData.banner_color);

      if (id === '1035262868586766376') {
        const link = document.createElement('a');
        link.href = 'https://benreyland.crd.co';
        link.textContent = friendData.global_name;
        link.target = '_blank';
        name.textContent = '';
        name.appendChild(link);

        // Set the link (a element) color based on luminance
        setTextColorAndLinkColorBasedOnLuminance(link, friendData.banner_color);
      }

      friendsContainer.appendChild(container);
    });
  });

  const timeUntilNextFetch = (Date.now() - savedData.timestamp) / 1000;
  const totalSecondsUntilNextFetch = 12 * 3600 - timeUntilNextFetch;
  const hoursUntilNextFetch = Math.floor(totalSecondsUntilNextFetch / 3600);
  const minutesUntilNextFetch = Math.floor((totalSecondsUntilNextFetch % 3600) / 60);

  console.log(`🐛 Next fetch in ${hoursUntilNextFetch} hours and ${minutesUntilNextFetch} minutes.`);
}

// Schedule periodic updates (every 12 hours)
setInterval(fetchDataAndUpdateLocalStorage, 12 * 3600 * 1000);
