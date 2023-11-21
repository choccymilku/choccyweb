let isLoading = true;
let spotifyToken;

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

function fetchTopTracks() {
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

function fetchSpotifyImage(trackName, artistName, trackDiv) {
    trackDiv.style.background = "var(--border)";
    trackDiv.style.height = "155px";
    trackDiv.style.marginBottom = "5px";
    trackDiv.style.borderTopRightRadius = "8px";
    trackDiv.style.borderTopLeftRadius = "8px";

    // replace non english characters (japanese, korean, etc.)
    trackName = trackName.replace(/'%/g, '').replace(/%/g, '').toLowerCase();
    artistName = artistName.replace(/'%/g, '').replace(/%/g, '').toLowerCase();

    let apiUrl;

    apiUrl = `https://api.choccymilk.uk/spotify-search/${encodeURIComponent(trackName)}/${encodeURIComponent(artistName)}`;

    console.log(`\x1b[32m🟢 searching for\x1b[0m \x1b[1m${trackName}\x1b[0m by \x1b[1m${artistName}\x1b[0m \x1b[32mwith Spotify\x1b[0m\x1b[2m${apiUrl}\x1b[0m`);

    fetch(`https://api.choccymilk.uk/spotify-search/${encodeURIComponent(trackName)}/${encodeURIComponent(artistName)}`, {
        headers: {
            "Authorization": `Bearer ${spotifyToken}`
        },
        method: "GET"
    }).then(response => response.json()).then(response => {
        if (response.length > 0) {
            var res = response[0];

            var imageUrl = res.image;
            var trackUrl = res.url;

            var imageElement = document.createElement("img");
            imageElement.src = imageUrl;
            imageElement.className = "data_image noselect disabledrag";

            var linkElement = document.createElement("a");
            linkElement.href = trackUrl;
            linkElement.target = "_blank";
            linkElement.className = "data_link";

            var spotifyWrapper = document.createElement("div");
            spotifyWrapper.classList.add("data_icon_wrapper");

            var spotifyElement = document.createElement("span");
            spotifyElement.classList.add("icons8-spotify-data");
            spotifyElement.classList.add("icon-style-data-spotify");

            trackDiv.appendChild(linkElement);
            linkElement.appendChild(spotifyWrapper);
            spotifyWrapper.appendChild(spotifyElement);
            linkElement.appendChild(imageElement);
       
        } else {
            // log error
            console.log(`\x1b[31m🔴 no results for\x1b[0m \x1b[1m${trackName}\x1b[0m by \x1b[1m${artistName}\x1b[0m,\x1b[33m using SoundCloud\x1b[0m`);
            useSoundCloud(trackName, artistName, trackDiv); 
        }
    });
}

function useSoundCloud(trackName, artistName, trackDiv) {
    let soundcloudUrl = `https://api.choccymilk.uk/sound-search/${encodeURIComponent(trackName)}/${encodeURIComponent(artistName)}`;
    
    fetch(soundcloudUrl)
        .then(response => response.json())
        .then(data => {
            // if successful, use soundcloud
            if (data.length > 0) {
                console.log(`\x1b[33m🟠 searching for\x1b[0m \x1b[1m${trackName}\x1b[0m by \x1b[1m${artistName}\x1b[0m \x1b[33mwith SoundCloud\x1b[0m\x1b[2m${soundcloudUrl}\x1b[0m`);

                var trackUrl = data[0].url;
                var imageUrl = data[0].art;

                var imageElement = document.createElement("img");
                imageElement.src = imageUrl;
                imageElement.className = "data_image noselect disabledrag";

                var linkElement = document.createElement("a");
                linkElement.href = trackUrl;
                linkElement.target = "_blank";
                linkElement.className = "data_link";

                var soundcloudWrapper = document.createElement("div");
                soundcloudWrapper.classList.add("data_icon_wrapper");

                var soundcloudElement = document.createElement("span");
                soundcloudElement.classList.add("icons8-soundcloud-data");
                soundcloudElement.classList.add("icon-style-data-soundcloud");

                trackDiv.appendChild(linkElement);
                linkElement.appendChild(soundcloudWrapper);
                soundcloudWrapper.appendChild(soundcloudElement);
                linkElement.appendChild(imageElement);
            } else if (data.length === 0) {
                console.log(`🔴 no results found for ${trackName} by ${artistName}`);

                var linkElement = document.createElement("a");
                linkElement.target = "_blank";
                linkElement.className = "data_link";

                var soundcloudWrapper = document.createElement("div");
                soundcloudWrapper.classList.add("data_icon_wrapper");

                var soundcloudElement = document.createElement("span");
                soundcloudElement.classList.add("icons8-soundcloud-data");
                soundcloudElement.classList.add("icon-style-data-soundcloud");

                trackDiv.appendChild(linkElement);
                linkElement.appendChild(soundcloudWrapper);
                soundcloudWrapper.appendChild(soundcloudElement);
            }
        })
        .catch(error => {
            console.error(`🔴 error fetching from soundcloud\n${error}`);
        
            // Add more detailed logging if needed
            if (error instanceof TypeError) {
                console.error('TypeError occurred. Likely a network issue or CORS problem.');
            }
        });
        
}

function fetchSpotifyArtistImage(artistName, trackDiv) {
    trackDiv.style.background = "var(--border)";
    trackDiv.style.height = "155px";
    trackDiv.style.marginBottom = "10px";
    trackDiv.style.borderTopRightRadius = "8px";
    trackDiv.style.borderTopLeftRadius = "8px";


    // Function to fetch artist image for a single part
    let apiUrl;

    apiUrl = `https://api.choccymilk.uk/spotify-search-artist/${encodeURIComponent(artistName)}`;

    console.log(`\x1b[32m🟢 searching for artist\x1b[0m \x1b[1m${artistName}\x1b[0m \x1b[32mwith Spotify\x1b[0m\x1b[2m${apiUrl}\x1b[0m`);

    fetch(`https://api.choccymilk.uk/spotify-search-artist/${encodeURIComponent(artistName)}`, {
    }).then(response => response.json()).then(response => {
        if (response.length > 0) {
            var res = response[0];

            var imageUrl = res.image;
            var trackUrl = res.url;

            var imageElement = document.createElement("img");
            imageElement.src = imageUrl;
            imageElement.className = "data_image noselect disabledrag";

            var linkElement = document.createElement("a");
            linkElement.href = trackUrl;
            linkElement.target = "_blank";
            linkElement.className = "data_link";

            var genresElement = document.createElement("div");
            // seperate by space
            genresElement.textContent = res.genres.join(", ");
            genresElement.classList.add("data_genres");

            var spotifyWrapper = document.createElement("div");
            spotifyWrapper.classList.add("data_icon_wrapper");

            var spotifyElement = document.createElement("span");
            spotifyElement.classList.add("icons8-spotify-data");
            spotifyElement.classList.add("icon-style-data-spotify");

            trackDiv.appendChild(linkElement);
            linkElement.appendChild(spotifyWrapper);
            spotifyWrapper.appendChild(spotifyElement);
            trackDiv.appendChild(genresElement);
            linkElement.appendChild(imageElement);
        } else {
            // log error
            console.log(`\x1b[31m🔴 no results found for \x1b[1m${artistName}\x1b[0m, using \x1b[33msoundcloud\x1b[0m`);
            useSoundCloudArtist(artistName, trackDiv); 
        }
    }).catch(error => {
        // Handle errors that occur during the fetch
        console.error("Error fetching data:", error);
    });
}

function displayRecentTracks(tracks) {
    const recentTracksDiv = document.getElementById("spotify_recent");
    recentTracksDiv.innerHTML = '';

    // ignore now playing track
    if (tracks[0]["@attr"]) {
        tracks.shift();
    }

    tracks.forEach((track) => {
        var trackDiv = document.createElement("a");
        trackDiv.className = "data_container noselect disabledrag";

        var trackImage = document.createElement("div");
        fetchSpotifyImage(track.name, track.artist["#text"], trackImage);
        trackDiv.appendChild(trackImage);

        var trackName = document.createElement("div");
        trackName.textContent = track.name;
        trackName.classList.add("data_top_name");

        var artistName = document.createElement("div");
        artistName.textContent = track.artist["#text"];
        artistName.classList.add("data_bottom_name");

        var addedAtElement = document.createElement("div");
        addedAtElement.textContent = calculateTimeAgo(Date.now() / 1000, track.date.uts);
        addedAtElement.classList.add("data_added");

        trackDiv.appendChild(addedAtElement);
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

        var spotifyWrapper = document.createElement("div");
        spotifyWrapper.classList.add("data_icon_wrapper");

        var spotifyElement = document.createElement("span");
        spotifyElement.classList.add("icons8-spotify-data");
        spotifyElement.classList.add("icon-style-data-spotify");

        var addedAtElement = document.createElement("div");
        // convert from data to ago
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
        trackLink.appendChild(spotifyWrapper);
        trackLink.appendChild(addedAtElement);
        spotifyWrapper.appendChild(spotifyElement);
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

        var trackImage = document.createElement("div");
        fetchSpotifyImage(track.name, track.artist.name, trackImage);
        trackDiv.appendChild(trackImage);

        var trackName = document.createElement("div");
        trackName.textContent = track.name;
        trackName.classList.add("data_top_name");

        var artistName = document.createElement("div");
        artistName.textContent = track.artist.name;
        artistName.classList.add("data_bottom_name");

        var addedAtElement = document.createElement("div");
        addedAtElement.textContent = track.playcount;
        addedAtElement.classList.add("data_added");

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

        var trackImage = document.createElement("div");
        fetchSpotifyArtistImage(track.name, trackImage);
        trackDiv.appendChild(trackImage);

        var addedAtElement = document.createElement("div");
        addedAtElement.textContent = track.playcount;
        addedAtElement.style.marginTop = "-30.5px";
        addedAtElement.classList.add("data_added");

        var trackName = document.createElement("div");
        trackName.textContent = track.name;
        trackName.classList.add("data_top_name");

        trackDiv.appendChild(addedAtElement);
        trackDiv.appendChild(trackName);
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