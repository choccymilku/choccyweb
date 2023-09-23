// discord related ⚠
const discord_user_id = '945717456163442708';
// avatar size and format
const avatarSize = 128; //128, 256, 512, 1024, 2048
const avatarFormat = "png"; //webp, png, jpg

// your roblox ID <not required>
const roblox_id = "2450458016"; //your roblox ID
// your mastodon username <not required>
const mastodon_username = ""; //bjork

// your pronouns.page username (or ID) <not required, but recommended> ⚠
const pronounspage_username = "choccymilk"; //choccymilk or 01GXT9SVRPDFYR3DJGMAEJ2FN4

// title for the page (shown in the tab) <required> ⚠
const title = "choccy's thing"; 

// your birthday (shown in the "about me" section) <not required>
const bday_day = '6';
const bday_month = '9';
const bday_year = '2007';

// username on the topbar <required> ⚠
var username = "choccy";

// tabs <required>
const tabNames = ["./me", "./people", "./projects", "./gallery"];
const tabIds = ["tab_me", "tab_friends", "tab_projects", "tab_gallery"];
const tabBlocks = ["text_outer", "people", "projects", "gallery"];
const tabIcons = ["home", "users", "briefcase", "image"];

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
`i made this, call me choccy, or one of [these](https://docs.google.com/document/d/1XfJdYyFmd_hLXrUItX6q1aZZLpJkq_nOiULA0cit8Mw) \n` +
`i code, mostly javascript and websites\n` +
`you can find the source code for this [here](https://github.com/choccymilku/choccy-newer-and-improved)\nn` +     
`<span id='birthday'></span>, <span id='pronouns'></span>, <span id='flags'></span>`;
/* `;;divider;; to-do:\n<div id="todo_list"></div` */

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

//DO NOT EDIT BELOW THIS LINE
document.title = `${title}`;

const userTitle = document.getElementById("userTitle");
userTitle.textContent = username;


// can be removed if you don't intend to use to-do list anywhere, make sure the url is correct for your repository (must be raw.githubusercontent.com)
/* fetch('https://raw.githubusercontent.com/choccymilku/choccy-newer-and-improved/main/TO-DO.md')
    .then(response => response.text())
    .then(text => {
        var todo = text.split('\n');
        var todo_list = document.getElementById('todo_list');
        todo.forEach((item) => {
            if (item.trim() !== '') {
                var todo_item = document.createElement('li');
                todo_item.textContent = item;
                todo_list.appendChild(todo_item);
            }
        });
    }); */

    fetch('https://raw.githubusercontent.com/choccymilku/choccy-newer-and-improved/main/VERSION.MD')
    .then(response => response.text())
    .then(text => {
        var todo = text.split('\n');
        var todo_list = document.getElementById('update_notes');
        todo.forEach((item) => {
            if (item.trim() !== '') {
                var element = document.createElement(item.toLowerCase().includes('version') ? 'h1' : 'li');
                element.textContent = item;
                todo_list.appendChild(element);
            }
        });
    });

