let isLoading = true;
let spotifyToken;

const refreshAccessToken = async () => {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${SPOTIFY_CLIENT_ID}&client_secret=${SPOTIFY_CLIENT_SECRET}`,
      });
      const data = await response.json();
      accessToken = data.access_token;
      console.log('Access token refreshed:', accessToken);
    } catch (error) {
      console.error('Error refreshing access token:', error);
    }
  };

async function getToken() {
    try {
        const response = await fetch("https://api.choccymilk.uk/spotify");
        const data = await response.json();
        spotifyToken = data.accessToken;
        if (response.status === 401) {
            // If token expired, refresh it and retry
            await refreshAccessToken();
            console.log("Spotify token refreshed:", spotifyToken);
            await getToken(); // Retry the request with the new token
        }
    } catch (error) {
        console.error("Error fetching Spotify token:", error);
        // Handle the error, retry the request, or perform other actions as necessary
    }
}

// Define the fetchData function
async function fetchData() {
    try {
        await getToken(); // Wait for the token to be retrieved
        await fetchTopArtistsFromLastFM();
        await fetchTopTracksFromLastFM();
        await fetchUserStats();
    } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error, retry the request, or perform other actions as necessary
    }
}

// Define a separate function to fetch recent tracks with a timeout
async function fetchRecentTracksWithTimeout() {
    try {
        await fetchRecentTracksFromLastFM();
    } catch (error) {
        console.error("Error fetching recent tracks:", error);
        // Handle the error, retry the request, or perform other actions as necessary
    }

    // Set a timeout of 30 seconds (30000 milliseconds) before calling fetchRecentTracksWithTimeout again
    setTimeout(() => {
        fetchRecentTracksWithTimeout();
    }, 60000);
}

// Initial call to fetchRecentTracksWithTimeout
fetchRecentTracksWithTimeout();

function fetchUserStats() {
    try {
        fetch(`https://api.choccymilk.uk/lastfm-user`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log("📅 user stats - last.fm", data);
            displayUserStats(data.user);
        })
        .catch(error => {
            console.error("Error fetching user stats from Last.fm API:", error);
            // Handle the error, retry the request, or perform other actions as necessary
        });
    } catch (err) {
        console.error("Last.fm request error:", err);
        // Handle the error, retry the request, or perform other actions as necessary
    }

}
function fetchRecentTracksFromLastFM() {
    try {
        fetch(`https://api.choccymilk.uk/lastfm-recent`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log("📅 recent tracks - last.fm", data);
            displayRecentTracks(data.recenttracks.track);
        })
        .catch(error => {
            console.error("Error fetching top tracks from Last.fm API:", error);
            // Handle the error, retry the request, or perform other actions as necessary
        })
    } catch (err) {
        console.error("Last.fm request error:", err);
        // Handle the error, retry the request, or perform other actions as necessary
    }
}

/* var isTimeoutActive = false;

function fetchAndTimeout() {
    fetchRecentTracksFromLastFM();
    var countdown = 15;
    isTimeoutActive = true;
    
    function updateTimeout() {
        countdown--;
        if (countdown >= 0) {
            document.getElementById("refresh_recent").innerHTML = `<span style="font-family:Rubik;margin-left:5px;">${countdown}s</span>`;
            document.getElementById("refresh_recent").style.cursor = "not-allowed";
            setTimeout(updateTimeout, 1000);
        } else {
            document.getElementById("refresh_recent").innerHTML = "";
            document.getElementById("refresh_recent").style.cursor = "pointer";
            isTimeoutActive = false;
        }
    }
    
    updateTimeout();
}

document.getElementById("refresh_recent").addEventListener("click", function() {
    if (!isTimeoutActive) {
        fetchAndTimeout();
    }
}); */



function fetchTopArtistsFromLastFM() {
  try {
      fetch(`https://wakakaka.choccymilku.repl.co/lastfm-artists`)
      .then(response => {
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          return response.json();
      })
      .then(data => {
          console.log("📅 top artists - last.fm", data);
          displayTopArtists(data.topartists.artist);
      })
      .catch(error => {
          console.error("Error fetching top artists from Last.fm API:", error);
          // Handle the error, retry the request, or perform other actions as necessary
      });
  } catch (err) {
      console.error("Last.fm request error:", err);
      // Handle the error, retry the request, or perform other actions as necessary
  }
}

function fetchTopTracksFromLastFM() {
  try {
      fetch(`https://api.choccymilk.uk/lastfm-tracks`)
      .then(response => {
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          return response.json();
      })
      .then(data => {
          console.log("📅 top tracks - last.fm", data);
          displayTopTracks(data.toptracks.track);
      })
      .catch(error => {
          console.error("Error fetching top tracks from Last.fm API:", error);
          // Handle the error, retry the request, or perform other actions as necessary
      });
  } catch (err) {
      console.error("Last.fm request error:", err);
      // Handle the error, retry the request, or perform other actions as necessary
  }
}

// generate skeletons for the data
var lastfm_recent_outer = document.querySelectorAll('.data_move');

// generate 10 sets of elements and append them to each node in lastfm_recent_outer
for (var i = 0; i < lastfm_recent_outer.length; i++) {
  for (var j = 0; j < 10; j++) {
    var data_skeleton = document.createElement('div');
    var data_skeleton_inner = document.createElement('div');
    var data_skeleton_number = document.createElement('div');

    data_skeleton_number.className = 'data_playcount_skeleton';

    data_skeleton_inner.className = 'data_image';
    data_skeleton_inner.style.width = '155px';
    data_skeleton_inner.style.height = '155px';

    data_skeleton.className = 'data_container data_skeleton';
    data_skeleton.style.width = '155px';

    data_skeleton.appendChild(data_skeleton_inner);
    data_skeleton.appendChild(data_skeleton_number);

    // Append the generated elements to the current node in lastfm_recent_outer
    lastfm_recent_outer[i].appendChild(data_skeleton);
  }
}


function fetchSpotifyImage(trackName, artistName, albumName, trackDiv) {
    trackDiv.style.background = "var(--color4)";
    trackDiv.style.height = "155px";
    trackDiv.style.marginBottom = "10px";
    trackDiv.style.borderTopRightRadius = "8px";
    trackDiv.style.borderTopLeftRadius = "8px";

    let encodedTrackName = encodeURIComponent(trackName);
    let apiUrl = `https://api.spotify.com/v1/search?q=track:${encodedTrackName}%20artist:${encodeURIComponent(artistName)}`;

    if (albumName && albumName !== trackName) {
        apiUrl += `%20album:${encodeURIComponent(albumName)}&type=track&limit=1&market=US`;
    } else {
        apiUrl += "&type=track&limit=1";
    }

    fetch(apiUrl, {
        headers: {
            "Authorization": `Bearer ${spotifyToken}`
        },
        method: "GET"
    }).then(res => res.json()).then(res => {
        if (res.tracks.items.length >= 1) {
            var imageUrl = res.tracks.items[0].album.images[0].url;
            var trackUrl = res.tracks.items[0].external_urls.spotify;

            var imageElement = document.createElement("img");
            imageElement.src = imageUrl;
            imageElement.className = "data_image noselect disabledrag";

            var linkElement = document.createElement("a");
            linkElement.href = trackUrl;
            linkElement.target = "_blank";
            linkElement.className = "data_link";

            trackDiv.appendChild(linkElement);
            linkElement.appendChild(imageElement);
        } else if (albumName) {
            // Retry without using album name if album image is not found
            console.log(`Album image not found for ${trackName} by ${artistName} on ${albumName}. Retrying without album...`);
            fetchSpotifyImage(trackName, artistName, null, trackDiv);
            console.log(apiUrl);
        } else {
            console.log(`❌ song ${trackName} by ${artistName} not found on Spotify.`);
            console.log(apiUrl);
            var imageElement = document.createElement("img");
            imageElement.src = "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png";
            imageElement.className = "data_image noselect disabledrag";
            trackDiv.appendChild(imageElement);
        } 
    })
}

function fetchSpotifyArtistImage(artistName, trackDiv) {
    trackDiv.style.background = "var(--color4)";
    trackDiv.style.height = "155px";
    trackDiv.style.marginBottom = "10px";
    trackDiv.style.borderTopRightRadius = "8px";
    trackDiv.style.borderTopLeftRadius = "8px";

    // Function to fetch artist image for a single part
    return fetch(`https://api.spotify.com/v1/search?q=artist:${encodeURIComponent(artistName)}&type=artist&limit=1`, {
        headers: {
            "Authorization": `Bearer ${spotifyToken}`
        },
        method: "GET"
    }).then(res => res.json()).then(res => {
        if (res.artists.items.length >= 1) {
            var imageUrl = res.artists.items[0].images[0].url;
            var artistUrl = res.artists.items[0].external_urls.spotify;

            var imageElement = document.createElement("img");
            imageElement.src = imageUrl;
            imageElement.className = "data_image noselect disabledrag";

            var linkElement = document.createElement("a");
            linkElement.href = artistUrl;
            linkElement.target = "_blank";
            linkElement.className = "data_link";

            trackDiv.appendChild(linkElement);
            linkElement.appendChild(imageElement);
        } else {
            // Handle case when no artists are found
            console.log("No artists found");
        }
    }).catch(error => {
        // Handle errors that occur during the fetch
        console.error("Error fetching data:", error);
    });
}

function displayRecentTracks(tracks) {
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
            playedSince.classList.add("data_playcount");
            playedSince.classList.add("data_playcount_smaller");
        }

        var trackDiv = document.createElement("a");
        trackDiv.className = "data_container noselect disabledrag";

        var trackImage = document.createElement("div");
        fetchSpotifyImage(track.name, track.artist["#text"], track.album["#text"], trackImage);
        trackDiv.appendChild(trackImage);

        var trackName = document.createElement("div");
        trackName.textContent = track.name;
        trackName.classList.add("data_top_name");

        var artistName = document.createElement("div");
        artistName.textContent = track.artist["#text"];
        artistName.classList.add("data_bottom_name");

        trackDiv.appendChild(playedSince);
        trackDiv.appendChild(trackName);
        trackDiv.appendChild(artistName);
        recentTracksDiv.appendChild(trackDiv);
    });
}

function displayTopTracks(tracks) {
    var topTracksDiv = document.getElementById("lastfm_top");
    topTracksDiv.innerHTML = '';
    tracks.forEach(track => {
        var trackDiv = document.createElement("a");
        trackDiv.className = "data_container noselect disabledrag";
  
        var trackImage = document.createElement("div");
        fetchSpotifyImage(track.name, track.artist.name, track.album, trackImage);
        trackDiv.appendChild(trackImage);
  
        var playCount = document.createElement("div");
        playCount.textContent = track.playcount;
        playCount.classList.add("data_playcount"); 
        trackDiv.appendChild(playCount);
  
        var trackName = document.createElement("div");
        trackName.textContent = track.name;
        trackName.classList.add("data_top_name");
        trackDiv.appendChild(trackName);
  
        var artistName = document.createElement("div");
        artistName.textContent = track.artist.name;
        artistName.classList.add("data_bottom_name");
        trackDiv.appendChild(artistName);
  
        topTracksDiv.appendChild(trackDiv);
    });
}

function displayTopArtists(tracks) {
  var topArtistDiv = document.getElementById("lastfm_artist");
  topArtistDiv.innerHTML = '';
  tracks.forEach(track => {
      var trackDiv = document.createElement("a");
      trackDiv.className = "data_container noselect disabledrag";

      var trackImage = document.createElement("div");
      fetchSpotifyArtistImage(track.name, trackImage);
      trackDiv.appendChild(trackImage);

      var playCount = document.createElement("div");
      playCount.textContent = track.playcount;
      playCount.classList.add("data_playcount"); 
      trackDiv.appendChild(playCount);

      var artistName = document.createElement("div");
      artistName.textContent = track.name;
      artistName.classList.add("data_top_name_bigger");
      trackDiv.appendChild(artistName);

      topArtistDiv.appendChild(trackDiv);
  });
}

function displayUserStats(user) {
    var userStatsDiv = document.getElementById("lastfm_user");

    var artist = document.createElement("span");
    artist = user.artist_count;
    track = user.track_count;
    album = user.album_count;

    var userText = document.createElement("span");
    userText.innerHTML = 
    `listened to <span class="info_large">${track} tracks</span> 
    through <span class="info_large">${album} albums</span> 
    from <span class="info_large">${artist} artists</span>`;
    userText.style.fontFamily = "Rubik";
    userStatsDiv.appendChild(userText);
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

fetchData();