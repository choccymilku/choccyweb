document.addEventListener('DOMContentLoaded', function() {
    // Get the current value from localStorage
    var currentPreference = localStorage.getItem('tabs_oritentation');

    // initally set currentPreference to top
    if (currentPreference === null) {
      currentPreference = 'top';
    }
    // Set the initial text content based on the stored preference
    document.getElementById('tabs_oritentation').innerHTML = currentPreference;

    // Add click event listener
    document.getElementById('tabs_oritentation').addEventListener('click', function () {
      // Toggle the preference and update localStorage
      currentPreference = (currentPreference === 'top') ? 'bottom' : 'top';
      localStorage.setItem('tabs_oritentation', currentPreference);
      
      // Update the text content
      document.getElementById('tabs_oritentation').innerHTML = currentPreference;

      // Modify other elements based on the preference
      if (currentPreference === 'top') {
        console.log('top');
        document.getElementById('top_side').style.position = '';
        document.getElementById('top_side').style.bottom = '';
        document.getElementById('top_side').style.right = '';
        document.getElementById('top_side').style.height = '';

        document.getElementById('right_wrapper').style.marginTop = '';

        document.getElementById('settings_page').style.position = '';
        document.getElementById('settings_page').style.bottom = '';

        document.getElementById('left_wrapper').style.marginTop = '';
        document.getElementById('left_wrapper').style.marginBottom = '';

      } else {
        console.log('bottom');
        document.getElementById('top_side').style.bottom = '-18px';
        document.getElementById('top_side').style.right = '0px';

        document.getElementById('right_wrapper').style.marginTop = '6px';

        document.getElementById('settings_page').style.position = 'absolute';
        document.getElementById('settings_page').style.bottom = '68px';

        document.getElementById('left_wrapper').style.marginTop = '0px';
        document.getElementById('left_wrapper').style.marginBottom = '64px';
      }
    });

    setTimeout(function() {
      if (localStorage.getItem('tabs_oritentation') === 'bottom') {
        document.getElementById('top_side').style.bottom = '-18px';
        document.getElementById('top_side').style.right = '0px';

        document.getElementById('right_wrapper').style.marginTop = '6px';

        document.getElementById('settings_page').style.bottom = '68px';

        document.getElementById('left_wrapper').style.marginTop = '0px';
        document.getElementById('left_wrapper').style.marginBottom = '64px';
      }
    }, 0);
});

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

        document.getElementById('tabs').style.marginLeft = '';
        document.getElementById('tabs').style.width = '';
        } else {
        console.log('right');
        document.getElementById('left_wrapper').style.float = 'right';
        
        document.getElementById('right_wrapper').style.marginLeft = '-64px';
        document.getElementById('right_wrapper').style.float = 'left';

        document.getElementById('music_bottom_extender').style.left = '-52px';
        document.getElementById('music_bottom_extender').style.paddingRight = '25px';

        document.getElementById('settings_page').style.right = '64px';
        document.getElementById('settings_page').style.left = 'inherit';

        document.getElementById('settings').style.right = '0px';
        document.getElementById('settings').style.left = 'inherit';

        document.getElementById('tabs').style.marginLeft = '-64px';
        document.getElementById('tabs').style.width = '100%';
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
        document.getElementById('settings_page').style.left = 'inherit';

        document.getElementById('settings').style.right = '0px';
        document.getElementById('settings').style.left = 'inherit';

        document.getElementById('tabs').style.marginLeft = '-64px';
        document.getElementById('tabs').style.width = '100%';
      }
    }, 0);
});

if ( window.innerWidth <= "550") {

  // reload page on resize


  setTimeout(function() {
    if (localStorage.getItem('sidebar_oritentation') === 'right') {
      document.getElementById('settings_page').style.marginRight = '-64px';
    }
  }, 0);

  document.addEventListener('DOMContentLoaded', function() {
    // Get the current value from localStorage
    var currentPreference = localStorage.getItem('tabs_oritentation_mobile');

    // set localstorage if it doesn't exist
    if (currentPreference === null) {
      localStorage.setItem('tabs_oritentation_mobile', 'bottom');
    }

    if (currentPreference === null) {
      currentPreference = 'bottom';
    }

    // Set the initial text content based on the stored preference
    document.getElementById('tabs_oritentation_mobile').innerHTML = currentPreference;

    // Add click event listener
    document.getElementById('tabs_oritentation_mobile').addEventListener('click', function () {
      // Toggle the preference and update localStorage
      currentPreference = (currentPreference === 'top') ? 'bottom' : 'top';
      localStorage.setItem('tabs_oritentation_mobile', currentPreference);
      
      // Update the text content
      document.getElementById('tabs_oritentation_mobile').innerHTML = currentPreference;

      // Modify other elements based on the preference
      if (currentPreference === 'top') {
        console.log('top');
        document.getElementById('left_wrapper').style.bottom = '6px';
        document.getElementById('left_wrapper').style.top = 'inherit';

        document.getElementById('top_side').style.top = '0';

        document.getElementById('right_wrapper').style.marginTop = '66px';

        document.getElementById('settings_page').style.bottom = '0px';
        document.getElementById('settings_page').style.top = '-6px';

        document.getElementById('music_bottom_extender').style.bottom = '62px';
        document.getElementById('music_bottom_extender').style.top = 'inherit';
        document.getElementById('music_bottom_extender').style.paddingBottom = '12px';
        document.getElementById('music_bottom_extender').style.paddingTop = '0px';

      } else {
        console.log('bottom');
        document.getElementById('top_side').style.bottom = '-18px';
        document.getElementById('top_side').style.top = 'auto';

        document.getElementById('left_wrapper').style.top = '-58px';

        document.getElementById('right_wrapper').style.marginTop = '72px';

        document.getElementById('settings_page').style.top = 'auto';
        document.getElementById('settings_page').style.bottom = 'revert-layer';

        document.getElementById('music_bottom_extender').style.top = '188px';
        document.getElementById('music_bottom_extender').style.bottom = 'inherit';
        document.getElementById('music_bottom_extender').style.paddingTop= '12px';
        document.getElementById('music_bottom_extender').style.paddingBottom = '0px';
      }
    });

    setTimeout(function() {
      if (localStorage.getItem('tabs_oritentation_mobile') === 'top') {
        document.getElementById('left_wrapper').style.bottom = '6px';
        document.getElementById('left_wrapper').style.top = 'inherit';

        document.getElementById('top_side').style.top = '0';

        document.getElementById('right_wrapper').style.marginTop = '66px';

        document.getElementById('settings_page').style.bottom = '0px';
        document.getElementById('settings_page').style.top = '-6px';

        document.getElementById('music_bottom_extender').style.bottom = '62px';
        document.getElementById('music_bottom_extender').style.top = 'inherit';
        document.getElementById('music_bottom_extender').style.paddingBottom = '12px';
        document.getElementById('music_bottom_extender').style.paddingTop = '0px';
      }
    }, 0);
});
}