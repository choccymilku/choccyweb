const discordUserIds = [
  // example user IDs
  '669956621618642985', // vulpy
  '535185683325648904', // meow
  '906701264887382027', // Danny
  '768656516885774371', // prax
  '984835890608230430', // vin
  '1035262868586766376', // Ben
  '981935028751695943',  // nari
  '503676030536646716' // ashy
];

function fetchDataAndUpdateLocalStorage() {
  console.log('🐛 Fetching friends data...');

  const skeletonLoaderFriends = document.getElementById('skeleton_loader_friends');

  Promise.all(discordUserIds.map(id => fetch(`https://api.choccymilk.uk/lookup/${id}`)))
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(data => {
      console.log('Data fetched! :D');
      const timestamp = Date.now();
      const savedData = { data, timestamp };
      localStorage.setItem('discordFriends', JSON.stringify(savedData));

      const friendsContainers = document.querySelectorAll('#friends_inner');
      friendsContainers.forEach(friendsContainer => {
        data.forEach(friendData => {
          const id = friendData.id;
          const container = document.createElement('div');
          container.setAttribute('id', 'friends_container');

          const avatar = document.createElement('img');
          avatar.setAttribute('src', `https://cdn.discordapp.com/avatars/${id}/${user.avatar}?size=512`);
          avatar.setAttribute('id', 'friends_avatar');
          avatar.setAttribute('loading', 'lazy');
          avatar.setAttribute('class', 'disabledrag');
          avatar.onerror = function() {
            avatar.src = '../styles/blank.png';
          };

          const name = document.createElement('h6');
          name.textContent = friendData.global_name;
          name.setAttribute('class', 'friends_name');
          name.title = friendData.global_name;

          container.appendChild(avatar);
          container.appendChild(name);

          if (id === '1035262868586766376') {
            const link = document.createElement('a');
            link.href = 'https://benreyland.crd.co';
            link.textContent = friendData.global_name;
            link.target = '_blank';
            name.textContent = '';
            name.appendChild(link);
          }

          friendsContainer.appendChild(container);
        });
      });

      const timeUntilNextFetch = (timestamp - Date.parse(localStorage.getItem('discordFriends').timestamp)) / 1000;
      console.log(`Next fetch in ${12 * 3600 - timeUntilNextFetch} seconds.`);

      // Remove the skeleton loader element from the DOM
      if (skeletonLoaderFriends) {
        skeletonLoaderFriends.remove();
        console.log('🐛 Skeleton loader removed.');
      }
    })
    .catch(error => console.error(error));
}

const savedData = JSON.parse(localStorage.getItem('discordFriends'));
const skeletonLoaderFriends = document.getElementById('skeleton_loader_friends');

if (!savedData || Date.now() - savedData.timestamp >= 12 * 3600 * 1000) {
  fetchDataAndUpdateLocalStorage();
} else {
  const friendsContainers = document.querySelectorAll('#friends_inner');
  friendsContainers.forEach(friendsContainer => {
    savedData.data.forEach(friendData => {
      const id = friendData.id;
      const container = document.createElement('div');
      container.setAttribute('id', 'friends_container');

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

      if (id === '1035262868586766376') {
        const link = document.createElement('a');
        link.href = 'https://benreyland.crd.co';
        link.textContent = friendData.global_name;
        link.target = '_blank';
        name.textContent = '';
        name.appendChild(link);
      }

      friendsContainer.appendChild(container);

            // Remove the skeleton loader element from the DOM
            if (skeletonLoaderFriends) {
              skeletonLoaderFriends.remove();
              console.log('🐛 Skeleton loader removed.');
            }
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
