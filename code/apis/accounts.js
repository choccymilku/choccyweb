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
  domain: "https://",
};

function fetchAndUpdateIcons() {
  fetch(`https://dcdn.dstn.to/profile/${discord_user_id}`)
    .then(response => response.json())
    .then(data => {
      const connections = data.connected_accounts;
      const connectionsContainer = document.getElementById("accounts");
      const discordUser = data.user;

      
const avatarUrl = `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.${avatarFormat}?size=${avatarSize}`;

const avatarLinkElement = document.getElementById('pfp_link');
avatarLinkElement.href = `https://discordapp.com/users/${discordUser.id}`;
avatarLinkElement.innerHTML = '<i class="fa-brands fa-discord" class="icon-style"></i>' + '<span class="connection-name" style="margin-left: 2px;">' + discordUser.username + '</span>';
avatarLinkElement.target = '_blank';

const avatarImg = document.getElementById('pfp');
avatarImg.src = avatarUrl;

      // Clear the existing icons
      connectionsContainer.innerHTML = "";

      for (const conn of connections) {
        if (
            conn.type === "epicgames" ||
            conn.type === "leagueoflegends" ||
            conn.type === "riotgames" ||
            conn.type === "crunchyroll" ||
            conn.type === "battlenet"
        ) {
            // Skip unwanted connections
            continue;
        }


        const connDiv = createConnectionDiv(conn);
        connectionsContainer.appendChild(connDiv);
      }

      // Adding custom connections
      const customConnections = [];

        // Fetch the Roblox displayName using the Roblox API
        fetch(`https://api.choccymilk.uk/roblox/${encodeURIComponent(roblox_id)}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok.');
            }
            return response.json();
          })
          .then(data => {
            console.log(data);
            const roblox_username = data.displayName;
            const roblox_id = data.id;
            customConnections.push({ type: "roblox", id: roblox_id, name: roblox_username });
            
            // Check if the Mastodon connection already exists before adding it
            const existingMastodonConnection = customConnections.find(conn => conn.type === "mastodon");
            if (!existingMastodonConnection && mastodon_username) {
              customConnections.push({ type: "mastodon", id: mastodon_username, name: mastodon_username });
            }

            const existingBskyConnection = customConnections.find(conn => conn.type === "bsky");
            if (!existingBskyConnection && bsky_name) {
              customConnections.push({ type: "bsky", id: bsky_name, name: bsky_name });
            }

            const existingCoHostConnection = customConnections.find(conn => conn.type === "co-host");
            if (!existingCoHostConnection && co_host_name) {
              customConnections.push({ type: "co-host", id: co_host_name, name: co_host_name });
            }
      
            // Add all custom connections to the connectionsContainer
            for (const conn of customConnections) {
              const connDiv = createConnectionDiv(conn);
              connectionsContainer.appendChild(connDiv);
            }
          })
          .catch(error => {
            console.error('Error fetching Roblox data:', error);
          });
      
      for (const conn of customConnections) {
        const connDiv = createConnectionDiv(conn);
        connectionsContainer.appendChild(connDiv);
      }
    });
}

function createConnectionDiv(connection) {
  const userId = connection.name;
  let url = accountUrls[connection.type] + userId;
  const name = connection.name;

  const connDiv = document.createElement("a");
  connDiv.classList.add("connection-div");
  connDiv.target = "_blank";

  // Create the <span> element for the name
  const nameSpan = document.createElement("span");
  nameSpan.textContent = name;
  nameSpan.classList.add("connection-name");

  if (connection.type === "steam") {
    const steamUrl = `https://api.choccymilk.uk/steam-summary`;

    // Fetch Steam user info using Steam API with CORS proxy
    fetch(steamUrl)
    .then(response => response.json())
    .then(data => {
        const steamData = data.response.players[0];
        const profileUrl = steamData.profileurl;

        // Use profileUrl for the Steam connection
        url = profileUrl;

        // Assign the url to the connection div
        connDiv.href = url;

      })
      .catch(error => {
          console.error('Error fetching Steam data:', error);
      });
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

 if (connection.type === "roblox") {
    // Create the SVG element for the Roblox icon
    const robloxIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    robloxIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    robloxIcon.setAttribute("x", "0px");
    robloxIcon.setAttribute("y", "0px");
    robloxIcon.setAttribute("width", "50");
    robloxIcon.setAttribute("height", "50");
    robloxIcon.setAttribute("viewBox", "0 0 50 50");
    robloxIcon.classList.add("icon-style-roblox");
  
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M 12.125 1.9980469 A 1.0001 1.0001 0 0 0 11.199219 2.7441406 L 2.0332031 37.576172 A 1.0001 1.0001 0 0 0 2.7460938 38.798828 L 37.580078 47.966797 A 1.0001 1.0001 0 0 0 38.802734 47.253906 L 47.96875 12.419922 A 1.0001 1.0001 0 0 0 47.255859 11.197266 L 12.421875 2.03125 A 1.0001 1.0001 0 0 0 12.125 1.9980469 z M 21.5 19 L 31 21.5 L 28.5 31 L 19 28.5 L 21.5 19 z");
    
    // Append the path to the SVG element
    robloxIcon.appendChild(path);
  
    // Append the Roblox icon (SVG) to the link element
    connDiv.appendChild(robloxIcon);
  } else if (connection.type === "co-host") {
    const coHostIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    coHostIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    coHostIcon.setAttribute("class", "icon-style-cohost");
    coHostIcon.setAttribute("width", "24");
    coHostIcon.setAttribute("height", "24");
    coHostIcon.setAttribute("viewBox", "0 0 24 24");
    coHostIcon.setAttribute("stroke-width", "2");
    coHostIcon.setAttribute("stroke", "currentColor");
    coHostIcon.setAttribute("fill", "none");
    coHostIcon.setAttribute("stroke-linecap", "round");
    coHostIcon.setAttribute("stroke-linejoin", "round");
  
    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("stroke", "none");
    path1.setAttribute("d", "M0 0h24v24H0z");
    path1.setAttribute("fill", "none");
  
    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M17 14m-3 0a3 2 0 1 0 6 0a3 2 0 1 0 -6 0");
  
    const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path3.setAttribute("d", "M4.526 17.666c-1.133 -.772 -1.897 -1.924 -2.291 -3.456c-.398 -1.54 -.29 -2.937 .32 -4.19c.61 -1.255 1.59 -2.34 2.938 -3.254c1.348 -.914 2.93 -1.625 4.749 -2.132c1.81 -.504 3.516 -.708 5.12 -.61c1.608 .1 2.979 .537 4.112 1.31s1.897 1.924 2.291 3.456c.398 1.541 .29 2.938 -.32 4.192c-.61 1.253 -1.59 2.337 -2.938 3.252c-1.348 .915 -2.93 1.626 -4.749 2.133c-1.81 .503 -3.516 .707 -5.12 .61c-1.608 -.102 -2.979 -.538 -4.112 -1.31z");
  
    const path4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path4.setAttribute("d", "M11 12.508c-.53 -.316 -1.23 -.508 -2 -.508c-1.657 0 -3 .895 -3 2s1.343 2 3 2c.767 0 1.467 -.192 2 -.508");
  
    coHostIcon.appendChild(path1);
    coHostIcon.appendChild(path2);
    coHostIcon.appendChild(path3);
    coHostIcon.appendChild(path4);
    
    connDiv.appendChild(coHostIcon);
  } else if (connection.type === "bsky") {
    // use fontawesome icon
    const bskyIcon = document.createElement("i");
    bskyIcon.classList.add("fa-solid", "fa-cloud", "icon-style-bsky");
    connDiv.appendChild(bskyIcon);
  }
    else if (connection.type === "domain") {
    const globeIcon = document.createElement("i");
    globeIcon.classList.add("fa-solid", "fa-globe", "icon-style");
    connDiv.appendChild(globeIcon);
  } else {  
    // Create the font awesome icon element
    const icon = document.createElement("i");
    icon.classList.add("fa-brands", "fa-" + connection.type, "icon-style");

    // Append the icon to the link element
    connDiv.appendChild(icon);
  }

  // Append the nameSpan to the link element
  connDiv.appendChild(nameSpan);
  connDiv.classList.add("noselect");

  return connDiv;
}

// Call the fetchAndUpdateIcons function initially
fetchAndUpdateIcons();