const skeletonLoader = document.getElementById('games_loader');
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