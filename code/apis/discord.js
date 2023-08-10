let ws;
let connected = false;
let reconnectTimeout;

function connect() {
  ws = new WebSocket('wss://api.lanyard.rest/socket');

  ws.addEventListener('open', () => {
    ws.send(JSON.stringify({
      op: 2,
      d: {
        subscribe_to_id: discord_user_id
      }
    }));
    connected = true;
  });

  ws.addEventListener('error', event => {
    console.error('WebSocket error', event);
  });

  ws.addEventListener('close', event => {
    console.log('📰 lanyard WebSocket disconnected!');
    connected = false;
    // Reconnect after a timeout (e.g., 5 seconds)
    reconnectTimeout = setTimeout(() => connect(), 0);
  });

  ws.addEventListener('message', event => {
    const data = JSON.parse(event.data);
    console.log('📰 lanyard API call successful! fetching API data', data); // Add this line to log the data
    if (data.op === 1) {
      updateStatus(data.d);
    } else if (data.op === 0) {
      updateStatus(data.d);
    }
  });
}

function updateStatus(data) {
  // Update the status logic here
}

function startWebSocket() {
  if (!connected) {
    connect();
  }
}

function stopWebSocket() {
  if (connected) {
    ws.close();
    clearTimeout(reconnectTimeout);
    connected = false;
  }
}

// Start the WebSocket connection
startWebSocket();


function updateStatus(data) {
  const userStatus = data.discord_status;

const activities = data.activities;
  const customStatus = activities ? activities.find(activity => activity.type === 4) : null;
  const activityState = customStatus ? customStatus.state : null;

  const statusCaseDiv = document.getElementById('status');
const statusCaseText = document.getElementById('status_text');

  switch (userStatus) {
    case 'online':
      //statusCaseDiv.innerHTML = '<h6 style="font-size:0.8rem;">online</h6>';
      statusCaseDiv.style.backgroundColor = '#2bca6d';
      statusCaseText.textContent = 'online';
      break;
    case 'idle':
      //statusCaseDiv.innerHTML = '<h6 style="font-size:0.8rem;">idle</h6>';
      statusCaseDiv.style.backgroundColor = '#f0b232';
      statusCaseText.textContent = 'idle';
      break;
    case 'dnd':
      //statusCaseDiv.innerHTML = '<h6 style="font-size:0.8rem;margin-left:-1px;">dnd</h6>';
      statusCaseDiv.style.backgroundColor = '#f23f43';
      statusCaseText.textContent = 'dnd';
      break;
    case 'offline':
      //statusCaseDiv.innerHTML = '<h6 style="font-size:0.8rem;margin-left:-2px;">offline</h6>';
      statusCaseDiv.style.backgroundColor = '#7e828c';
      statusCaseText.textContent = 'offline';
      break;
    default:
      //statusCaseDiv.innerHTML = '<h6 style="font-size:0.8rem;">¯\_(ツ)_/¯</h6>';
      statusCaseDiv.style.backgroundColor = '#23a459';
  }


  const discordUser = data.discord_user;
  if (discordUser) {
    const avatarHash = discordUser.avatar;
/*     const discordusername = `${discordUser.username}`;
    const discordtag = `${discordUser.discriminator}`; */

const avatarUrl = `https://cdn.discordapp.com/avatars/${discordUser.id}/${avatarHash}.png?size=2048`;

const avatarLinkElement = document.getElementById('pfp_link');
avatarLinkElement.href = `https://discordapp.com/users/${discordUser.id}`;
avatarLinkElement.innerHTML = '<i class="fa-brands fa-discord" class="icon-style"></i>' + '<span class="connection-name" style="margin-left: 2px;">' + discordUser.username + '</span>';
avatarLinkElement.target = '_blank';

const avatarImg = document.getElementById('pfp');
avatarImg.src = avatarUrl;
}}
