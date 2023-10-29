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

async function fetchData() {
    try {
        await getToken(); // Wait for the token to be retrieved
        
        await fetchTopArtistsFromLastFM();
        await fetchTopTracksFromLastFM();
    } catch (error) {
        console.error("Error fetching data:", error);
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
        var imageElement = document.createElement("img");
        imageElement.src = imageUrl;
        imageElement.className = "lastfm_image noselect disabledrag"; // Modify the class name as needed
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

function displayTopArtists(tracks) {
  var topTracksDiv = document.getElementById("lastfm_artist");
  tracks.forEach(track => {
      var trackDiv = document.createElement("div");
      trackDiv.className = "lastfm_container noselect disabledrag";

      var trackImage = document.createElement("div");
      fetchSpotifyArtistImage(track.name, trackImage);
      trackDiv.appendChild(trackImage);

      var playCount = document.createElement("div");
      playCount.textContent = track.playcount;
      playCount.classList.add("lastfm_playcount"); 
      trackDiv.appendChild(playCount);

      var artistName = document.createElement("div");
      var fullName = track.name;
      var firstWord = fullName.split(",")[0].trim();
      artistName.textContent = firstWord;
      artistName.classList.add("lastfm_artist_name");
      trackDiv.appendChild(artistName);

      topTracksDiv.appendChild(trackDiv);
  });
}
function displayTopTracks(tracks) {
  var topTracksDiv = document.getElementById("lastfm_top");
  tracks.forEach(track => {
      var trackDiv = document.createElement("div");
      trackDiv.className = "lastfm_container noselect disabledrag";

      var trackImage = document.createElement("div");
      fetchSpotifyImage(track.name, track.artist.name, trackImage);
      trackDiv.appendChild(trackImage);

      var playCount = document.createElement("div");
      playCount.textContent = track.playcount;
      playCount.classList.add("lastfm_playcount"); 
      trackDiv.appendChild(playCount);

      var trackName = document.createElement("div");
      trackName.textContent = track.name;
      trackName.classList.add("lastfm_name");
      trackDiv.appendChild(trackName);

      var artistName = document.createElement("div");
      artistName.textContent = track.artist.name;
      artistName.classList.add("lastfm_artist");
      trackDiv.appendChild(artistName);

      topTracksDiv.appendChild(trackDiv);
  });
}

fetchData();