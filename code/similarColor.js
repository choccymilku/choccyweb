function getDominantColorFromImage(image) {
  return new Promise((resolve, reject) => {
    const colorThief = new ColorThief();
    const dominantColor = colorThief.getColor(image);

    if (dominantColor) {
      const hexColor = rgbToHex(dominantColor[0], dominantColor[1], dominantColor[2]);
      console.log("🐛 dominant Color Hex:", hexColor); // Add this line to log the hex color
      resolve(hexColor);
    } else {
      reject("🐛 unable to extract the dominant color from the image.");
    }
  });
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

// Function to determine the text color based on the color brightness
function getTextColorBasedOnBrightness(hexColor) {
  const color = chroma(hexColor);
  return color.luminance() > 0.4 ? "#1C1C1C" : "#fff";
}

function getHoverTextColorBasedOnBrightness(hexColor) {
  const color = chroma(hexColor);
  return color.luminance() > 0.4 ? "#686868" : "#a6a6a6";
}

// Function to generate similar colors with dynamic darkening or brightening
function generateSimilarColors(dominantColor, numColors, increment = 0.3) {
  const baseColor = chroma(dominantColor);
  const similarColors = [];
  const isDarkDominantColor = baseColor.luminance() <= 0.4;

  for (let i = 1; i <= numColors; i++) {
    let generatedColor;
    if (isDarkDominantColor) {
      generatedColor = baseColor.brighten(i * increment).hex();
    } else {
      generatedColor = baseColor.darken(i * increment).hex();
    }
    similarColors.push(generatedColor);
  }

  return similarColors;
}

// Function to update the CSS variables with dominant and similar colors
function updateRootColors(dominantColor, similarColors) {
setTimeout(function() {
  document.documentElement.style.setProperty("--color1", dominantColor);
  document.documentElement.style.setProperty("--color2", similarColors[0]);
  document.documentElement.style.setProperty("--color3", similarColors[1]);
  document.documentElement.style.setProperty("--color4", similarColors[2]);
  document.documentElement.style.setProperty("--color5", similarColors[3]);
  
  // Set the text color based on the brightness of the dominant color
  const textColor = getTextColorBasedOnBrightness(dominantColor);
  document.documentElement.style.setProperty("--text", textColor);

  const textHoverColor = getHoverTextColorBasedOnBrightness(dominantColor);
  document.documentElement.style.setProperty("--texthover", textHoverColor);
}, 500);

if (localStorage.getItem("activeTab") !== "tab_data") {
  if ($(window).width() >= 550) {
      var visibleBarHeight = $(".bar:visible").height();
      var updatedHeight = visibleBarHeight + 2; // Add 2 pixels to the original height
      
      $("#preloader_main").css("height", updatedHeight + "px", "important");
      console.log("🐛 visible Bar Height:", visibleBarHeight);
  }
} else if (localStorage.getItem("activeTab") === "tab_data") {
}

$(document).ready(function() {
  var musicWidth = $("#music").width();
  var updatedMusicWidth = musicWidth + 11; // Add 12 pixels to the original height
  
  $("#preloader_music").css("width", updatedMusicWidth + "px", "important");
  console.log("🐛 visible Music width:", musicWidth);

  // disable if window width is less than 550px
  if ($(window).width() <= 550) {
    $("#preloader_music").css("width", "100%", "important");
  }
});

$(document).ready(function() {
  var totalWidth = 0;
  var maxWidth = $("#tabs").width(); // Get the maximum allowed width of #tabs

  $("#tabs").children().each(function(index) {
    var elementWidth = $(this).width();
    totalWidth += elementWidth + 19.5;
  });

  if (totalWidth <= maxWidth) {
    var updatedWidth = totalWidth;
    $("#preloader_tabs").css("width", updatedWidth + "px");
    console.log("🐛 total Tabs Width:", totalWidth);
  } else {
    console.log("total width exceeds the maximum allowed width");
    $("#preloader_tabs").css("width", "calc(100% - 20px)");
    $("#preloader_tabs").css("transition", "0s");
  }
});

$("#preloader").css("background-color", "transparent");
$("#preloader_tabs").css("transition", "0.3s");
$("#preloader_main").css("transition", "0.3s");

// calculate how long it takes to load the page and color the background
var loadtime = performance.now();
var loadtime = Math.round(loadtime);
var loadtime = loadtime / 1000;
var loadtime = loadtime + "s";
console.log("🐛 Page Load Time:", loadtime);
  
  // 500ms delay
  setTimeout(function() {
    $("#preloader").css("display", "none");
    $("body").css("background-color", "var(--color2)");
  }, 500);

  setTimeout(function() {
    $("body").css("transition", "0s");
  }, 800);
  
  //detect if website has loaded and console log
  $(window).on("load", function() {
    console.log("🐛 page Loaded!");
  });

}

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  const imageElement = document.getElementById("pfp");

  const observer = new MutationObserver(mutationsList => {
    for (const mutation of mutationsList) {
      if (mutation.type === "attributes" && mutation.attributeName === "src") {
        const imageUrl = mutation.target.src;
        if (imageUrl) {
          const img = new Image();
          img.crossOrigin = "Anonymous";
          img.onload = async () => {
            try {
              const dominantColor = await getDominantColorFromImage(img);
              const similarColors = generateSimilarColors(dominantColor, 4);
              updateRootColors(dominantColor, similarColors);
              console.log("🐛 Generated Colors:", similarColors);
            } catch (error) {
              console.error(error);
            }
          };
          img.onerror = () => {
            console.error("🐛 error loading the image.");
          };
          img.src = imageUrl;
          observer.disconnect();
        }
      }
    }
  });

  observer.observe(imageElement, { attributes: true });
});

function getUserPreference() {
  return localStorage.getItem("theme") || "disabled"; // Use "disabled" as the default
}

function saveUserPreference(userPreference) {
  localStorage.setItem("theme", userPreference);
}

function getAppliedMode(userPreference) {
  if (userPreference === "light") {
    return "light";
  }
  if (userPreference === "dark") {
    return "dark";
  }
  if (userPreference == "halloween") {
    return "halloween";
  }
  if (userPreference === "christmas") {
    return "christmas";
  }
  return "disabled";
}

function setAppliedMode(mode) {
  document.documentElement.dataset.appliedMode = mode;
}

function rotatePreferences(userPreference) {
  if (userPreference === "dark") {
    return "light";
  }
  if (userPreference === "light") {
    return "halloween";
  }
  if (userPreference === "halloween") {
    return "christmas";
  }
  if (userPreference === "christmas") {
    return "disabled";
  }
  if (userPreference === "disabled") {
    return "dark";
  }
  // for invalid values, just in case
  return "disabled"; // Default to "disabled" if none of the above conditions match
}

const themeToggler = document.getElementById("theme-toggle");

  let userPreference = getUserPreference();
  setAppliedMode(getAppliedMode(userPreference));
  themeToggler.innerText = userPreference;

  themeToggler.onclick = () => {
    const newUserPref = rotatePreferences(userPreference);
    userPreference = newUserPref;
    saveUserPreference(newUserPref);
    themeToggler.innerText = newUserPref;
    setAppliedMode(getAppliedMode(newUserPref));
  };