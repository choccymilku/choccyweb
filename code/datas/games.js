let steamGamesList = []; // Create an empty array to store game objects

fetch('https://api.choccymilk.uk/steam-games')
.then(response => response.json())
.then(data => {
    const { games } = data.response;
    
    // get time from all games
    const totalPlaytime = games.reduce((accumulator, game) => accumulator + game.playtime_forever, 0);
    const totalPlaytimeDiv = document.getElementById('games_user');

    // Calculate weeks, days, hours, and remaining minutes
    const weeks = Math.floor(totalPlaytime / (60 * 24 * 7));
    const remainingMinutes = totalPlaytime % (60 * 24 * 7);
    const days = Math.floor(remainingMinutes / (60 * 24));
    const hours = Math.floor((remainingMinutes % (60 * 24)) / 60);
    const minutes = remainingMinutes % 60;

    // Build the formatted string
    let formattedPlaytime = '';
    if (weeks > 0) {
        formattedPlaytime += `<span class="info_large">${weeks} week${weeks > 1 ? 's' : ''}</span>`;
        if (days > 0 || (hours > 0 && minutes > 0)) {
            formattedPlaytime += ', ';
        } else if (days === 0 && (hours > 0 || minutes > 0)) {
            formattedPlaytime += ' and ';
        }
    }
    if (days > 0) {
        formattedPlaytime += `<span class="info_large">${days} day${days > 1 ? 's' : ''}</span>`;
        if (hours > 0 && minutes > 0) {
            formattedPlaytime += ', ';
        } else if (hours > 0 || minutes > 0) {
            formattedPlaytime += ' and ';
        }
    }
    if (hours > 0) {
        formattedPlaytime += `<span class="info_large">${hours} hour${hours > 1 ? 's' : ''}</span>`;
        if (minutes > 0) {
            formattedPlaytime += ' and ';
        }
    }
    if (minutes > 0 || (weeks === 0 && days === 0 && hours === 0 && formattedPlaytime === '')) {
        formattedPlaytime += `<span class="info_large">${minutes} minute${minutes > 1 ? 's' : ''}</span>`;
    }

    totalPlaytimeDiv.innerHTML = `played for ${formattedPlaytime}`;
    totalPlaytimeDiv.style.fontFamily = "Rubik";
 
    // Filter and sort games by playtime
    const filteredGames = games.filter(game => game.playtime_forever > 30 && game.name !== "Wallpaper Engine");
    filteredGames.sort((a, b) => b.playtime_forever - a.playtime_forever);
    
    // Keep only the top 10 games
    const topGames = filteredGames.slice(0, 10);

    // Get the steamDataContainer after fetching data
    const steamDataContainer = document.getElementById('games_data');
    steamDataContainer.innerHTML = '';

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

        const playtime = convertPlaytime(game.playtime_forever);

        // create divs for each game
        const steamDiv = document.createElement('a');
        steamDiv.className = 'data_container';  
        
        // name
        const steamName = document.createElement('div');
        steamName.innerHTML = game.name;
        steamName.className = 'data_top_name';

        const steamPlaytime = document.createElement('div');
        steamPlaytime.innerHTML = playtime;
        steamPlaytime.className = 'data_bottom_name';
  
        // image
        const steamLink = document.createElement('a');
        steamLink.href = `https://store.steampowered.com/app/${game.appid}`;
        steamLink.target = '_blank';
        steamLink.classList.add('data_link');

        const steamImage = document.createElement('img');
        steamImage.src = `https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/header.jpg`;
        steamImage.className = 'data_image';

        // append link to image
        steamLink.appendChild(steamImage);
        steamDiv.appendChild(steamLink);


/*         const steamImageLoader = document.createElement('div');
        steamImageLoader.style.background = "linear-gradient(90deg, var(--color3), var(--color5), var(--color3))";
        steamImageLoader.style.backgroundSize = "200% 100%";
        steamImageLoader.style.animation = "gradientAnimation 1.5s ease infinite forwards";
        steamImageLoader.style.height = "155px";
        steamImageLoader.style.marginBottom = "5px";
        steamImageLoader.style.borderTopRightRadius = "8px";
        steamImageLoader.style.borderTopLeftRadius = "8px"; */


        steamDataContainer.appendChild(steamDiv);
        steamDiv.appendChild(steamName);
        steamDiv.appendChild(steamPlaytime);
        steamGamesList.push(game);
    })
    .catch(error => {
      document.getElementById('games_outer').innerHTML = `<img src="../styles/bwomp.png" class="bwomp" /><span>something went horribly wrong, have a sad spongebob png.</span>`;
      document.getElementById('games_outer').style.marginBottom = "-10px";
      document.getElementById('games_outer').style.fontFamily = "SourceCode";
    })
    .finally(() => {
        console.log('📅 steam games:', steamGamesList);
    });
});