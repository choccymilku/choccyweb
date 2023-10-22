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
    // Reconnect after a timeout (e.g., 5 seconds)
    reconnectTimeout = setTimeout(() => connect(), 0);
  });

  ws.addEventListener('message', event => {
    const data = JSON.parse(event.data);
    console.log('📰 lanyard API call successful! fetching API data', data); // Add this line to log the data
    if (data.op === 1) {
      updateStatus(data.d);
    } else if (data.op === 0) {
      updateStatus(data.d);
    }
  });
}

function updateStatus(data) {
  // Update the status logic here
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
  const userStatus = data.discord_status;

const activities = data.activities;
  const customStatus = activities ? activities.find(activity => activity.type === 4) : null;
  const activityState = customStatus ? customStatus.state : null;

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

  const spotifytrackLink = data.spotify;
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

// Function to check if the text is present in elements
function checkTextAvailability() {
  if (songNameElement.innerText && artistElement.innerText) {
      // If both song name and artist are present, get the token and make the API request
      getToken();
  } else {
      // If text is not available, wait and check again after a delay
      setTimeout(checkTextAvailability, 1000); // Wait for 1 second and check again
  }
}

// Function to handle Spotify API request
function getToken() {
  fetch("https://api.choccymilk.uk/spotify")
      .then(response => response.json())
      .then(data => {
          var spotifyToken = data.accessToken; // Define spotifyToken inside this block
          console.log("🎶 spotify token for fetching link acquired, fetching...");

          // Make the Spotify API request with the obtained token and text data
          fetch(`https://api.spotify.com/v1/search?q=track:${encodeURIComponent(songNameElement.innerText)}&type=track&limit=1`, {
              headers: {
                  "Authorization": `Bearer ${spotifyToken}`
              },
              method: "GET"
          })
              .then(res => res.json())
              .then(res => {
                  if (res.tracks.items.length >= 1) {
                      if (spotifytrackLink) {
                        const trackId = spotifytrackLink.track_id;
                        console.log('🐛 spotify link: https://open.spotify.com/track/' + trackId);
                        trackLink.href = `https://open.spotify.com/track/${trackId}`;
                      } else {
                        console.log('🐛 non-spotify song: ' + songNameElement.innerText + ' | ' + res.tracks.items[0].external_urls.spotify);
                        trackLink.href = res.tracks.items[0].external_urls.spotify;
                      }
                  } else {
                      console.log("🐛 non-spotify song not found");
                      // remove href
                      trackLink.removeAttribute('href');
                  }
              });
      });
}

// Call the function to check for text availability
checkTextAvailability();


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
// if #music_hide is clicked, set localstorage, hide #music
$('#music_hide').click(function() {
  localStorage.setItem('music', 'true');
  $('#music').hide();
  $('#music_hide').hide();
  $('#music_show').show();
  if (window.innerWidth < 481) {
    $('#topbar').css('height', '70px');
    $('#topbar_left').css('margin-top', '0px');
    $('.bar').css('height', 'calc(100% - 110px)');
  }
});
// or if #music_show is clicked, set localstorage, show #music
$('#music_show').click(function() {
  localStorage.setItem('music', 'false');
  $('#music').show();
  $('#music_show').hide();
  $('#music_hide').show();
  if (window.innerWidth < 481) {
    $('#topbar').css('height', '155px');
    $('#topbar_left').css('margin-top', '-85px');
    $('.bar').css('height', 'calc(100% - 195px)');
  }
});
// make sure to check localstorage on page load
if (localStorage.getItem('music') === 'true') {
  $('#music').hide();
  $('#music_hide').hide();
  $('#music_show').show();
} else if (localStorage.getItem('music') === 'false' && window.innerWidth < 481) {
  $('#topbar').css('height', '155px');
}
}
