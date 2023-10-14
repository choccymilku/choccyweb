async function translateText() {
    const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
    const translateUrl = 'https://choccy-translate.bakedchococookie-e68.workers.dev/';

    const idsToTranslate = [
        'bug', 
        'fonts', 
        'translate', 
        'theme', 
        'time_format', 
        'todo_list', 
        'top_artists', 
        'top_songs', 
        'top_songs_info', 
        'games_and_activities', 
        'games_and_activities_info',
        'top_languages',
        'top_languages_info',
        'waka_best',
        'waka_total'
    ];

    idsToTranslate.forEach(async (id) => {
        const timeFormatDiv = document.getElementById(id);
        const textElements = timeFormatDiv.querySelectorAll('span, div, li'); // Select both span and div elements within the specified div
    
        textElements.forEach(async (element) => {
            const textToTranslate = element.textContent.trim();
            
            // Check if the element has text content
            if (textToTranslate) {
                console.log('Text to translate:', textToTranslate);
                const targetLanguage = document.getElementById('languageSelector').value;
        
                // Display loading icon
                document.getElementById('loadingIcon').style.display = 'block';
                
                try {
                    const response = await fetch(corsAnywhere + translateUrl, {
                        method: 'POST',
                        body: JSON.stringify({ text: textToTranslate, target_lang: targetLanguage }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    
                    const data = await response.json();
                    
                    // Replace the text inside the element with the translated text
                    element.textContent = data.response.translated_text;
                    
                    // Hide loading icon
                    document.getElementById('loadingIcon').style.display = 'none';
                } catch (error) {
                    // Handle errors
                    console.error('Error:', error);
                    // Hide loading icon
                    document.getElementById('loadingIcon').style.display = 'none';
                }
            }
        });
    });
}
