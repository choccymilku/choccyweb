const url = `https://en.pronouns.page/api/profile/get/${pronounspage_username}?version=2`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    // Get the "flags" value from the response
    const flags = data.profiles.en.flags;
    const customFlags = data.profiles.en.customFlags;
    const pronouns = data.profiles.en.pronouns;

// Get the container for the pronouns
const pronounspagePronounsContainer = document.getElementById("pronouns");

// Generate an array of pronoun values
const pronounValues = pronouns.map(pronoun => pronoun.value);

// Create a <span> element to hold the pronoun values
const pronounSpan = document.createElement("span");
pronounSpan.textContent = pronounValues.join("/") + " pronouns";
pronounSpan.className = "pronoun-values";

// Append the <span> element and comma to the container
pronounspagePronounsContainer.appendChild(pronounSpan);

const generateFlagElement = (flag) => {
  const flagUrl = `https://en.pronouns.page/flags/${flag}.png`;
  const terminologyUrl = `https://en.pronouns.page/terminology#${flag}`;
  const flagLink = document.createElement('a');
  flagLink.href = terminologyUrl;
  flagLink.target = '_blank';
  
  // Remove non-alphabetical characters from the flag name
  const cleanFlagName = flag.toLowerCase().replace(/[^a-z]+/g, '');
  flagLink.textContent = cleanFlagName + ' '; // Add an extra space after the flag name
  flagLink.className = 'flag-name';

  const flagImg = document.createElement('img');
  flagImg.src = flagUrl;
  flagImg.alt = flag;
  flagImg.className = 'flag-emojis';

  flagLink.appendChild(flagImg);
  return flagLink;
};


const generateCustomFlagElement = (customFlag) => {
  const customFlagUrl = `https://dclu0bpcdglik.cloudfront.net/images/${customFlag.value}-flag.png`;
  const customFlagName = customFlag.name;
  const customFlagLink = document.createElement('a');
  customFlagLink.textContent = customFlagName.toLowerCase() + ' '; // Add an extra space after the flag name

  if (customFlag.link && customFlag.link.trim() !== '') {
    customFlagLink.href = customFlag.link;
    customFlagLink.target = '_blank';
    customFlagLink.className = 'flag-name';
  } else {
    customFlagLink.className = 'flag-name-null';
  }

  const customFlagImg = document.createElement('img');
  customFlagImg.src = customFlagUrl;
  customFlagImg.alt = customFlag.name;
  customFlagImg.className = 'flag-emojis';

  customFlagLink.appendChild(customFlagImg);
  return customFlagLink;
};



    // Combine flags and customFlags into one array
    const allFlags = Array.isArray(flags) ? flags : [flags];
    const allCustomFlags = Array.isArray(customFlags) ? customFlags : [customFlags];
    const combinedFlags = [...allFlags, ...allCustomFlags];

    // Generate flag elements
    const flagElements = combinedFlags.map((flag, index) => {
      if (typeof flag === 'string') {
        return generateFlagElement(flag, index === combinedFlags.length - 1);
      } else {
        return generateCustomFlagElement(flag);
      }
    });

    // Replace the "flags" element with flag elements
    const flagsContainer = document.getElementById('flags');
    while (flagsContainer.firstChild) {
      flagsContainer.removeChild(flagsContainer.firstChild);
    }
    flagElements.forEach(flag => {
      flagsContainer.appendChild(flag);
    });

    // Additional code for separating flags with commas and ampersands if there are multiple flags
    if (flagElements.length > 1) {
      const ampersand = document.createElement('span');
      ampersand.textContent = ' & ';

      flagElements.forEach((flag, index) => {
        if (index > 0) {
          if (index === flagElements.length - 1) {
            flag.parentNode.insertBefore(ampersand.cloneNode(true), flag);
          } else {
            const comma = document.createElement('span');
            comma.textContent = ' ';
            flag.parentNode.insertBefore(comma, flag);
          }
        }
      });
    }

    const timezone = data.profiles.en.timezone.tz;

    function updateClock(timezone) {
      const now = new Date();
    
      // Display time in the specified timezone
      const clockFormat = localStorage.getItem('clockFormat');
      const timeOptions = {
        hour12: clockFormat === '12-hour', // Use 12-hour format if clockFormat is '12-hour'
        hour: '2-digit', // Use 2-digit format for the hour
        minute: '2-digit',
        timeZone: timezone
      };
      const timeString = now.toLocaleTimeString([], timeOptions);
    
      // Replace "00" with "12" in the formatted time for 12-hour format
      if (clockFormat === '12-hour') {
        formattedTime = timeString.replace(/^00/, '12');
      } else {
        formattedTime = timeString;
      }
    
      // Capitalize "am" and "pm"
      formattedTime = formattedTime.replace(/am|pm/gi, match => match.toUpperCase());
    
      // Display the day of the week
      const dayOptions = {
        weekday: 'short'
      };
      const dayString = now.toLocaleDateString([], dayOptions);
    
      const clockText = `${formattedTime} / ${dayString}`;
    
      // Update the clock element with the formatted time, day, and offset
      clockElement.innerHTML = `${clockText}`;
    }
    
    let clockElement = document.getElementById('clock');
    
    // Call updateClock once immediately when the page loads
    updateClock(timezone);
    
    // Then, update the clock every second
    setInterval(() => updateClock(timezone), 1000);
    
  })

  .catch(error => {
    // Handle any errors
    console.error('Error:', error);
  });