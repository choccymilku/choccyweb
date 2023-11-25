// discord related ⚠
const discord_user_id = '945717456163442708';
// avatar size and format
const avatarSize = 256; //128, 256, 512, 1024, 2048
const avatarFormat = "png"; //png, jpg

// your roblox ID <not required>
const roblox_id = "2450458016"; //your roblox ID

const mastodon_username = ""; //bjork
const bsky_name = ""; //your bsky name
const co_host_name = ""; //your co-host name

// your pronouns.page username (or ID) <not required, but recommended> ⚠
const pronounspage_username = "choccymilk"; //choccymilk or 01GXT9SVRPDFYR3DJGMAEJ2FN4

// title for the page (shown in the tab) <required> ⚠
const title = "choccys"; 

// your birthday (shown in the "about me" section) <not required>
const birthday = `6, 9, 2007`; // first is day, then month, then year



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
// - large text: <l>hello</l>

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
`<l>/me</l>\n call me one of [these](https://docs.google.com/document/d/1XfJdYyFmd_hLXrUItX6q1aZZLpJkq_nOiULA0cit8Mw)\n` +
`i code in javascript and do occasional 3D modelling and video editing;;divider;;` +
`<l>/about</l>\navailable from <t:1698411600:t> to <t:1698433200:t>\n<span id='birthday'></span> <span id='pronouns'></span> <span id='flags'></span> & czech :flag_cz: ''#(sadly)#''\n\n` +
`some statistics i guess ↓\n;;divider;;`;

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