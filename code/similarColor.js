function getDominantColorFromImage(image) {
  return new Promise((resolve, reject) => {
    const colorThief = new ColorThief();
    const dominantColor = colorThief.getColor(image);

    if (dominantColor) {
      const hexColor = rgbToHex(dominantColor[0], dominantColor[1], dominantColor[2]);
      console.log("🐛 Dominant Color Hex:", hexColor); // Add this line to log the hex color
      resolve(hexColor);
    } else {
      reject("🐛 Unable to extract the dominant color from the image.");
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
  return color.luminance() > 0.4 ? "#686868" : "var(--color5)";
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

/*   // set height of preloader_main to the same size of text
  if ($(window).width() >= 550) {
    var textHeight = $("#text").height();
    var updatedHeight = textHeight + 12; // Add 20 pixels to the original height
    
    $("#preloader_main").css("height", updatedHeight + "px", "important");
    console.log("🐛 Text Height:", textHeight);
  } */

  setTimeout(function() {
    $("#preloader_main").css("transition", "0s")
  }, 300);
  
  // 500ms delay
  setTimeout(function() {
    $("#preloader").fadeOut(300);
    $("#preloader_fill").remove();
    $("#preloader_main").css("margin-top", "5px");
    $("body").css("background-color", "var(--color2)");
  }, 500);

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
            console.error("🐛 Error loading the image.");
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
    return "disabled";
  }
  if (userPreference === "disabled") {
    return "dark";
  }
  // for invalid values, just in case
  return "disabled"; // Default to "disabled" if none of the above conditions match
}

const themeToggler = document.getElementById("theme-toggle");

// Mimic heavy load done by other JS scripts
setTimeout(() => {
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
}, 0);