var clientId = "83346dac54144a1eb3b29265f09caf83";
var clientSecret = "992ef057388a4e4589ed8ea36776b4bf";
var spotifyToken = "";
var lastFmApiKey = "53b12a31e5c9e626ef29a22967e54e63";
var lastFmUsername = "choccymilku";
var numberOfTracks = 10;

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
      console.log("Spotify Token acquired:", spotifyToken);
  })
  .catch(error => {
      console.error("Error acquiring Spotify token:", error);
      // Handle the error, retry the request, or perform other actions as necessary
  });
}

function fetchRecentlyListenedFromLastFM() {
  try {
      fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${lastFmUsername}&api_key=${lastFmApiKey}&limit=${numberOfTracks + 1}&format=json`)
      .then(response => {
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          return response.json();
      })
      .then(data => {
          console.log("Recently Listened Tracks from Last.fm Response:", data);
          displayRecentTracks(data.recenttracks.track);
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
          console.log("Top Tracks from Last.fm Response:", data);
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
          imageElement.className = "lastfm_top_song_image noselect disabledrag";
          trackDiv.appendChild(imageElement);
      } else {
          console.log("Song not found on Spotify.");
      }
  });
}

function displayRecentTracks(tracks) {
  var topTracksDiv = document.getElementById("lastfm_recent");
  // Limit the displayed tracks to numberOfTracks
  tracks = tracks.slice(0, numberOfTracks);
  tracks.forEach(track => {
      var trackDiv = document.createElement("a");
      trackDiv.className = "lastfm_top_song";
      trackDiv.href = track.url;
      trackDiv.target = "_blank";

      var trackImage = document.createElement("div");
      // Use the medium-sized image URL from Last.fm JSON response
      var imageUrl = track.image.find(img => img.size === "large")["#text"];
      var imageElement = document.createElement("img");
      imageElement.src = imageUrl;
      imageElement.className = "lastfm_top_recent_image noselect disabledrag";
      trackImage.appendChild(imageElement);
      trackDiv.appendChild(trackImage);

      var trackName = document.createElement("div");
      trackName.textContent = track.name;
      trackName.classList.add("lastfm_recent_name");
      trackDiv.appendChild(trackName);

      var artistName = document.createElement("div");
      artistName.textContent = track.artist["#text"];
      artistName.classList.add("lastfm_top_artist");
      trackDiv.appendChild(artistName);

      topTracksDiv.appendChild(trackDiv);
  });
}

function displayTopTracks(tracks) {
  var topTracksDiv = document.getElementById("lastfm_top");
  tracks.forEach(track => {
      var trackDiv = document.createElement("a");
      trackDiv.className = "lastfm_top_song";
      trackDiv.href = track.url;
      trackDiv.target = "_blank";

      var trackImage = document.createElement("div");
      fetchSpotifyImage(track.name, track.artist.name, trackImage); // Fetch Spotify image and set it in the img element
      trackDiv.appendChild(trackImage);

      var playCount = document.createElement("div");
      playCount.textContent = track.playcount;
      playCount.classList.add("lastfm_top_song_playcount"); 
      trackDiv.appendChild(playCount);

      var trackName = document.createElement("div");
      trackName.textContent = track.name;
      trackName.classList.add("lastfm_top_name");
      trackDiv.appendChild(trackName);

      var artistName = document.createElement("div");
      artistName.textContent = track.artist.name;
      artistName.classList.add("lastfm_top_artist");
      trackDiv.appendChild(artistName);

      topTracksDiv.appendChild(trackDiv);
  });
}



// Initial token retrieval and fetching top tracks
getToken();
fetchTopTracksFromLastFM();
fetchRecentlyListenedFromLastFM();