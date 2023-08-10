function getDominantColorFromImage(image) {
  return new Promise((resolve, reject) => {
    const colorThief = new ColorThief();
    const dominantColor = colorThief.getColor(image);

    if (dominantColor) {
      const hexColor = rgbToHex(dominantColor[0], dominantColor[1], dominantColor[2]);
      resolve(hexColor);
    } else {
      reject("Unable to extract the dominant color from the image.");
    }
  });
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

function isDarkThemePreferred() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

  
  // Function to determine if the text color should be white or black based on the color brightness
function getTextColorBasedOnBrightness(hexColor) {
    const color = chroma(hexColor);
    return color.luminance() > 0.5 ? "#1C1C1C" : "#f5f5f5";
  }

  function getTextColorBasedOnBrightness2(hexColor2) {
    const color2 = chroma(hexColor2);
    return color2.luminance() > 0.5 ? "#464646" : "#d8d8d8";
  }
  
  // Function to generate darker and brighter colors based on theme preference
  function generateSimilarColors(dominantColor, numColors) {
    const baseColor = chroma(dominantColor);
    const similarColors = [];
    const isDarkTheme = isDarkThemePreferred();
  
    // Adjust the factor by which the colors are darkened or lightened
    const factor = isDarkTheme ? 0.5 : 1;
  
    for (let i = 1; i <= numColors; i++) {
      const generatedColor = baseColor.darken(factor * i).hex();
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
    document.documentElement.style.setProperty("--icon", similarColors[4]);
    document.documentElement.style.setProperty("--icon_hover", similarColors[5]);
  
    // Set the text color based on the brightness of the dominant color
    const textColor = getTextColorBasedOnBrightness(dominantColor);
    document.documentElement.style.setProperty("--text", textColor);

    // Set the text color based on the brightness of the dominant color
    const textColor2 = getTextColorBasedOnBrightness2(dominantColor);
    document.documentElement.style.setProperty("--texthover", textColor2);
  
    // Hide the preloader once the colors are added
    $("#preloader").fadeOut(250);
  }
  
  // Wait for the DOM to fully load
  document.addEventListener("DOMContentLoaded", () => {
    // Get the image element with id="pfp"
    const imageElement = document.getElementById("pfp");
  
    // Create a MutationObserver to observe changes to the image element
    const observer = new MutationObserver(mutationsList => {
      for (const mutation of mutationsList) {
        if (mutation.type === "attributes" && mutation.attributeName === "src") {
          const imageUrl = mutation.target.src;
          if (imageUrl) {
            // Once the image src is available, load the image dynamically
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = async () => {
              try {
                // Call the function to get the dominant color
                const dominantColor = await getDominantColorFromImage(img);
  
                // Generate darker and brighter colors based on theme preference
                const similarColors = generateSimilarColors(dominantColor, 4);
  
                // Update CSS variables with dominant and similar colors
                updateRootColors(dominantColor, similarColors);
  
                // Log the generated colors and theme preference
                console.log("Generated Colors:", similarColors);
                console.log("Preferred Theme: ", isDarkThemePreferred() ? "Dark" : "Light");
              } catch (error) {
                console.error(error);
              }
            };
            img.onerror = () => {
              console.error("Error loading the image.");
            };
            img.src = imageUrl;
  
            // Disconnect the observer since we don't need it anymore
            observer.disconnect();
          }
        }
      }
    });
  
    // Start observing changes to the image element
    observer.observe(imageElement, { attributes: true });
  });
  