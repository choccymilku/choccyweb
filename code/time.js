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
    console.log('Clock format changed to 24-hour');
    window.location.reload();
  } else {
    updateClockFormat('12-hour');
    console.log('Clock format changed to 12-hour');
    window.location.reload();
  }
});

// Initialize the clock format on page load
initializeClockFormat();