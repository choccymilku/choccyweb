let resultArray = []; // Create an empty array to store the extracted information
fetch(`https://api.choccymilk.uk/wakatime`, {
})
.then(response => response.json())
.then(data => {
    // declare best day constant
    const bestDay = data.data.best_day;
    const dailyAverage = data.data.human_readable_daily_average.replace(' hrs', 'h').replace(' mins', 'm');
    const total = data.data.human_readable_total.replace(' hrs', 'h').replace(' mins', 'm');
    const languages = data.data.languages;

    // handle bestday conversion to human readable format (e.g. 7th october 2021)
    // Convert the date string to a Date object
    const dateParts = bestDay.date.split('-'); // Split the date string into an array of parts
    const year = parseInt(dateParts[0]); // Get the year part and convert it to an integer
    const month = parseInt(dateParts[1]) - 1; // Get the month part (subtract 1 as months are 0-indexed in JavaScript)
    const day = parseInt(dateParts[2]); // Get the day part

    // Create a new Date object with the extracted year, month, and day
    const formattedDate = new Date(year, month, day);

    // add th, nd or st to the day and display as 7th, 1st, 2nd etc.
    const readableDay = day + (
        day > 3 && day < 21 ? 'th' : 
        day % 10 === 1 ? 'st' : 
        day % 10 === 2 ? 'nd' : 
        day % 10 === 3 ? 'rd' : 'th'
    ); // Get the day (e.g., 7th)
    const readableMonth = formattedDate.toLocaleString('en-US', { month: 'long' }); // Get the month (e.g., 'January')
    const readableYear = formattedDate.getFullYear(); // Get the year (e.g., 2023)

    const extractedData = {
        bestDayText: bestDay.text,
        bestDayDate: `${readableDay} ${readableMonth}, ${readableYear}`,
        dailyAverage: dailyAverage,
        total: total,
        languages: languages.map(language => ({ name: language.name, text: language.text }))
    };
    resultArray.push(extractedData);

    const bestDayDiv = document.createElement('div');
    bestDayDiv.innerHTML = `<div id="waka_best" style="font-family: Rubik;"><span>most active day</span></div><div>${readableMonth} ${readableDay}, ${readableYear} (${bestDay.text.replace(' hrs', 'h').replace(' mins', 'm')})</div>`;
    document.getElementById('waka_data').appendChild(bestDayDiv);

    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `<div id="waka_total" style="font-family: Rubik;margin-top:18px;"><span>total time</span></div><div>${total}</div>`;
    document.getElementById('waka_data').appendChild(totalDiv);

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
    });

    // Append the languages container to the element with id 'waka_lang'
    document.getElementById('waka_lang').appendChild(languagesContainer);
    console.log('📅 wakatime', resultArray);
})
.catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Error:', error);
});