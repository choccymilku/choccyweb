const accountUrls = {
  roblox: `https://www.roblox.com/users/${roblox_id}/profile`,
  mastodon: `https://mastodon.social/@${mastodon_username}`,
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

function addRobloxConnection() {
  const connectionsContainer = document.getElementById("accounts");

  const robloxDiv = document.createElement("div");
  robloxDiv.classList.add("connection-div");
  robloxDiv.classList.add("connection-roblox");

  const robloxIcon = document.createElement("span");
  robloxIcon.classList.add("connection-icons-custom");

  const robloxSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  robloxSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  robloxSvg.setAttribute("x", "0px");
  robloxSvg.setAttribute("y", "0px");
  robloxSvg.setAttribute("width", "88");
  robloxSvg.setAttribute("height", "88");
  robloxSvg.setAttribute("viewBox", "0 0 50 50");
  robloxSvg.classList.add("custom-icon");

  const robloxPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  robloxPath.setAttribute("d", "M 12.125 1.9980469 A 1.0001 1.0001 0 0 0 11.199219 2.7441406 L 2.0332031 37.576172 A 1.0001 1.0001 0 0 0 2.7460938 38.798828 L 37.580078 47.966797 A 1.0001 1.0001 0 0 0 38.802734 47.253906 L 47.96875 12.419922 A 1.0001 1.0001 0 0 0 47.255859 11.197266 L 12.421875 2.03125 A 1.0001 1.0001 0 0 0 12.125 1.9980469 z M 21.5 19 L 31 21.5 L 28.5 31 L 19 28.5 L 21.5 19 z");

  robloxSvg.appendChild(robloxPath);
  robloxIcon.appendChild(robloxSvg);
  robloxDiv.appendChild(robloxIcon);

  const robloxLink = document.createElement("a");
  robloxLink.href = accountUrls.roblox;
  robloxLink.target = "_blank";
  robloxLink.appendChild(robloxIcon);

  robloxDiv.appendChild(robloxLink);
  robloxDiv.classList.add("noselect");

  connectionsContainer.insertBefore(robloxDiv, connectionsContainer.firstChild);
}


function addMastodonConnection() {
  const connectionsContainer = document.getElementById("accounts");

  const mastodonDiv = document.createElement("div");
  mastodonDiv.classList.add("connection-div");
  mastodonDiv.classList.add("connection-mastodon");

  const mastodonIcon = document.createElement("i");
  mastodonIcon.classList.add("fa-brands", "fa-mastodon", "icon-style", "connection-icons");
  mastodonDiv.appendChild(mastodonIcon);

  const mastodonLink = document.createElement("a");
  mastodonLink.href = accountUrls.mastodon;
  mastodonLink.target = "_blank";
  mastodonLink.appendChild(mastodonIcon);

  mastodonDiv.appendChild(mastodonLink);
  mastodonDiv.classList.add("noselect");

  connectionsContainer.insertBefore(mastodonDiv, connectionsContainer.firstChild);
}

function createConnectionDiv(connection) {
  let url = accountUrls[connection.type] + connection.id;
  let name = connection.name;

  if (
    connection.type === "tiktok" ||
    connection.type === "twitter" ||
    connection.type === "reddit" ||
    connection.type === "instagram" ||
    connection.type === "twitch" ||
    connection.type === "github"
  ) {
    url = accountUrls[connection.type] + connection.name;
    name = connection.name;
  }

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

 
 // Append the icon to the link element
 connDiv.appendChild(icon);

 // Append the nameSpan to the icon element
 connDiv.appendChild(nameSpan);
 
 connDiv.classList.add("noselect");

 return connDiv;
}

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
          conn.type === "battlenet" ||
          conn.type === "roblox"
        ) {
          // Skip unwanted connections
          continue;      
        }

        const connDiv = createConnectionDiv(conn);
        connectionsContainer.appendChild(connDiv);
      }
    });
}

// Call the fetchAndUpdateIcons function initially
fetchAndUpdateIcons();