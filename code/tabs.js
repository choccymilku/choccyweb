document.addEventListener("DOMContentLoaded", function () {
    // Get the tab container
    const tabsContainer = document.getElementById("tabs_inner");

    // Function to show a specific tabBlock and hide all others
    function showTabBlock(tabBlock) {
        tabBlocks.forEach((block) => {
            const blockElement = document.getElementById(block);

            if (blockElement) {
                if (block === tabBlock) {
                    blockElement.style.display = "flex";
                } else {
                    blockElement.style.display = "none";
                }
            }
        });
    }

    // Function to set the active tabId and update the UI
    function setActiveTab(tabId) {
        // Remove #data or #gallery from the URL
        const urlWithoutHash = window.location.href.split("#")[0];
        window.history.replaceState({}, document.title, urlWithoutHash);

        // Store the active tabId in localStorage
        localStorage.setItem("activeTab", tabId);

        // Show the corresponding tabBlock
        const tabBlock = tabBlocks[tabIds.indexOf(tabId)];
        showTabBlock(tabBlock);

        // Change the background color
        tabIds.forEach((id) => {
            const tabElement = document.getElementById(id);

            if (tabElement) {
                if (id === tabId) {
                    tabElement.style.backgroundColor = "var(--icon)";
                    tabElement.style.cursor = "default";
                    tabElement.style.paddingRight = "30px";
                    tabElement.style.paddingLeft = "30px";
                } else {
                    tabElement.style.backgroundColor = "";
                    tabElement.style.cursor = "";
                    tabElement.style.paddingRight = "";
                    tabElement.style.paddingLeft = "";
                }
            }
        });
    }

    // Function to generate the tab element with Font Awesome icon
    function generateTabElement(tabName, tabId, tabBlock, useIcon, iconName) {
        const tabElement = document.createElement("div");
        tabElement.id = tabId;

        if (useIcon) {
            // Use Font Awesome icon
            const iconElement = document.createElement("i");
            iconElement.className = "fa fa-" + iconName; // Assuming Font Awesome uses "fa" as the base class
            tabElement.appendChild(iconElement);
        } else {
            // Use tabName as text
            tabElement.textContent = tabName;
        }

        // Add the tab style
        tabElement.classList.add("tabs_style");

        // Add a click event handler to set the active tabId and update the UI
        tabElement.addEventListener("click", function () {
            setActiveTab(tabId);
        });

        return tabElement;
    }

    // Function to update the tab styles based on screen width
    function updateTabStyles() {
        const useIcons = window.innerWidth < 551;

        // Remove existing tabs
        tabsContainer.innerHTML = "";

        // Generate the tabs based on the configuration
        for (let i = 0; i < tabNames.length; i++) {
            const tabName = tabNames[i];
            const tabId = tabIds[i];
            const tabBlock = tabBlocks[i];
            const iconName = tabIcons[i]; // Get the Font Awesome icon name

            const tabElement = generateTabElement(tabName, tabId, tabBlock, useIcons, iconName);

            // Add the tab to the container
            tabsContainer.appendChild(tabElement);
        }

        // Check if an active tab is stored in localStorage, if not, default to the first tab
        const activeTab = getActiveTabFromUrl() || localStorage.getItem("activeTab") || tabIds[0];

        // Set the active tab
        setActiveTab(activeTab);
    }

    // Function to check if the URL contains "#data" and return the corresponding tabId
    function getActiveTabFromUrl() {
        const url = window.location.href;
        if (url.includes("#data")) {
            return "tab_data";
        } else if (url.includes("#gallery")) {
            return "tab_gallery";
        }
        return null;
    }

    // Call the updateTabStyles function initially
    updateTabStyles();

    // Listen for window resize to update the tab styles
    window.addEventListener("resize", updateTabStyles);
});
