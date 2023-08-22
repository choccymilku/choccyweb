$(document).ready(function($) {
    if (Modernizr.localstorage) {
      $(document).on('click', '.dyslexic-off', function(e) {
        localStorage.setItem('fontStyle', 'dyslexic');
        $('.dyslexic-off').hide();
        $('.dyslexic-on').show();
        $('.connection-name').css('margin-top', '-12px');
        $('#userTitle').css('margin-top', '-19px');
        $('#status').css('margin-top', '-15px');
        $('#clock').css('margin-top', '-2px');
        $('#version').css('margin-top', '-8px');
        applyFontFamily('OpenDyslexic3');
      });
  
      $(document).on('click', '.dyslexic-on', function(e) {
        localStorage.setItem('fontStyle', 'default');
        $('.dyslexic-on').hide();
        $('.dyslexic-off').show();
        $('.connection-name').css('margin-top', '');
        $('#userTitle').css('margin-top', '-6px');
        $('#status').css('margin-top', '-4px');
        $('#clock').css('margin-top', '');
        $('#version').css('margin-top', '');
        applyFontFamily('GeologicaRoman');
      });
  
      var fontStyle = localStorage.getItem('fontStyle');
  
      if (fontStyle === 'dyslexic') {
        console.log('fontStyle dyslexic');
        $('.dyslexic-off').hide();
        $('.dyslexic-on').show();
        applyFontFamily('OpenDyslexic3');
      } else {
        console.log('fontStyle mono');
        $('.dyslexic-on').hide();
        $('.dyslexic-off').show();
        applyFontFamily('GeologicaRoman');
      }
    }
  });
  
  function applyFontFamily(fontFamily) {
    $('body').css('font-family', fontFamily);
  }
  