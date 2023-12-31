let spanAdded = false;
let currentTrackId = null;
let progressTimeout;

function resetUI() {
    document.getElementById("music").style.display = "none";
}

function fetchDataAndUpdateUI() {
    fetch("https://api.choccymilk.uk/nowplaying")
    .then(response => response.json())
    .then(data => {
        const trackId = data.nowPlaying.trackId;
        
        if (trackId !== currentTrackId) {
            // If the song has changed, reset the UI and update currentTrackId
            resetUI();
            currentTrackId = trackId;
        }

        simulateProgressAndUpdateUI(data);
    })
    fetch(`https://api.choccymilk.uk/discorduser`)
      .then(response => response.json())
      .then(data => {
        const status = data.status;

        document.getElementById("avatar").src = data.avatar;

        const statusCaseDiv = document.getElementById("avatar");
  
        if (status === "online") {
          statusCaseDiv.style.backgroundColor = "#43b581";
        } else if (status === "idle") {
          statusCaseDiv.style.backgroundColor = "#faa61a";
        } else if (status === "dnd") {
          statusCaseDiv.style.backgroundColor = "#f04747";
        } else if (status === "offline") {
          statusCaseDiv.style.backgroundColor = "#747f8d";
        } // if error is returned, do nothing
         else {
          console.log(`🐛 error: ${status}`);
        }
      })

    .catch(error => {
        // Handle any errors that occurred during the fetch operation
        console.error("Error fetching data: " + error);

        // Reset the UI in case of an error
        resetUI();
    })
    .finally(() => {
        // Schedule the next data fetch after 10 seconds
        setTimeout(fetchDataAndUpdateUI, 10000);
    });
}

function simulateProgressAndUpdateUI(data) {
    // Extract track information from the response data
    const name = data.nowPlaying.name; // Track name
    const artist = data.nowPlaying.artist; // Artist name (assuming there is always at least one artist)
    const cover = data.nowPlaying.imageUrl; // Cover art URL
    const progress = data.nowPlaying.progress_ms; // Progress in milliseconds
    const duration = data.nowPlaying.duration_ms; // Duration in milliseconds
    const isPlaying = data.isPlaying; // Boolean value indicating whether a track is currently playing
    const local = data.nowPlaying.local;

    if (isPlaying === true) {
        document.getElementById("music").style.display = "block";

        if (local === true) {
          const sanitizedName = encodeURIComponent(name.replace(/\s*\(?\d+%?\)?\s*\+?\s*reverb\s*/gi, '').trim());
          const sanitizedArtist = encodeURIComponent(artist.trim());
        
          fetch('https://api.choccymilk.uk/sound-search/' + sanitizedName + '/' + sanitizedArtist)
            .then(response => response.json())
            .then(data => {
              if (data.length === 0) {
                document.getElementById("music_artist").innerHTML = "by " + artist;
                document.getElementById("music_cover").src = data.nowPlaying.imageUrl;
                document.getElementById("music_link_wrapper").href = data.nowPlaying.url;
                document.getElementById("music_song").innerHTML = `<span id="music_song_text">${name}</span><span class="icons8-soundcloud icon-music-style-soundcloud"></span>`;
            
                // if music_link_wrapper is hovered, change the color of music_song_text
                document.getElementById("music_link_wrapper").addEventListener("mouseenter", function () {
                  document.getElementById("music_song_text").style.color = "#1fd760";
                });
                document.getElementById("music_link_wrapper").addEventListener("mouseleave", function () {
                  document.getElementById("music_song_text").style.color = "";
                });
                // also work for mobile
                document.getElementById("music_link_wrapper").addEventListener("touchstart", function () {
                  document.getElementById("music_song_text").style.color = "#1fd760";
                });
                document.getElementById("music_link_wrapper").addEventListener("touchend", function () {
                  document.getElementById("music_song_text").style.color = "";
                });
              } else {
              const music_cover_url = data[0].art;
              document.getElementById("music_cover").src = music_cover_url;
        
              const trackUrl = data[0].url;            
              document.getElementById("music_link_wrapper").href = trackUrl;

              const trackName = data[0].title;
              document.getElementById("music_song").innerHTML = `<span id="music_song_text">${trackName}</span><span class="icons8-soundcloud icon-music-style-soundcloud"></span>`;
              document.getElementById("music_song_text").style.maxWidth = "calc(100% - 55px)";

              const artistUrl = data[0].artist;
              document.getElementById("music_artist").innerHTML = "by " + artistUrl;

              // if music_link_wrapper is hovered, change the color of music_song_text
              document.getElementById("music_link_wrapper").addEventListener("mouseenter", function () {
                document.getElementById("music_song_text").style.color = "#ff5500";
              });
              document.getElementById("music_link_wrapper").addEventListener("mouseleave", function () {
                document.getElementById("music_song_text").style.color = "";
              });
              // also work for mobile
              document.getElementById("music_link_wrapper").addEventListener("touchstart", function () {
                document.getElementById("music_song_text").style.color = "#ff5500";
              });
              document.getElementById("music_link_wrapper").addEventListener("touchend", function () {
                document.getElementById("music_song_text").style.color = "";
              });
        
              if (cover === null) {
                document.getElementById("music_cover").src = data[0].art;
              }
            }
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });        
            // if search fails, do nothing
        } else {
          document.getElementById("music_artist").innerHTML = "by " + artist;
          document.getElementById("music_cover").src = data.nowPlaying.imageUrl;
          document.getElementById("music_link_wrapper").href = data.nowPlaying.url;
          document.getElementById("music_song").innerHTML = `<span id="music_song_text">${name}</span><span class="icons8-spotify icon-music-style-spotify"></span>`;
          // if music_link_wrapper is hovered, change the color of music_song_text
          document.getElementById("music_link_wrapper").addEventListener("mouseenter", function () {
            document.getElementById("music_song_text").style.color = "#1fd760";
          });
          document.getElementById("music_link_wrapper").addEventListener("mouseleave", function () {
            document.getElementById("music_song_text").style.color = "";
          });
          // also work for mobile
          document.getElementById("music_link_wrapper").addEventListener("touchstart", function () {
            document.getElementById("music_song_text").style.color = "#1fd760";
          });
          document.getElementById("music_link_wrapper").addEventListener("touchend", function () {
            document.getElementById("music_song_text").style.color = "";
          });
        }

        // Reset progress if the song has just started
        if (progress === 0) {
            document.getElementById("music_progress_bar").style.width = "0%";
        }

        // Simulate progress updates every second
        clearTimeout(progressTimeout);

        // Simulate progress updates every second
        const interval = 1000; // 1 second
        let simulatedProgress = progress;
        
        const updateProgress = () => {
            if (simulatedProgress <= duration) {
                document.getElementById("music_progress_bar").style.width = ((simulatedProgress / duration) * 100) + "%";
                document.getElementById("music_progress_bar").style.backgroundColor = "var(--icon)";
                simulatedProgress += interval;
                progressTimeout = setTimeout(updateProgress, interval);
            } else {
                fetchDataAndUpdateUI();
            }
        };

        // Start simulating progress updates
        updateProgress();;

    } else {
        resetUI();
    }
}

// Call the function initially to start fetching data and updating UI
fetchDataAndUpdateUI();
