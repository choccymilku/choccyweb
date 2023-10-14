$(document).ready(function($) {
    if (Modernizr.localstorage) {
      $(document).on('click', '.dyslexic-off', function(e) {
        localStorage.setItem('fontStyle', 'dyslexic');
        $('.dyslexic-off').hide();
        $('.dyslexic-on').show();
        $('.dyslexic-off').hide();
        $('.dyslexic-on').show();
        $('.connection-name').css('margin-top', '-12px');
        $('#userTitle').css('margin-top', '-19px');
        $('#status').css('margin-top', '-15px');
        $('#clock').css('margin-top', '-2px');
        $('#version').css('margin-top', '-8px');
        $('.friends_name').css('margin-top', '-18px');
        $('#todo_list').css('margin-left', '16px');
        $('.lastfm_playcount').css('margin-top', '-49px');
        $('.lastfm_artist_name').css('margin-top', '-14px');
        $('.lastfm_artist').css('margin-top', '-22px');
        $('.lastfm_name').css('margin-top', '-14px');
        $('.games_name').css('margin-top', '-2px');
        $('.games_lasted').css('margin-top', '0px');
        applyFontFamily('OpenDyslexic3');
      });
  
      $(document).on('click', '.dyslexic-on', function(e) {
        localStorage.setItem('fontStyle', 'default');
        $('.dyslexic-on').hide();
        $('.dyslexic-off').show();
        $('.dyslexic-on').hide();
        $('.dyslexic-off').show();
        $('.connection-name').css('margin-top', '0px');
        $('#userTitle').css('margin-top', '-6px');
        $('#status').css('margin-top', '-4px');
        $('#clock').css('margin-top', '');
        $('#version').css('margin-top', '');
        $('.friends_name').css('margin-top', '');
        $('#todo_list').css('margin-left', '');
        $('.lastfm_playcount').css('margin-top', '');
        $('.lastfm_artist_name').css('margin-top', '');
        $('.lastfm_artist').css('margin-top', '');
        $('.lastfm_name').css('margin-top', '');
        $('.games_name').css('margin-top', '');
        $('.games_lasted').css('margin-top', '');
        applyFontFamily('GeologicaRoman');
      });
  
      var fontStyle = localStorage.getItem('fontStyle');
  
      if (fontStyle === 'dyslexic') {
        console.log('🐛 using dyslexic font');
        $('.dyslexic-off').hide();
        $('.dyslexic-on').show();
        $('.dyslexic-off').hide();
        $('.dyslexic-on').show();
        $('.connection-name').css('margin-top', '-12px');
        $('#userTitle').css('margin-top', '-19px');
        $('#status').css('margin-top', '-15px');
        $('#clock').css('margin-top', '-2px');
        $('#version').css('margin-top', '-8px');
        $('.friends_name').css('margin-top', '-18px');
        $('#todo_list').css('margin-left', '16px');
        $('.lastfm_playcount').css('margin-top', '-49px');
        $('.lastfm_artist_name').css('margin-top', '-14px');
        $('.lastfm_artist').css('margin-top', '-22px');
        $('.lastfm_name').css('margin-top', '-14px');
        $('.games_name').css('margin-top', '-2px');
        $('.games_lasted').css('margin-top', '0px');
        applyFontFamily('OpenDyslexic3');
      } else {
        console.log('🐛 using default font');
        $('.dyslexic-on').hide();
        $('.dyslexic-off').show();
        $('.dyslexic-on').hide();
        $('.dyslexic-off').show();
        $('.connection-name').css('margin-top', '0px');
        $('#userTitle').css('margin-top', '-6px');
        $('#status').css('margin-top', '-4px');
        $('#clock').css('margin-top', '');
        $('#version').css('margin-top', '');
        $('.friends_name').css('margin-top', '');
        $('#todo_list').css('margin-left', '');
        $('.lastfm_playcount').css('margin-top', '');
        $('.lastfm_artist_name').css('margin-top', '');
        $('.lastfm_artist').css('margin-top', '');
        $('.lastfm_name').css('margin-top', '');
        $('.games_name').css('margin-top', '');
        $('.games_lasted').css('margin-top', '');
        applyFontFamily('GeologicaRoman');
      }
    }
  });
  
  function applyFontFamily(fontFamily) {
    $('body').css('font-family', fontFamily);
  }
  