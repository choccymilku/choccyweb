let isLoading = true;
let spotifyToken;

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

// Define the fetchData function
async function fetchData() {
    try {
        await getToken(); // Wait for the token to be retrieved
        await fetchTopArtistsFromLastFM();
        await fetchRecentTracksFromLastFM();
        await fetchTopTracksFromLastFM();
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
    }, 30000);
}

// Initial call to fetchRecentTracksWithTimeout
fetchRecentTracksWithTimeout();


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
        });
    } catch (err) {
        console.error("Last.fm request error:", err);
        // Handle the error, retry the request, or perform other actions as necessary
    }
}

function fetchTopArtistsFromLastFM() {
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

function fetchSpotifyImage(trackName, artistName, albumName, trackDiv) {
    trackDiv.style.background = "linear-gradient(90deg, var(--color3), var(--color5), var(--color3))";
    trackDiv.style.backgroundSize = "200% 100%";
    trackDiv.style.animation = "gradientAnimation 1.5s ease infinite forwards";
    trackDiv.style.height = "155px";
    trackDiv.style.marginBottom = "10px";
    trackDiv.style.borderTopRightRadius = "8px";
    trackDiv.style.borderTopLeftRadius = "8px";

    let apiUrl = `https://api.spotify.com/v1/search?q=track:${encodeURIComponent(trackName)}%20artist:${encodeURIComponent(artistName)}`;

    if (albumName) {
        apiUrl += `%20album:${encodeURIComponent(albumName)}&type=track&limit=1`;
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
        } else {
            console.log(`❌ song ${trackName} by ${artistName} on ${albumName || "unknown album"} not found on Spotify.`);
            var imageElement = document.createElement("img");
            imageElement.src = "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png";
            imageElement.className = "data_image noselect disabledrag";
            trackDiv.appendChild(imageElement);
        }
    });
}

function fetchSpotifyArtistImage(artistName, trackDiv) {
    trackDiv.style.background = "linear-gradient(90deg, var(--color3), var(--color5), var(--color3))";
    trackDiv.style.backgroundSize = "200% 100%";
    trackDiv.style.animation = "gradientAnimation 1.5s ease infinite forwards";
    trackDiv.style.height = "155px";
    trackDiv.style.marginBottom = "10px";
    trackDiv.style.borderTopRightRadius = "8px";
    trackDiv.style.borderTopLeftRadius = "8px";
    const artistParts = artistName.split(','); // Split artist name into parts
    
    // Function to fetch artist image for a single part
    function fetchArtistImageForPart(artistPart) {
        return fetch(`https://api.spotify.com/v1/search?q=artist:${encodeURIComponent(artistPart.trim())}&type=artist&limit=1`, {
            headers: {
                "Authorization": `Bearer ${spotifyToken}`
            },
            method: "GET"
        }).then(res => res.json());
    }

    // Function to recursively fetch artist images for all parts
    function fetchImagesRecursively(index) {
        if (index >= artistParts.length) {
            console.log("❌ artist not found on Spotify.");
            return; // All parts have been tried, and the artist is still not found
        }

        var fetchedArtistNames = [];

        fetchArtistImageForPart(artistParts[index])
.then(res => {
    if (res.artists.items.length >= 1) {
        // Artist found, display the image
        var imageUrl = res.artists.items[0].images[0].url;
        var artistUrl = res.artists.items[0].external_urls.spotify;

        var imageElement = document.createElement("img");
        imageElement.src = imageUrl;
        imageElement.className = "data_image noselect disabledrag"; // Modify the class name as needed

        var linkElement = document.createElement("a");
        linkElement.href = artistUrl;
        linkElement.target = "_blank";
        linkElement.className = "data_link"; // Modify the class name as needed

        trackDiv.appendChild(imageElement);

        // Add the fetched artist name to the array
        fetchedArtistNames.push(artistParts[index].trim());
    } else {
        // Artist not found for this part, try the next one
        fetchImagesRecursively(index + 1);
    }
            })
            .catch(error => {
                console.error("❌ error fetching artist image:", error);
                // Handle the error, retry the request, or perform other actions as necessary
            });
    }

    // Start fetching images for parts recursively, beginning with the first part
    fetchImagesRecursively(0);
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
      var fullName = track.name;
      var firstWord = fullName.split(",")[0].trim();
      artistName.textContent = firstWord;
      artistName.classList.add("data_top_name_bigger");
      trackDiv.appendChild(artistName);

      topArtistDiv.appendChild(trackDiv);
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

fetchData();