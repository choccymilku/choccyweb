let ws;
let connected = false;
let reconnectTimeout;

function connect() {
  ws = new WebSocket('wss://api.lanyard.rest/socket');

  ws.addEventListener('open', () => {
    ws.send(JSON.stringify({
      op: 2,
      d: {
        subscribe_to_id: discord_user_id
      }
    }));
    connected = true;
  });

  ws.addEventListener('error', event => {
    console.error('WebSocket error', event);
  });

  ws.addEventListener('close', event => {
    console.log('📰 lanyard WebSocket disconnected!');
    connected = false;
    reconnectTimeout = setTimeout(() => connect(), 0);
  });

  ws.addEventListener('message', event => {
    const data = JSON.parse(event.data);
    console.log('📰 lanyard API call successful! fetching API data', data);
    if (data.op === 0) {
      updateStatus(data.d);
    }
  });
}

function startWebSocket() {
  if (!connected) {
    connect();
  }
}

function stopWebSocket() {
  if (connected) {
    ws.close();
    clearTimeout(reconnectTimeout);
    connected = false;
  }
}

// Start the WebSocket connection
startWebSocket();

function updateStatus(data) {

  const discordUser = data.discord_user;
  const avatarUrl = `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.${avatarFormat}?size=${avatarSize}`;
  
  const avatarLinkElement = document.getElementById('pfp_link');
  avatarLinkElement.href = `https://discordapp.com/users/${discordUser.id}`;
  avatarLinkElement.innerHTML = '<i class="fa-brands fa-discord" class="icon-style"></i>' + '<span class="connection-name" style="margin-left: 2px;">' + discordUser.username + '</span>';
  avatarLinkElement.target = '_blank';

  const avatarImg = document.getElementById('pfp');
  avatarImg.src = avatarUrl;

    async function getToken() {
      try {
          const response = await fetch("https://api.choccymilk.uk/spotify");
          const data = await response.json();
          spotifyToken = data.accessToken;
      } catch (error) {
          console.error("Error fetching Spotify token:", error);
          // Handle the error, retry the request, or perform other actions as necessary
      }
  }

  function fetchRecentSongsFromLastFM() {
    try {
        fetch(`https://api.choccymilk.uk/lastfm-recent`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log("📅 recent songs - last.fm", data);
            // Get the first 10 tracks
            const recentTracks = data.recenttracks.track;
            displayRecentTracks(recentTracks);
        })
        .catch(error => {
            console.error("Error fetching recently listened tracks from Last.fm API:", error);
            // Handle the error, retry the request, or perform other actions as necessary
        });

        function fetchSpotifyImage(trackName, artistName, trackDiv) {
          trackDiv.style.background = "linear-gradient(90deg, var(--color3), var(--color5), var(--color3))";
          trackDiv.style.backgroundSize = "200% 100%";
          trackDiv.style.animation = "gradientAnimation 1.5s ease infinite forwards";
          trackDiv.style.height = "155px";
          trackDiv.style.marginBottom = "10px";
          trackDiv.style.borderTopRightRadius = "8px";
          trackDiv.style.borderTopLeftRadius = "8px";

          fetch(`https://api.spotify.com/v1/search?q=track:${encodeURIComponent(trackName)}%20artist:${encodeURIComponent(artistName)}&type=track&limit=1`, {
              headers: {
                  "Authorization": `Bearer ${spotifyToken}`
              },
              method: "GET"
          }).then(res => res.json()).then(res => {
              if (res.tracks.items.length >= 1) {
                  var imageUrl = res.tracks.items[0].album.images[0].url;
                  var imageElement = document.createElement("img");
                  imageElement.src = imageUrl;
                  imageElement.className = "lastfm_image noselect disabledrag";
                  trackDiv.appendChild(imageElement);
              } else {
                  console.log(`❌ song ${trackName} by ${artistName} not found on Spotify.`);
                  var imageElement = document.createElement("img");
                  imageElement.src = "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png";
                  imageElement.className = "lastfm_image noselect disabledrag";
                  trackDiv.appendChild(imageElement);
              }
          });
        }

        function displayRecentTracks(tracks) {
          // Clear the existing tracks before displaying new ones
          const recentTracksDiv = document.getElementById("lastfm_recent");
          recentTracksDiv.innerHTML = '';
          const currentTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
      
          tracks.forEach((track, index) => {
              const timestamp = track.date && track.date.uts ? parseInt(track.date.uts) : null;
              const timeAgo = timestamp ? calculateTimeAgo(currentTimestamp, timestamp) : "N/A";

              if (index === 0 && !timestamp) {
                return;
              } else {
                var playedSince = document.createElement("div");
                playedSince.textContent = timeAgo;
                playedSince.classList.add("lastfm_playcount_recent");
                playedSince.classList.add("lastfm_playcount_played");
              }
      
              var trackDiv = document.createElement("div");
              trackDiv.className = "lastfm_container noselect disabledrag";
        
              var trackImage = document.createElement("div");
              fetchSpotifyImage(track.name, track.artist["#text"], trackImage);
              trackDiv.appendChild(trackImage);
        
              var artistName = document.createElement("div");
              artistName.textContent = track.artist["#text"];
              artistName.classList.add("lastfm_recent_artist");;
      
              var trackName = document.createElement("div");
              trackName.textContent = track.name;
              trackName.classList.add("lastfm_recent_name");
      
                      trackDiv.appendChild(playedSince);
              trackDiv.appendChild(trackName);
              trackDiv.appendChild(artistName);
              recentTracksDiv.appendChild(trackDiv);
          });
        }
      
        function calculateTimeAgo(currentTimestamp, trackTimestamp) {
          const timeDifference = currentTimestamp - trackTimestamp;
          const minutes = Math.floor(timeDifference / 60);
          const hours = Math.floor(minutes / 60);
          const days = Math.floor(hours / 24);
      
          if (days > 0) {
              return days === 1 ? "1d" : `${days}d`;
          } else if (hours > 0) {
              return hours === 1 ? "1h" : `${hours}h`;
          } else if (minutes > 0) {
              return minutes === 1 ? "1m" : `${minutes}m`;
          } else {
              return '';
          }
      }
    } catch (err) {
        console.error("Last.fm request error:", err);
        // Handle the error, retry the request, or perform other actions as necessary
    }
}
getToken();
fetchRecentSongsFromLastFM();

const userStatus = data.discord_status;

const activities = data.activities;
  const customStatus = activities ? activities.find(activity => activity.type === 4) : null;
/*   const activityState = customStatus ? customStatus.state : null;*/
  const statusCaseDiv = document.getElementById('status');
  const statusCaseText = document.getElementById('status_text');

  switch (userStatus) {
    case 'online':
      //statusCaseDiv.innerHTML = '<h6 style="font-size:0.8rem;">online</h6>';
      statusCaseDiv.style.backgroundColor = '#2bca6d';
      statusCaseText.textContent = 'online';
      break;
    case 'idle':
      //statusCaseDiv.innerHTML = '<h6 style="font-size:0.8rem;">idle</h6>';
      statusCaseDiv.style.backgroundColor = '#f0b232';
      statusCaseText.textContent = 'idle';
      break;
    case 'dnd':
      //statusCaseDiv.innerHTML = '<h6 style="font-size:0.8rem;margin-left:-1px;">dnd</h6>';
      statusCaseDiv.style.backgroundColor = '#f23f43';
      statusCaseText.textContent = 'dnd';
      break;
    case 'offline':
      //statusCaseDiv.innerHTML = '<h6 style="font-size:0.8rem;margin-left:-2px;">offline</h6>';
      statusCaseDiv.style.backgroundColor = '#7e828c';
      statusCaseText.textContent = 'offline';
      break;
    default:
      //statusCaseDiv.innerHTML = '<h6 style="font-size:0.8rem;">¯\_(ツ)_/¯</h6>';
      statusCaseDiv.style.backgroundColor = '#23a459';
  }

// Function to update #topbar height
const updateTopBarHeight = () => {
  const topbar = document.getElementById('topbar');
  const topbarLeft = document.getElementById('topbar_left');
  const music = document.getElementById('music');
  const textOuter = document.getElementById('text_outer');
  const profile = document.getElementById('profile_hover');

  const preloader_topbar = document.getElementById('preloader_topbar');
  const preloader_main = document.getElementById('preloader_main');
  const preloader_music = document.getElementById('preloader_music');

  const listeningToMusic = activities ? activities.some(activity => (activity.type === 0 && activity.name === 'SoundCloud') || (activity.type === 0 && activity.name === 'YouTube Music') || (activity.type === 2 && activity.name === 'Spotify')) : false;

  if (listeningToMusic && window.innerWidth < 481) {
    topbar.style.height = '155px';
    topbarLeft.style.marginTop = '-85px';
    preloader_topbar.style.height = '176px';
    preloader_main.style.height = 'calc(100% - 269px)'
    preloader_main.style.transition = '0s';

    preloader_music.style.display = 'block';

    music.style.marginTop = '83px';
    music.style.width = 'calc(100% - 20px)';
    music.style.position = 'absolute';
    music.style.marginLeft = '-5px';
    textOuter.style.height = 'calc(100% - 195px)';
    profile.style.maxHeight = 'calc(100% - 260px)';
    if (localStorage.getItem('music') === 'true') {
      topbar.style.height = '70px';
      topbarLeft.style.marginTop = '0px';
      preloader_topbar.style.height = '90px';
      preloader_main.style.height = 'calc(100% - 183px)'
      profile.style.maxHeight = 'calc(100% - 260px)';
    }
  } else {
    preloader_topbar.style.height = '';
    topbar.style.height = '';
    topbarLeft.style.marginTop = '';
    music.style.marginTop = '';
    music.style.width = '';
    music.style.position = '';
    music.style.marginLeft = '';
    textOuter.style.height = '';
    textOuter.style.height = '';
    profile.style.maxHeight = '';
  }
};

// Call the function initially
updateTopBarHeight();

// Attach the function to the window resize event
window.addEventListener('resize', updateTopBarHeight);

// Function to update .bar height for all elements with the class
const updateBarHeight = () => {
  const bars = document.querySelectorAll('.bar'); // Select all elements with the class 'bar'
  const project = document.getElementById('projects');

  // Assuming 'activities' is defined somewhere
  const listeningToMusic = activities ? activities.some(activity => (activity.type === 0 && activity.name === 'SoundCloud') || (activity.type === 0 && activity.name === 'YouTube Music') || (activity.type === 2 && activity.name === 'Spotify')) : false;

  bars.forEach(bar => {
    if (listeningToMusic && window.innerWidth < 481) {
      bar.style.height = 'calc(100% - 195px)';
      if (localStorage.getItem('music') === 'true') {
        bar.style.height = 'calc(100% - 110px)';
       }
    } else {
      bar.style.height = '';
    }
  });

  // 'project' is an element, so you need to set its style directly
  if (listeningToMusic && window.innerWidth < 481) {
    project.style.maxHeight = 'calc(100% - 105px)';
    } else {
    project.style.maxHeight = 'calc(100% - 110px)';
    }
};

// Call the function initially
updateBarHeight();

// Attach the function to the window resize event
window.addEventListener('resize', updateBarHeight);



const listeningToMusic = activities ? activities.some(activity => 
  (activity.type === 0 && activity.name === 'SoundCloud') || 
  (activity.type === 0 && activity.name === 'YouTube Music') || 
  (activity.type === 2 && activity.name === 'Spotify')) : false;

if (listeningToMusic) {
  // Find the relevant music activity
  const musicActivity = activities.find(activity => (activity.type === 0 && activity.name === 'SoundCloud') || (activity.type === 0 && activity.name === 'YouTube Music') || (activity.type === 2 && activity.name === 'Spotify'));
  // Get the necessary details based on the music platform
  const type = musicActivity.type; // 0 for SoundCloud, 2 for Spotify
  const songName = musicActivity.details;
  const artist = musicActivity.state;
  const albumCover = 
  type === 0 ? `https://${musicActivity.assets.large_image.replace(/^.*?https\//, '')}` : 
  type === 2 ? `https://i.scdn.co/image/${musicActivity.assets.large_image.replace('spotify:', '')}`
    : `https://lh3.googleusercontent.com/${musicActivity.assets.large_image.slice(musicActivity.assets.large_image.indexOf("https/"))}`;


  $(document).ready(function() {
    setTimeout(function() { 
      const preloaderMusic = document.getElementById('preloader_music');
      preloaderMusic.style.opacity = '1';
    }, 300);
    var topbarLeftWidth = $("#topbar_left").width();
    var updatedtopbarLeftWidth = topbarLeftWidth + 12; // Add 10 pixels to the original width
  
    $("#preloader_topbar_left").css("width", updatedtopbarLeftWidth + "px", "important");
    console.log("🎶 visible Music width:", topbarLeftWidth);
  });

  // Update the UI elements
  const songNameElement = document.getElementById('music-song');
  songNameElement.innerText = songName;
  
  const artistElement = document.getElementById('music-artist');
  artistElement.innerText = artist;

  const albumCoverElement = document.getElementById('music-cover');

  const trackLink = document.getElementById('music-track-link');

    // Log if it's using Spotify or not
    if (type === 2 && musicActivity.name === 'Spotify') {
      console.log('🐛 Currently listening to Spotify: ' + songName);
      const spotifytrackLink = 'https://open.spotify.com/track/' + data.spotify.track_id;
      trackLink.href = spotifytrackLink;
    } else {
      console.log('🐛 Not listening to Spotify. Current song: ' + songName);

      // Define a function to fetch Spotify search URL
  // Define a function to fetch Spotify search URL
  async function fetchUrlWithSpotify(trackName) {
    try {
      const response = await fetch("https://api.choccymilk.uk/spotify");
      const data = await response.json();
      const spotifyToken = data.accessToken;

      // Fetch up to 5 Spotify tracks matching the song and artist
      const spotifyResponse = await fetch(`https://api.spotify.com/v1/search?q=track:${encodeURIComponent(trackName)}&type=track&limit=1`, {
        headers: {
          "Authorization": `Bearer ${spotifyToken}`
        }
      });

      const spotifyData = await spotifyResponse.json();
      
      // Find the first track with a valid URL
      const trackItem = spotifyData.tracks.items.find(item => item.external_urls.spotify);
      
      if (trackItem) {
        console.log(`✅ Song ${trackName} found on Spotify.`);
        const spotifytrackLink = trackItem.external_urls.spotify;
        trackLink.href = spotifytrackLink;
      } else {
        console.log(`❌ No valid Spotify URL found for ${trackName}.`);
        // Handle the case where no valid URL is found
      }
    } catch (error) {
      console.error("Error fetching Spotify token or song data:", error);
      // Handle the error, retry the request, or perform other actions as necessary
    }
  }

  // Call the function with songName and artist
  fetchUrlWithSpotify(songName, artist);
}

  if (albumCover) {
    albumCoverElement.src = albumCover;
    albumCoverElement.setAttribute('title', songName + '\n' + artist);
  } else {
    albumCoverElement.src = ''; // Remove the image if no album cover available
  }

  // Get the initial timestamps and calculate the total time
  const Timestamps = musicActivity.timestamps;
  const StartTime = Timestamps.start;
  const EndTime = Timestamps.end;
  const TotalTime = new Date(EndTime - StartTime);

  // Check if an elapsed time element already exists and remove it
  const ElapsedTimeWrapper = document.getElementById('music-elapsed-time-wrapper');
  if (ElapsedTimeWrapper) {
    ElapsedTimeWrapper.remove();
  }

  // Create a new element for the elapsed time
  const ElapsedTimeWrapperNew = document.createElement('div');
  ElapsedTimeWrapperNew.id = 'music-elapsed-time-wrapper';

  const ElapsedTimeDisplayLeft = document.createElement('h6');
  ElapsedTimeDisplayLeft.id = 'music-elapsed-time-left';
  ElapsedTimeDisplayLeft.style.whiteSpace = 'nowrap';
  ElapsedTimeDisplayLeft.style.overflow = 'hidden';
  ElapsedTimeDisplayLeft.style.textOverflow = 'ellipsis';
  ElapsedTimeDisplayLeft.style.fontSize = '1rem';

  const ElapsedTimeDisplayRight = document.createElement('h6');
  ElapsedTimeDisplayRight.id = 'music-elapsed-time-right';
  ElapsedTimeDisplayRight.style.whiteSpace = 'nowrap';
  ElapsedTimeDisplayRight.style.overflow = 'hidden';
  ElapsedTimeDisplayRight.style.textOverflow = 'ellipsis';
  ElapsedTimeDisplayRight.style.fontSize = '1rem';
  ElapsedTimeDisplayRight.style.marginLeft = 'auto';

  ElapsedTimeWrapperNew.appendChild(ElapsedTimeDisplayLeft);
  ElapsedTimeWrapperNew.appendChild(ElapsedTimeDisplayRight);
  artistElement.parentNode.insertBefore(ElapsedTimeWrapperNew, artistElement.nextSibling);

  const updateElapsedTime = () => {
    // Get the latest timestamps and calculate the elapsed time
    const Timestamps = musicActivity.timestamps;
    const StartTime = Timestamps.start;
    const EndTime = Timestamps.end;
    const elapsed = Date.now() - StartTime;
    const elapsedDisplay = new Date(elapsed);

    let leftTimeDisplay = `${elapsedDisplay.getUTCMinutes().toString().padStart(2, '0')}:${elapsedDisplay.getUTCSeconds().toString().padStart(2, '0')}`;
    let rightTimeDisplay = `${TotalTime.getUTCMinutes().toString().padStart(2, '0')}:${TotalTime.getUTCSeconds().toString().padStart(2, '0')}`;

    if ((EndTime - StartTime) >= 3600000) { // 3600000 is the number of milliseconds in an hour
      const hours = elapsedDisplay.getUTCHours();
      leftTimeDisplay = `${(hours < 10 ? hours.toString() : hours.toString().padStart(2, '0'))}:${leftTimeDisplay}`;
      const totalHours = TotalTime.getUTCHours();
      rightTimeDisplay = `${(totalHours < 10 ? totalHours.toString() : totalHours.toString().padStart(2, '0'))}:${rightTimeDisplay}`;
    } else if (elapsedDisplay.getUTCMinutes() < 10) {
      leftTimeDisplay = `${elapsedDisplay.getUTCMinutes()}:${elapsedDisplay.getUTCSeconds().toString().padStart(2, '0')}`;
      rightTimeDisplay = `${TotalTime.getUTCMinutes()}:${TotalTime.getUTCSeconds().toString().padStart(2, '0')}`;
    }

    ElapsedTimeDisplayLeft.innerText = leftTimeDisplay;
    ElapsedTimeDisplayRight.innerText = rightTimeDisplay;
  };

  // Check if a progress bar element already exists and remove it
  const ProgressBarWrapper = document.getElementById('music-progress-bar-wrapper');

  if (ProgressBarWrapper) {
    ProgressBarWrapper.remove();
  }

  // Create a new element for the progress bar
  const ProgressBarWrapperNew = document.createElement('div');
  ProgressBarWrapperNew.id = 'music-progress-bar-wrapper';
  ProgressBarWrapperNew.style.width = '100%';
  ProgressBarWrapperNew.style.height = '4px';
  ProgressBarWrapperNew.style.backgroundColor = 'var(--color2)';
  ProgressBarWrapperNew.style.borderRadius = '4px';

  const ProgressBar = document.createElement('div');
  ProgressBar.style.width = '0%';
  ProgressBar.style.height = '100%';
  ProgressBar.style.backgroundColor = 'var(--color5)';
  ProgressBar.style.borderRadius = '4px';

  ProgressBarWrapperNew.appendChild(ProgressBar);
  artistElement.parentNode.insertBefore(ProgressBarWrapperNew, artistElement.nextSibling);

  const updateProgressBar = () => {
    // Get the latest timestamps and calculate the elapsed time
    const Timestamps = musicActivity.timestamps;
    const StartTime = Timestamps.start;
    const EndTime = Timestamps.end;
    const elapsed = Date.now() - StartTime;
    const elapsedPercentage = (elapsed / TotalTime) * 100;

    // Set the width of the progress bar to the calculated percentage
    ProgressBar.style.width = `${elapsedPercentage}%`;
  };

  updateProgressBar();
  setInterval(updateProgressBar, 1000);

  updateElapsedTime();
  setInterval(updateElapsedTime, 1000);

  // Show the relevant music platform's UI
  const musicPlatform = document.getElementById('music');
  musicPlatform.style.display = 'block';

} else if (!listeningToMusic) {
  // Hide the music UI
  const musicPlatform = document.getElementById('music');
  musicPlatform.style.display = 'none';
}
}
