const accountUrls = {
  roblox: `https://www.roblox.com/users/`,
  mastodon: `https://mastodon.social/@`,
  twitter: "https://twitter.com/",
  twitch: "https://www.twitch.tv/",
  youtube: "https://www.youtube.com/channel/",
  instagram: "https://www.instagram.com/",
  spotify: "https://open.spotify.com/user/",
  github: "https://github.com/",
  reddit: "https://www.reddit.com/user/",
  tiktok: "https://www.tiktok.com/@",
  facebook: "https://www.facebook.com/",
  lastfm: "https://www.last.fm/user/",
  domain: "https://",
};

function fetchAndUpdateIcons() {
  fetch(`https://api.choccymilk.uk/discorduser`)
    .then(response => response.json())
    .then(data => {
      const connectionsContainer = document.getElementById("accounts");

      // if connections have visibility 0, dont show them
      const connections = data.connections.filter(conn => conn.visibility !== 0);

      // Clear the existing icons
      connectionsContainer.innerHTML = "";

      // Find the domain connection outside the loop
      const domainConnection = connections.find(conn => conn.type === "domain");

      // Check if domain connection exists and construct the domain URL
      const domainURL = domainConnection ? "https://" + domainConnection.name + "/" : null;
      const pageurl = window.location.href;

      // if lastfm appears twice, remove the second one
      const lastfmConnectionIndices = connections.reduce((indices, conn, index) => {
        if (conn.type === "lastfm") {
          indices.push(index);
        }
          return indices;
      }, []);

        if (lastfmConnectionIndices.length >= 2) {
          const secondLastfmConnectionIndex = lastfmConnectionIndices[1];
          connections.splice(secondLastfmConnectionIndex, 1);
        }

        if (domainURL === pageurl) {
            console.log(`🐛 urls are same, ignoring adding this domain to the list\n${domainURL} | ${pageurl}`);
        } else {
          console.log(`🐛 urls are not same, not doing anything\n${domainURL} | ${pageurl}`);
        }

        for (const conn of connections) {
          const isSameDomain = conn.type === "domain" && domainURL === pageurl;
  
          if (
            (conn.type === "epicgames" ||
            conn.type === "leagueoflegends" ||
            conn.type === "riotgames" ||
            conn.type === "crunchyroll" ||
            conn.type === "battlenet" ||
            isSameDomain)
          ) {
            // Skip this connection and continue to the next one
            continue;
          }
  
          // If the connection type is not one of the specified types or domainURL is not equal to pageurl, create connection div and append it to connectionsContainer
          const connDiv = createConnectionDiv(conn);
          
          // Add the connection to both containers
          connectionsContainer.appendChild(connDiv);
        }

      // Adding custom connections
      const customConnections = [];

        // Fetch the Roblox displayName using the Roblox API
            const roblox_id_show = roblox_id;
            customConnections.push({ type: "roblox", id: roblox_id_show });
            
            // Check if the Mastodon connection already exists before adding it
            const existingMastodonConnection = customConnections.find(conn => conn.type === "mastodon");
            if (!existingMastodonConnection && mastodon_username) {
              customConnections.push({ type: "mastodon", id: mastodon_username });
            }

            const existingBskyConnection = customConnections.find(conn => conn.type === "bsky");
            if (!existingBskyConnection && bsky_name) {
              customConnections.push({ type: "bsky", id: bsky_name });
            }

            const existingCoHostConnection = customConnections.find(conn => conn.type === "co-host");
            if (!existingCoHostConnection && co_host_name) {
              customConnections.push({ type: "co-host", id: co_host_name });
            }
      
            // Add all custom connections to the connectionsContainer
            for (const conn of customConnections) {
              const connDiv = createConnectionDiv(conn);
              connectionsContainer.appendChild(connDiv);
            }
          })
      
      for (const conn of customConnections) {
        const connDiv = createConnectionDiv(conn);
        connectionsContainer.appendChild(connDiv);
      }
}

function createConnectionDiv(connection) {
  const userId = connection.name;
  let url = accountUrls[connection.type] + userId;

  const connDiv = document.createElement("a");
  connDiv.classList.add("connection-div");
  connDiv.target = "_blank";

  if (connection.type === "steam") {
    const steamUrl = `https://api.choccymilk.uk/steam-user`;
    fetch(steamUrl)
    .then(response => response.json())
    .then(data => {
        const steamData = data.response.players[0];
        const profileUrl = steamData.profileurl;
        url = profileUrl;
        connDiv.href = url;

      })
  }
  
  // if connection is roblox, use connection.id instead of connection.name
  if (connection.type === "roblox" || connection.type === "youtube" || connection.type === "spotify") {
    url = accountUrls[connection.type] + connection.id;
  } else if (connection.type === "bsky") {
    url = "https://bsky.app/profile/" + bsky_name + ".bsky.social";
  } else if (connection.type === "co-host") {
    url = "https://cohost.org/" + co_host_name;
  }

  connDiv.href = url;

  if (connection.type === "bsky") {
    // use fontawesome icon
    const bskyIcon = document.createElement("i");
    bskyIcon.classList.add("fa-solid", "fa-cloud", "icon-style-bsky");
    connDiv.appendChild(bskyIcon);
  } else {  
    // Create the font awesome icon element
    const icon = document.createElement("span");
    icon.classList.add(`icons8-${connection.type}`, "icon-style");

    // Append the icon to the link element
    connDiv.appendChild(icon);
  }

  // Append the nameSpan to the link element
  connDiv.classList.add("noselect");

  return connDiv;
}

// Call the fetchAndUpdateIcons function initially
fetchAndUpdateIcons();