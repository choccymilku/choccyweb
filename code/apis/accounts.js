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
  steam: "https://steamcommunity.com/profiles/",
  tiktok: "https://www.tiktok.com/@",
  facebook: "https://www.facebook.com/",
};

function fetchAndUpdateIcons() {
  fetch(`https://dcdn.dstn.to/profile/${discord_user_id}`)
    .then(response => response.json())
    .then(data => {
      const connections = data.connected_accounts;
      const connectionsContainer = document.getElementById("accounts");

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

      if (roblox_id) {
        // Fetch the Roblox displayName using the Roblox API
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://users.roblox.com/v1/users/${roblox_id}`)}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok.');
            }
            return response.json();
          })
          .then(data => {
            const apiResponse = JSON.parse(data.contents);
            const robloxDisplayName = apiResponse.displayName;
            customConnections.push({ type: "roblox", id: roblox_id, name: robloxDisplayName });
            
            // Check if the Mastodon connection already exists before adding it
            const existingMastodonConnection = customConnections.find(conn => conn.type === "mastodon");
            if (!existingMastodonConnection && mastodon_username) {
              customConnections.push({ type: "mastodon", id: mastodon_username, name: mastodon_username });
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
      }
      
      for (const conn of customConnections) {
        const connDiv = createConnectionDiv(conn);
        connectionsContainer.appendChild(connDiv);
      }
    });
}

function createConnectionDiv(connection) {
  const url = accountUrls[connection.type] + connection.id;
  const name = connection.name;

  const connDiv = document.createElement("a");
  connDiv.classList.add("connection-div");
  connDiv.href = url;
  connDiv.target = "_blank";

  // Create the icon element
  const icon = document.createElement("i");
  icon.classList.add("fa-brands", "fa-" + connection.type, "icon-style");

  // Create the <span> element for the name
  const nameSpan = document.createElement("span");
  nameSpan.textContent = name;
  nameSpan.classList.add("connection-name");

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
  } else {  
    // Create the font awesome icon element
    const icon = document.createElement("i");
    icon.classList.add("fa-brands", "fa-" + connection.type, "icon-style");

    // Append the icon to the link element
    connDiv.appendChild(icon);
  }
  // Append the nameSpan to the icon element
  connDiv.appendChild(nameSpan);

  connDiv.classList.add("noselect");

  return connDiv;
}

// Call the fetchAndUpdateIcons function initially
fetchAndUpdateIcons();
