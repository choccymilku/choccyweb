// Check if local storage is available
if (Modernizr.localstorage) {
    // Get the value of the scrollbar width and height from local storage
    var scrollbarWidth = localStorage.getItem('scrollbarWidth');
    var scrollbarHeight = localStorage.getItem('scrollbarHeight');
    // If the values are not null, set the CSS variables and hide/show divs accordingly
    if (scrollbarWidth !== null && scrollbarHeight !== null) {
        document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth);
        document.documentElement.style.setProperty('--scrollbar-height', scrollbarHeight);
        
        // Hide/show divs based on scrollbar width and height values
        if (scrollbarWidth === '0px' || scrollbarHeight === '0px') {
            document.getElementById('scrollbar_off').style.display = 'block';
            document.getElementById('scrollbar_on').style.display = 'none';
            document.getElementById('games_data').style.overflowX = 'scroll';
            document.getElementById('lastfm_top').style.overflowX = 'scroll';
            document.getElementById('lastfm_artist').style.overflowX = 'scroll';
        } else {
            document.getElementById('scrollbar_off').style.display = 'none';
            document.getElementById('scrollbar_on').style.display = 'block';
            document.getElementById('games_data').style.overflowX = 'hidden';
            document.getElementById('lastfm_top').style.overflowX = 'hidden';
            document.getElementById('lastfm_artist').style.overflowX = 'hidden';
        }
    }
}

// Get the two divs
var scrollbar_off = document.getElementById('scrollbar_off');
var scrollbar_on = document.getElementById('scrollbar_on');
var games_data = document.getElementById('games_data');
var lastfm_top = document.getElementById('lastfm_top');
var lastfm_artist = document.getElementById('lastfm_artist');

// Add click event listeners to the divs
scrollbar_off.addEventListener('click', function() {
    // Set the CSS variables to 10px and hide divs
    document.documentElement.style.setProperty('--scrollbar-width', '10px');
    document.documentElement.style.setProperty('--scrollbar-height', '10px');
    scrollbar_off.style.display = 'none';
    scrollbar_on.style.display = 'block'; 
    games_data.style.overflowX = 'hidden';
    lastfm_top.style.overflowX = 'hidden';
    lastfm_artist.style.overflowX = 'hidden';
    
    // If local storage is available, save the values to local storage
    if (Modernizr.localstorage) {
        localStorage.setItem('scrollbarWidth', '10px');
        localStorage.setItem('scrollbarHeight', '10px');
    }
});

scrollbar_on.addEventListener('click', function() {
    // Set the CSS variables to 0px and hide divs
    document.documentElement.style.setProperty('--scrollbar-width', '0px');
    document.documentElement.style.setProperty('--scrollbar-height', '0px');
    scrollbar_off.style.display = 'block';
    scrollbar_on.style.display = 'none';
    games_data.style.overflowX = 'scroll';
    lastfm_top.style.overflowX = 'scroll';
    lastfm_artist.style.overflowX = 'scroll';
    
    // If local storage is available, save the values to local storage
    if (Modernizr.localstorage) {
        localStorage.setItem('scrollbarWidth', '0px');
        localStorage.setItem('scrollbarHeight', '0px');
    }
});