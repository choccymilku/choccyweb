

function getToken() {
  var basicAuth = btoa(`${clientId}:${clientSecret}`);
  fetch("https://accounts.spotify.com/api/token", {
      headers: {
          "Authorization": `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      body: "grant_type=client_credentials"
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`Failed to retrieve Spotify token: ${response.status} - ${response.statusText}`);
      }
      return response.json();
  })
  .then(data => {
      spotifyToken = data.access_token;
      console.log("🐛 spotify token acquired:");
  })
  .catch(error => {
      console.error("Error acquiring Spotify token:", error);
      // Handle the error, retry the request, or perform other actions as necessary
  });
}

function fetchTopArtistsFromLastFM() {
  try {
      fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${lastFmUsername}&api_key=${lastFmApiKey}&limit=${numberOfTracks + 1}&format=json`)
      .then(response => {
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          return response.json();
      })
      .then(data => {
          console.log("🐛 top artists - last.fm", data);
          displayTopArtists(data.topartists.artist);
      })
      .catch(error => {
          console.error("Error fetching recently listened tracks from Last.fm API:", error);
          // Handle the error, retry the request, or perform other actions as necessary
      });
  } catch (err) {
      console.error("Last.fm request error:", err);
      // Handle the error, retry the request, or perform other actions as necessary
  }
}

function fetchTopTracksFromLastFM() {
  try {
      fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${lastFmUsername}&api_key=${lastFmApiKey}&limit=${numberOfTracks}&format=json`)
      .then(response => {
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          return response.json();
      })
      .then(data => {
          console.log("🐛 top tracks - last.fm", data);
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
          console.log("Song not found on Spotify.");
      }
  });
}

function fetchSpotifyArtistImage(artistName, trackDiv) {
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
            console.log("Artist not found on Spotify.");
            return; // All parts have been tried, and the artist is still not found
        }

        fetchArtistImageForPart(artistParts[index])
            .then(res => {
                if (res.artists.items.length >= 1) {
                    // Artist found, display the image
                    var imageUrl = res.artists.items[0].images[0].url;
                    var imageElement = document.createElement("img");
                    imageElement.src = imageUrl;
                    imageElement.className = "lastfm_image noselect disabledrag"; // Modify the class name as needed
                    trackDiv.appendChild(imageElement);
                } else {
                    // Artist not found for this part, try the next one
                    fetchImagesRecursively(index + 1);
                }
            })
            .catch(error => {
                console.error("Error fetching artist image:", error);
                // Handle the error, retry the request, or perform other actions as necessary
            });
    }

    // Start fetching images for parts recursively, beginning with the first part
    fetchImagesRecursively(0);
}

  



function displayTopArtists(tracks) {
  var topTracksDiv = document.getElementById("lastfm_artist");
  // Limit the displayed tracks to numberOfTracks
  tracks = tracks.slice(0, numberOfTracks);
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



// Initial token retrieval and fetching top tracks
getToken();
fetchTopTracksFromLastFM();
fetchTopArtistsFromLastFM();