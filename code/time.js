//time format switcher
// Function to update the clock format in the localStorage
function updateClockFormat(format) {
  localStorage.setItem('clockFormat', format);
  document.getElementById('timeFormatBtn').textContent = format;
}

// Function to initialize the clock format on page load
function initializeClockFormat() {
  var clockFormat = localStorage.getItem('clockFormat');
  if (clockFormat) {
    document.getElementById('timeFormatBtn').textContent = clockFormat;
  } else {
    updateClockFormat('12-hour'); // Default format
  }
}

// Toggle the clock format on button click
document.getElementById('timeFormatBtn').addEventListener('click', function() {
  var currentFormat = localStorage.getItem('clockFormat');
  if (currentFormat === '12-hour') {
    updateClockFormat('24-hour');
  } else {
    updateClockFormat('12-hour');
  }
});

// Initialize the clock format on page load
initializeClockFormat();




//bday countdown
    function startCountdown(birthdayMonth, birthdayDay) {
      // Set the target date for the countdown
      let targetYear = new Date().getFullYear();
      const targetDate = new Date(targetYear, birthdayMonth - 1, birthdayDay, 0, 0, 0).getTime();
    
      // If the target date has already passed, add 1 to the year
      if (Date.now() > targetDate) {
        targetYear++;
      }
    
      const nextTargetDate = new Date(targetYear, birthdayMonth - 1, birthdayDay, 0, 0, 0).getTime();
    
      // Calculate the remaining time until the target date
      const now = new Date().getTime();
      const remainingTime = nextTargetDate - now;
    
      // Calculate the age based on the birth date that falls on the target year
      const age = targetYear - `${bday_year}` - 1;
    
      // If the target date has passed, display "BIRFDAY!!!" and update the age
      if (remainingTime <= 0) {
        document.getElementById("birthday").innerHTML = "BIRFDAY!!! (Age: " + (age + 1) + ")";
        setTimeout(() => startCountdown(birthdayMonth, birthdayDay), 86400000); // Start a new countdown in 24 hours
        return;
      }
    
      // Otherwise, display the countdown in days and age
      const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
      document.getElementById("birthday").innerHTML = + age + " <span style='font-size:1rem'>( "+ (age + 1) + " in " + remainingDays + " days)</span>";
    
      // Update the countdown every second
      setTimeout(() => startCountdown(birthdayMonth, birthdayDay), 1000);
    }
    
    // Calculate the initial age based on the birth date in the current year
    let age = new Date().getFullYear() - `${bday_year}` - 1;
    
    // Create a MutationObserver to watch for changes to the DOM
    const observer = new MutationObserver(function(mutations) {
      // Check if the birthday element has been added to the DOM
      const birthdayElement = document.getElementById("birthday");
      if (birthdayElement) {
        // Start the countdown with the given birthday month and day
        startCountdown(`${bday_month}`, `${bday_day}`); // September 6th
        // Disconnect the observer since we don't need it anymore
        observer.disconnect();
      }
    });
    
    // Watch for changes to the body element and its descendants
    observer.observe(document.body, { childList: true, subtree: true });