// discord related ⚠
const discord_user_id = '945717456163442708';
// avatar size and format
const avatarSize = 128; //128, 256, 512, 1024, 2048
const avatarFormat = "webp"; //webp, png, jpg, gif

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
const tabNames = ["./me", "./people", "./projects"];
const tabIds = ["tab_me", "tab_friends", "tab_projects"];
const tabBlocks = ["text_outer", "people", "projects"];
const tabIcons = ["home", "users", "briefcase"];

// "about me" text, supports markdowns, can be found in "text.js" <required> ⚠
var custom_text = 
`i made this, call me choccy, or one of [these](https://docs.google.com/document/d/1XfJdYyFmd_hLXrUItX6q1aZZLpJkq_nOiULA0cit8Mw)\n` +
`i code, mostly javascript and websites\n` +
`you can find the source code for this [here](https://github.com/choccymilku/choccy-newer-and-improved)\nn` + 
`<span id='birthday'></span>, <span id='pronouns'></span>, <span id='flags'></span>`;


//DO NOT EDIT BELOW THIS LINE
document.title = `${title}`;

const userTitle = document.getElementById("userTitle");
userTitle.textContent = username;