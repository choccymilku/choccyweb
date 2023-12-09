let isLoading = true;

// Define the fetchData function
async function fetchData() {
    try {
        await fetchTopArtists();
        await fetchTopTracks();
        await fetchUserStats();
        await fetchRecentLiked();
    } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error, retry the request, or perform other actions as necessary
    }
}

// Define a separate function to fetch recent tracks with a timeout
async function fetchRecentTracksWithTimeout() {
    try {
        await fetchRecentTracks();
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
        fetch(`https://api.choccymilk.uk/lastfm-data`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log("📅 user stats - last.fm", data);
            displayUserAndTotalStats(data.userInfo.user, data.totalTimeListened);
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

function fetchRecentLiked() {
    try {
        fetch(`https://api.choccymilk.uk/liked-tracks`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log("📅 recent liked - spotify", data);
            displayRecentLiked(data);
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

function fetchTopArtists() {
  try {
      fetch(`https://api.choccymilk.uk/lastfm-artists`)
      .then(response => {
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          return response.json();
      })
      .then(data => {
          console.log("📅 top artists - last.fm", data);
          displayTopArtists(data);
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

function fetchTopTracks() {
  try {
      fetch(`https://api.choccymilk.uk/lastfm-top`)
      .then(response => {
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          return response.json();
      })
      .then(data => {
          console.log("📅 top tracks - last.fm", data);
          displayTopTracks(data);
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

function fetchRecentTracks() {
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

            displayRecentTracks(data);
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

// generate skeletons for the data
var lastfm_recent_outer = document.querySelectorAll('.data_move');

// generate 10 sets of elements and append them to each node in lastfm_recent_outer
for (var i = 0; i < lastfm_recent_outer.length; i++) {
  for (var j = 0; j < 10; j++) {
    var data_skeleton = document.createElement('div');
    var data_skeleton_inner = document.createElement('div');

    data_skeleton_inner.className = 'data_image';
    data_skeleton_inner.style.width = '155px';
    data_skeleton_inner.style.height = '155px';

    data_skeleton.className = 'data_container';
    data_skeleton.style.width = '155px';

    data_skeleton.appendChild(data_skeleton_inner);

    // Append the generated elements to the current node in lastfm_recent_outer
    lastfm_recent_outer[i].appendChild(data_skeleton);
  }
}

function displayRecentTracks(tracks) {
    const recentTracksDiv = document.getElementById("spotify_recent");
    recentTracksDiv.innerHTML = '';

    tracks.forEach((track) => {
        var trackDiv = document.createElement("a");
        trackDiv.className = "data_container noselect disabledrag";

        var trackUrl = document.createElement("a");
        trackUrl.href = track.url;
        trackUrl.target = "_blank";
        trackUrl.className = "data_link";

        var trackImage = document.createElement("img");
        trackImage.src = track.image;
        trackImage.className = "data_image noselect disabledrag";

        var trackName = document.createElement("div");
        trackName.textContent = track.name;
        trackName.classList.add("data_top_name");

        var artistName = document.createElement("div");
        artistName.textContent = track.artist;
        artistName.classList.add("data_bottom_name");

        var addedAtElement = document.createElement("div");
        addedAtElement.textContent = calculateTimeAgo(Date.now() / 1000, track.date);
        addedAtElement.classList.add("data_added");

        trackUrl.appendChild(trackImage);
        trackUrl.appendChild(addedAtElement);

        trackDiv.appendChild(trackUrl);
        trackDiv.appendChild(trackName);
        trackDiv.appendChild(artistName);
        recentTracksDiv.appendChild(trackDiv);
    });
}

function displayRecentLiked(tracks) {
    const likedTracks = document.getElementById("spotify_liked");
    likedTracks.innerHTML = '';
    tracks.forEach((data) => {
        var trackDiv = document.createElement("a");
        trackDiv.className = "data_container noselect disabledrag";

        var trackLink = document.createElement("a");
        trackLink.href = data.url;
        trackLink.target = "_blank";
        trackLink.className = "data_link";
        trackDiv.appendChild(trackLink);

        var addedAtElement = document.createElement("div");
        addedAtElement.textContent = data.added;
        addedAtElement.classList.add("data_duration");

        var trackImage = document.createElement("img");
        trackImage.src = data.image;
        trackImage.className = "data_image noselect disabledrag";

        var trackName = document.createElement("div");
        trackName.textContent = data.name;
        trackName.classList.add("data_top_name");

        var trackArtist = document.createElement("div");
        trackArtist.textContent = data.artist;
        trackArtist.classList.add("data_bottom_name");

        trackDiv.appendChild(trackName);
        trackDiv.appendChild(trackArtist);
        trackLink.appendChild(addedAtElement);
        trackLink.appendChild(trackImage);
        likedTracks.appendChild(trackDiv);
    });
}

function displayTopTracks(tracks) {
    const topTracks = document.getElementById("spotify_top");
    topTracks.innerHTML = '';
    tracks.forEach((track) => {
        var trackDiv = document.createElement("a");
        trackDiv.className = "data_container noselect disabledrag";

        var trackUrl = document.createElement("a");
        trackUrl.href = track.url;
        trackUrl.target = "_blank";
        trackUrl.className = "data_link";

        var trackImage = document.createElement("img");
        trackImage.src = track.image;
        trackImage.className = "data_image noselect disabledrag";

        var trackName = document.createElement("div");
        trackName.textContent = track.name;
        trackName.classList.add("data_top_name");

        var artistName = document.createElement("div");
        artistName.textContent = track.artist;
        artistName.classList.add("data_bottom_name");

        var addedAtElement = document.createElement("div");
        addedAtElement.textContent = track.playcount;
        addedAtElement.classList.add("data_added");

        trackDiv.appendChild(trackUrl);
        trackUrl.appendChild(trackImage);

        trackDiv.appendChild(addedAtElement);
        trackDiv.appendChild(trackName);
        trackDiv.appendChild(artistName);
        topTracks.appendChild(trackDiv);
    });
}

function displayTopArtists(tracks) {
    const topArtists = document.getElementById("spotify_artists");
    topArtists.innerHTML = '';
    tracks.forEach((track) => {
        var trackDiv = document.createElement("a");
        trackDiv.className = "data_container noselect disabledrag";

        var trackUrl = document.createElement("a");
        trackUrl.href = track.url;
        trackUrl.target = "_blank";
        trackUrl.className = "data_link";

        var trackImage = document.createElement("img");
        trackImage.src = track.image;
        trackImage.className = "data_image noselect disabledrag";

        var addedAtElement = document.createElement("div");
        addedAtElement.textContent = track.playcount;
        addedAtElement.classList.add("data_added");

        var trackName = document.createElement("div");
        trackName.textContent = track.name;
        trackName.classList.add("data_top_name");

        var genres = document.createElement("div");
        genres.textContent = track.genres;
        genres.classList.add("data_bottom_name");

        trackDiv.appendChild(trackUrl);
        trackUrl.appendChild(trackImage);

        trackDiv.appendChild(addedAtElement);
        trackDiv.appendChild(trackName);
        trackDiv.appendChild(genres);
        topArtists.appendChild(trackDiv);
    });
}

function displayUserAndTotalStats(user, totalTime) {
    var userStatsDiv = document.getElementById("lastfm_user");
    artist = user.artist_count;
    track = user.track_count;
    album = user.album_count;
    time = totalTime;

    // Calculate weeks, days, hours, and remaining minutes
    const weeks = Math.floor(time / (60 * 60 * 24 * 7));
    const days = Math.floor(time / (60 * 60 * 24)) % 7;
    const hours = Math.floor(time / (60 * 60)) % 24;
    const minutes = Math.floor(time / 60) % 60;

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

    var userText = document.createElement("span");
    userText.innerHTML =
        `listened for ${formattedPlaytime}
    to <span class="info_large">${track} tracks</span> 
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