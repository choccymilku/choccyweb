// discord related ⚠
const discord_user_id = '945717456163442708';
// avatar size and format
const avatarSize = 128; //128, 256, 512, 1024, 2048
const avatarFormat = "png"; //png, jpg

// your roblox ID <not required>
const roblox_id = "2450458016"; //your roblox ID

const mastodon_username = ""; //bjork
const bsky_name = ""; //your bsky name
const co_host_name = ""; //your co-host name

// your pronouns.page username (or ID) <not required, but recommended> ⚠
const pronounspage_username = "choccymilk"; //choccymilk or 01GXT9SVRPDFYR3DJGMAEJ2FN4

// title for the page (shown in the tab) <required> ⚠
const title = "choccy, developer?"; 

// your birthday (shown in the "about me" section) <not required>
const bday_day = '6';
const bday_month = '9';
const bday_year = '2007';

// username on the topbar <required> ⚠
var username = "choccy";

// tabs <required>
const tabNames = ["./me", "./data", "./people", "./projects", "./gallery"];
const tabIds = ["tab_me", "tab_data","tab_friends", "tab_projects", "tab_gallery"];
const tabBlocks = ["text_outer", "data", "people", "projects", "gallery"];
const tabIcons = ["home", "clock", "users", "briefcase", "image"];

// "about me" text, supports markdowns, can be found in "text.js" <required> ⚠
// what you can use:
// --- TEXT ---
// - bold: **hello**
// - italic: *hello*
// - small: ^^hello^^
// - underline: __hello__
// - strikethrough: ~~hello~~
// - spoiler: ||hello||
// - code: ''hello!'' 
// - link: [hello](https://hello.com)
// - flag: :flag_<cz>: (https://flagicons.lipis.dev for all flags)
// - superscript: #hello#

// --- IMAGES ---
// - images (emoji size): [[https://image.png]] OR [[./images/image.png]] (local)
// - big image : [![https://image.png]!] OR [![./images/image.png]!] (local)
// - bigger image: [!![https://image.png]!!] OR [!![./images/image.png]!!] (local)
// - biggest image: [!!![https://image.png]!!!] OR [!!![./images/image.png]!!!] (local)

// --- OTHER ---
// - divider: ;;divider;; (creates a divider)
// - new line: \n (creates a new line)
// - spaces: \nn (creates a new line with a space)
// - timestamps: use https://hammertime.cyou/en-GB to get your desired timestamp
// - twemoji: (replaces emojis with twemojis): 😊 - converts to twemoji


var custom_text = 
`i made this, call me choccy, or one of [these](https://docs.google.com/document/d/1XfJdYyFmd_hLXrUItX6q1aZZLpJkq_nOiULA0cit8Mw)\n` +
`i code mostly in javascript and make websites for fun + trying to learn 3D modelling\n` +
`i tinker with whatever my heart desires, and i talk too much about it ''#(ask me if you want to know some)#''\n` +   
`<span id='birthday'></span>, <span id='pronouns'></span>, <span id='flags'></span> & czech :flag_cz: ''#(sadly)#''` +
`;;divider;; to-do:\n<div id="todo_list"></div`;

/* var custom_text =
`**bold**\n` +
`*italic*\n` +
`^^small^^\n` +
`__underline__\n` +
`~~strikethrough~~\n` +
`||spoiler||\n` +
`''code''\n` +
`[link](https://link.com)\n` +
`:flag_cz: :flag_us:\n` +
`#superscript#\n` +

`image [[https://cdn.discordapp.com/emojis/1068825486265942056.webp?size=96&quality=lossless]]\n` +
`big image [![https://cdn.discordapp.com/emojis/1068825486265942056.webp?size=96&quality=lossless]!]\n` +
`bigger image [!![https://cdn.discordapp.com/emojis/1068825486265942056.webp?size=96&quality=lossless]!!]\n` +
`biggest image [!!![https://cdn.discordapp.com/emojis/1068825486265942056.webp?size=96&quality=lossless]!!!]\n` +

`;;divider;;\n` +
`timestamp: [1630953600](https://hammertime.cyou/en-GB)\n` +
`twemoji: 😊\n` +
`this is text \n this is also text, on the same line\nn this is text on a new line`; */


// can be removed if you don't intend to use to-do list anywhere, make sure the url is correct for your repository (must be raw.githubusercontent.com)

fetch('https://raw.githubusercontent.com/choccymilku/choccy-newer-and-improved/main/VERSION.MD')
.then(response => response.text())
.then(text => {
    var todo = text.split('\n');
    var todo_list = document.getElementById('update_notes');
    var versionElement = document.getElementById('version'); // Add this line
    const versionPattern = /\bversion (\d+\.\d+(\.\d+)?)/i;

    todo.forEach((item) => {
        if (item.trim() === '') {
            // If the line is empty, add a line break
            todo_list.appendChild(document.createElement('br'));
        } else {
            // Check for different keywords and replace them with corresponding icons
            var modifiedItem = item.replace(/bug\s+-/i, '<i class="fa-solid fa-bug" title="bug"></i>');
            modifiedItem = modifiedItem.replace(/fix\s+-/i, '<i class="fa-solid fa-screwdriver-wrench" title="fix"></i>');
            modifiedItem = modifiedItem.replace(/temp\s+-/i, '<i class="fa-solid fa-trowel-bricks" title="temporary fix"></i>');
            modifiedItem = modifiedItem.replace(/add\s+-/i, '<i class="fa-solid fa-plus" title="add"></i>');

            const versionMatch = versionPattern.exec(modifiedItem);
            if (versionMatch) {
                // If a version is found, abbreviate and add it to the versionElement with the icon
                versionElement.innerHTML = 'v.' + versionMatch[0].substring(8).replace(/\s/g, '') + ' <i class="fa-solid fa-circle-question"></i>';
                console.log(versionElement.innerHTML);
            } else {
                var element = document.createElement(modifiedItem.toLowerCase().includes('v.') ? 'h1' : 'div');
                element.innerHTML = modifiedItem; // Use innerHTML to render the icons
                todo_list.appendChild(element);
            }
        }
    });
});





//DO NOT EDIT BELOW THIS LINE
document.title = `${title}`;

const userTitle = document.getElementById("userTitle");
userTitle.textContent = username;