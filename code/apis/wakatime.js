let resultArray = []; // Create an empty array to store the extracted information
fetch(`https://api.choccymilk.uk/wakatime`, {
})
.then(response => response.json())
.then(data => {
    // declare best day constant
    const bestDay = data.data.best_day;
    const total = data.data.total_seconds;

    const weeks = Math.floor(total / 604800);
    const remainingSeconds = total % 604800;
    const days = Math.floor(remainingSeconds / 86400);
    const hours = Math.floor((remainingSeconds % 86400) / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);

    const firstLanguage = data.data.languages[0].name;

    const languages = data.data.languages;
    const today = data.data.human_readable_daily_average.replace(' hr', ' hours').replace(' mins', ' minutes');

    
    // Build the formatted string
    let formattedTotal = '';
    if (weeks > 0) {
        formattedTotal += `<span class="info_large">${weeks} week${weeks > 1 ? 's' : ''}</span>, `;
    }
    if (days > 0) {
        formattedTotal += `<span class="info_large">${days} day${days > 1 ? 's' : ''}</span>, `;
    }
    if (hours > 0) {
        formattedTotal += `<span class="info_large">${hours} hour${hours > 1 ? 's' : ''}</span>, `;
        if (minutes > 0) {
            formattedTotal += ' and ';
        }
    }
    if (minutes > 0 || formattedTotal === '') {
        formattedTotal += `<span class="info_large">${minutes} minute${minutes > 1 ? 's' : ''}</span>`;
    }
    document.getElementById('waka_user').innerHTML = `coded for ${formattedTotal}`;
    document.getElementById('waka_user').style.fontFamily = "Rubik";

    // Calculate total seconds for all languages
    const totalSeconds = languages.reduce((total, language) => total + language.total_seconds, 0);   
    
    

    
    // Create a container for languages
    const languagesContainer = document.createElement('div');
    languagesContainer.id = 'waka_lang';

    // Loop through languages and create a container for each language
    languages.forEach(language => {
        const languageName = language.name;
        const languageText = language.text;

        // ignore if percentage is less than 1%
        if (((language.total_seconds / totalSeconds) * 100).toFixed(2) < 1) {
            return;
        } else if (
            languageName === 'Other' ||
            languageName === 'Markdown') {
            return;
        }
        
        // calculate percentage 
        const languagePercentage = ((language.total_seconds / totalSeconds) * 100).toFixed(2);

        // Create a container for each language
        const languageContainer = document.createElement('div');
        languageContainer.className = 'waka_lang_container';

        // Create an element for the language name
        const langName = document.createElement('div');
        langName.className = 'waka_lang_name';
        langName.innerText = `${languageName} (${languagePercentage}%)`;

        // Create an element for the language time
        const langTime = document.createElement('div');
        langTime.className = 'waka_lang_time';
        langTime.innerText = `${languageText.replace(' hrs', 'h').replace(' mins', 'm')}`;

        // Create a border for the bar graph
        const langGraphBorder = document.createElement('div');
        langGraphBorder.className = 'waka_lang_graph_border';

        // Create a container for the language name and time
        const langTimeAndName = document.createElement('div');
        langTimeAndName.className = 'waka_lang_time_and_name';

        // Create a bar graph for the language
        const langGraph = document.createElement('div');
        langGraph.className = 'waka_lang_graph';
        langGraph.style.width = languagePercentage + '%';

        // Append the language name and graph to the language container
        langTimeAndName.appendChild(langName);
        langTimeAndName.appendChild(langTime);
        langGraphBorder.appendChild(langGraph);
        languageContainer.appendChild(langTimeAndName);
        languageContainer.appendChild(langGraphBorder);

        // Append the language container to the languages container
        languagesContainer.appendChild(languageContainer);

        const extractedData = {
            bestDayText: bestDay.text,
            total: total,
            today: today,
            languages: languages.map(language => ({ name: language.name, text: language.text }))
        };
        resultArray.push(extractedData);
    });

    // Append the languages container to the element with id 'waka_lang'
    document.getElementById('waka_lang').appendChild(languagesContainer);
    console.log('📅 wakatime', resultArray);
})
.catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Error:', error);
});