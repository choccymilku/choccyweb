const skeletonLoader = document.getElementById('games_loader');

/* // Make a fetch request to the JSON endpoint
fetch('https://api.choccymilk.uk/activity')
  .then(response => response.json())
  .then(data => {
    // Extracting user, activities, and timers from the response
    const { user, activities, timers } = data;
    console.log('🐛 activity:', data);

    // Loop through activities
    activities.forEach(activity => {
      const { name, time_lasted } = activity;

      // if activity = "Custom Status", don't display it
      if (name === "Custom Status") {
        return;
      }

      // Convert time from milliseconds to various units
      const millisecondsPerSecond = 1000;
      const secondsPerMinute = 60;
      const minutesPerHour = 60;
      const hoursPerDay = 24;
      const daysPerWeek = 7;
      const weeksPerMonth = 4.34524; // Average weeks in a month
      const monthsPerYear = 12;

      const totalSeconds = Math.ceil(time_lasted / millisecondsPerSecond);
      const seconds = totalSeconds % secondsPerMinute;
      const totalMinutes = Math.floor(totalSeconds / secondsPerMinute);
      const minutes = totalMinutes % minutesPerHour;
      const totalHours = Math.floor(totalMinutes / minutesPerHour);
      const hours = totalHours % hoursPerDay;
      const totalDays = Math.floor(totalHours / hoursPerDay);
      const days = totalDays % daysPerWeek;
      const totalWeeks = Math.floor(totalDays / daysPerWeek);
      const weeks = totalWeeks % weeksPerMonth;
      const totalMonths = Math.floor(totalWeeks / weeksPerMonth);
      const months = totalMonths % monthsPerYear;
      const years = Math.floor(totalMonths / monthsPerYear);

      // Construct the formatted time string
      let formattedTime = '';
      if (years > 0) formattedTime += `${years}y `;
      if (months > 0) formattedTime += `${months}mo `;
      if (weeks > 0) formattedTime += `${weeks}w `;
      if (days > 0) formattedTime += `${days}d `;
      if (hours > 0) formattedTime += `${hours}h `;
      if (minutes > 0) formattedTime += `${minutes}m `;
      if (seconds > 0) formattedTime += `${seconds}s`;

      // Create a new div element for the current activity
      const activityDiv = document.createElement('div');
      activityDiv.className = 'games_activity';
      activityDiv.innerHTML = `
        <div class="games_name">${name}</div>
        <div class="games_lasted">${formattedTime}</div>
      `;

      // Append the activity div to games_data div
      const gamesDataContainer = document.getElementById('games_data');
      gamesDataContainer.appendChild(activityDiv);

      // Fetch game image using the name
      fetch(`https://api.choccymilk.uk/rawg?name=${encodeURIComponent(name)}`)
        .then(response => response.json())
        .then(data => {
          console.log('🐛 images:', data);
          // Check if the response contains the imageUrl property
          if (data.imageUrl) {
            const imageUrl = data.imageUrl;
      
            // Create an image element and set its source to the retrieved URL
            const gameImage = document.createElement('img');
            gameImage.classList.add('games_image');
            gameImage.src = imageUrl;
      
            // Append the image to the current activity div
            activityDiv.appendChild(gameImage);
            console.log('🐛 game found');
          } else {
            console.log('🐛 game not found');
          }
        })
        .catch(error => console.error(error));
    });
  })
  .catch(error => console.error(error))
  .finally(() => {
    // Remove the skeleton loader once the first fetch operation is completed
    if (skeletonLoader) {
      skeletonLoader.remove();
    }
  }); */
  let steamGamesList = []; // Create an empty array to store game objects

  fetch('https://api.choccymilk.uk/steam-games')
  .then(response => response.json())
  .then(data => {
    const { games } = data.response;
    
    // Filter and sort games by playtime
    const filteredGames = games.filter(game => game.playtime_forever > 30 && game.name !== "Wallpaper Engine");
    filteredGames.sort((a, b) => b.playtime_forever - a.playtime_forever);
    
    // Keep only the top 10 games
    const topGames = filteredGames.slice(0, 10);

    topGames.forEach(game => {

        // convert playtime to hours and minutes
        function convertPlaytime(playtimeInMinutes) {
            if (playtimeInMinutes >= 60) {
                const hours = Math.floor(playtimeInMinutes / 60);
                const minutes = playtimeInMinutes % 60;
                return `${hours}h ${minutes}m`;
            } else {
                return `${playtimeInMinutes}m`;
            }
        }
          // create divs for each game
          const steamDiv = document.createElement('div');
      steamDiv.className = 'games_activity';
      const playtime = convertPlaytime(game.playtime_forever);
  
      // name
      const steamName = document.createElement('div');
      steamName.innerHTML = game.name;
      steamName.className = 'games_name';
  
      // time played
      const steamTime = document.createElement('div');
      steamTime.innerHTML = playtime;
      steamTime.className = 'games_lasted';
  
      // image
      const steamImage = document.createElement('img');
      steamImage.src = `https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/header.jpg`;
      steamImage.className = 'games_image';
  
      // append to games_data div
      const steamDataContainer = document.getElementById('games_data');
      steamDataContainer.appendChild(steamDiv);
      steamDiv.appendChild(steamImage);
      steamDiv.appendChild(steamName);
      steamDiv.appendChild(steamTime);
      steamGamesList.push(game);
    });
  })
  .finally(() => {
    // Remove the skeleton loader once the second fetch operation is completed
    if (skeletonLoader) {
      skeletonLoader.remove();
    }
    console.log('📅 steam games:', steamGamesList);
  });