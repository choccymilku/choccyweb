document.addEventListener('DOMContentLoaded', function() {
    // Get the current value from localStorage
    var currentPreference = localStorage.getItem('sidebar_oritentation');

    // initally set currentPreference to top
    if (currentPreference === null) {
      currentPreference = 'left';
    }
    // Set the initial text content based on the stored preference
    document.getElementById('sidebar_oritentation').innerHTML = currentPreference;

    // Add click event listener
    document.getElementById('sidebar_oritentation').addEventListener('click', function () {
      // Toggle the preference and update localStorage
      currentPreference = (currentPreference === 'left') ? 'right' : 'left';
      localStorage.setItem('sidebar_oritentation', currentPreference);
      
      // Update the text content
      document.getElementById('sidebar_oritentation').innerHTML = currentPreference;

      // Modify other elements based on the preference
      if (currentPreference === 'left') {
        console.log('left');
        document.getElementById('left_wrapper').style.float = '';
        
        document.getElementById('right_wrapper').style.marginLeft = '';
        document.getElementById('right_wrapper').style.float = '';

        document.getElementById('music_bottom_extender').style.left = '';
        document.getElementById('music_bottom_extender').style.paddingRight = '';

        document.getElementById('settings_page').style.right = '';
        document.getElementById('settings_page').style.left = '';

        document.getElementById('settings').style.right = '';
        document.getElementById('settings').style.left = '';
        } else {
        console.log('right');
        document.getElementById('left_wrapper').style.float = 'right';
        
        document.getElementById('right_wrapper').style.marginLeft = '-64px';
        document.getElementById('right_wrapper').style.float = 'left';

        document.getElementById('music_bottom_extender').style.left = '-52px';
        document.getElementById('music_bottom_extender').style.paddingRight = '25px';

        document.getElementById('settings_page').style.right = '64px';

        document.getElementById('settings').style.right = '0px';
        document.getElementById('settings').style.left = 'inherit';
      }
    });

    setTimeout(function() {
      if (localStorage.getItem('sidebar_oritentation') === 'right') {
        document.getElementById('left_wrapper').style.float = 'right';
        
        document.getElementById('right_wrapper').style.marginLeft = '-64px';
        document.getElementById('right_wrapper').style.float = 'left';

        document.getElementById('music_bottom_extender').style.left = '-52px';
        document.getElementById('music_bottom_extender').style.paddingRight = '25px';

        document.getElementById('settings_page').style.right = '64px';

        document.getElementById('settings').style.right = '0px';
        document.getElementById('settings').style.left = 'inherit';
      }
    }, 0);
});

if ( window.innerWidth <= "550") {

  document.addEventListener('DOMContentLoaded', function() {
    // Get the current value from localStorage
    var currentPreference = localStorage.getItem('sidebar_oritentation_mobile');

    localStorage.removeItem('sidebar_oritentation');

    // set localstorage if it doesn't exist
    if (currentPreference === null) {
      localStorage.setItem('sidebar_oritentation_mobile', 'bottom');
    }

    if (currentPreference === null) {
      currentPreference = 'bottom';
    }

    // Set the initial text content based on the stored preference
    document.getElementById('sidebar_oritentation_mobile').innerHTML = currentPreference;

    // Add click event listener
    document.getElementById('sidebar_oritentation_mobile').addEventListener('click', function () {
      // Toggle the preference and update localStorage
      currentPreference = (currentPreference === 'top') ? 'bottom' : 'top';
      localStorage.setItem('sidebar_oritentation_mobile', currentPreference);
      
      // Update the text content
      document.getElementById('sidebar_oritentation_mobile').innerHTML = currentPreference;

      // Modify other elements based on the preference
      if (currentPreference === 'top') {
        console.log('top');
        document.getElementById('left_wrapper').style.bottom = '6px';
        document.getElementById('left_wrapper').style.top = '-58px';

        document.getElementById('right_wrapper').style.marginTop = '72px';

        document.getElementById('settings_page').style.top = '66px';

        document.getElementById('settings').style.top = '0';

        document.getElementById('music_bottom_extender').style.bottom = 'revert-layer';
        document.getElementById('music_bottom_extender').style.top = '173px';
        document.getElementById('music_bottom_extender').style.paddingTop = '15px';
        document.getElementById('music_bottom_extender').style.paddingBottom = '0px';
      } else {
        console.log('bottom');
        document.getElementById('left_wrapper').style.top = 'inherit';
        document.getElementById('left_wrapper').style.bottom = '6px';

        document.getElementById('right_wrapper').style.marginTop = '6px';

        document.getElementById('settings_page').style.bottom = '54px';
        document.getElementById('settings_page').style.top = 'revert-layer';

        document.getElementById('settings').style.bottom = '-18px';
        document.getElementById('settings').style.top = 'revert-layer';

        document.getElementById('music_bottom_extender').style.bottom = '58px';
        document.getElementById('music_bottom_extender').style.top = 'inherit';
        document.getElementById('music_bottom_extender').style.paddingTop = '0px';
        document.getElementById('music_bottom_extender').style.paddingBottom = '15px';
      }
    });

    setTimeout(function() {
      if (localStorage.getItem('sidebar_oritentation_mobile') === 'top') {
        document.getElementById('left_wrapper').style.bottom = '6px';
        document.getElementById('left_wrapper').style.top = '-58px';

        document.getElementById('right_wrapper').style.marginTop = '72px';

        document.getElementById('settings_page').style.top = '66px';

        document.getElementById('settings').style.top = '0';

        document.getElementById('music_bottom_extender').style.bottom = 'revert-layer';
        document.getElementById('music_bottom_extender').style.top = '173px';
        document.getElementById('music_bottom_extender').style.paddingTop = '15px';
        document.getElementById('music_bottom_extender').style.paddingBottom = '0px';
      }
    }, 0);
});
}