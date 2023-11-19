// Function to determine if the user prefers 12-hour or 24-hour clock format based on locale
function getUserClockPreference() {
  const sampleDate = new Date(Date.UTC(2023, 0, 1, 13)); // January is 0-based in JavaScript dates

  const options = {
    hour: 'numeric',
  };

  const formattedTime = new Intl.DateTimeFormat(undefined, options).formatToParts(sampleDate);

  for (const part of formattedTime) {
    if (part.type === 'dayPeriod') {
      return part.value.toLowerCase() === 'am';
    }
  }

  // Default to 24-hour clock if unable to determine user preference
  return false;
}

// Get user preference (true for 12-hour clock, false for 24-hour clock)
const userPrefers12HourClock = getUserClockPreference();

// Display user preference in the console
console.log(`User prefers ${userPrefers12HourClock ? '12-hour' : '24-hour'} clock format.`);
