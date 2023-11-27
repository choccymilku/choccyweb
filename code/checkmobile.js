// Function to dynamically load scripts
function loadScript(scriptUrl) {
    var script = document.createElement('script');
    script.src = scriptUrl;
    script.setAttribute('data-dynamic', 'true'); // Mark script as dynamic
    document.body.appendChild(script);
}

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    console.log('🔄 loading mobile...');
    // wait for dom
    document.addEventListener("DOMContentLoaded", function() {
        // wait for window load
        window.addEventListener("load", function() {
            // wait for 1 second
            setTimeout(function() {
                // load lastfm_mobile
                document.getElementById("lastfm_mobile").style.display = "block";

                document.getElementById("gallery_mobile").style.display = "block";
                document.getElementById("gallery_mobile").style.marginTop = "12px";

                document.getElementById("hide_if_mobile").style.display = "none";
                document.getElementById("gallery_main").style.display = "none";

                document.getElementById("lastfm_mobile").addEventListener("click", function() {
                    loadScript('./code/datas/music.js');
                    loadScript('./code/datas/games.js');
                    loadScript('./code/datas/wakatime.js');
                    document.getElementById("hide_if_mobile").style.display = "block";
                    document.getElementById("lastfm_mobile").style.display = "none";
                    document.getElementById("gallery_mobile").style.marginTop = "-8px";
                });

                document.getElementById("gallery_mobile").addEventListener("click", function() {
                    loadScript('./code/fetches/gallery.js');
                    document.getElementById("gallery_mobile").style.marginTop = "-8px";
                    document.getElementById("gallery_mobile").style.display = "none";
                    document.getElementById("gallery_main").style.display = "block";
                });
            }, 0);
        });
    });

} else {
    console.log('🔄 loading desktop...');
    loadScript('./code/fetches/gallery.js');
    loadScript('./code/datas/music.js');
    loadScript('./code/datas/games.js');
    loadScript('./code/datas/wakatime.js');
}