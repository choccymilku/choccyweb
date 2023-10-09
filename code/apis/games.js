// Make a fetch request to the JSON endpoint
fetch('https://games.choccymilk.uk/activity')
  .then(response => response.json())
  .then(data => {
    // Extracting user, activities, and timers from the response
    const { user, activities, timers } = data;

    // Loop through activities
    activities.forEach(activity => {
      const { name, time_lasted } = activity;

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
      fetch(`https://api.rawg.io/api/games?key=${GamesApiKey}&search=${encodeURIComponent(name)}`)
        .then(response => response.json())
        .then(data => {
          // Check if there are results
          if (data.results && data.results.length > 0) {
            const game = data.results[0];
            const imageUrl = game.background_image; // URL of the game image

            // Create an image element and set its source to the retrieved URL
            const gameImage = document.createElement('img');
            gameImage.classList.add('games_image');
            gameImage.src = imageUrl;

            // Append the image to the current activity div
            activityDiv.appendChild(gameImage);
            console.log('Game found');
          } else {
            console.log('Game not found');
          }
        })
        .catch(error => console.error(error));
    });
  })
  .catch(error => console.error(error));


  fetch('https://api.choccymilk.uk/steam-games')
  .then(response => response.json())
  //only log app id if it has a playtime of more than 0
  .then(data => {
    const { games } = data.response;
    games.forEach(game => {
      if (game.playtime_forever > 30) {

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
          steamDiv.appendChild(steamName);
          steamDiv.appendChild(steamTime);
          steamDiv.appendChild(steamImage);
      }
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
