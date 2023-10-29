document.addEventListener('DOMContentLoaded', function() {
    // Fetch the TO-DO list from the URL
    fetch('https://api.choccymilk.uk/github')
        .then(response => response.json())
        .then(data => {
            // add version into the page
            const version = data.version;
            const versionElement = document.getElementById('version');
            versionElement.innerHTML = version + ' <i class="fa-solid fa-circle-question"></i>';

            // match icons and format
            const versionText = data.versionText.replace(/\n/g, '<br>');
            const versionIconMap = {
                'add': 'fas fa-plus',
                'fix': 'fas fa-wrench',
                'bug': 'fas fa-bug',
                'temp': 'fas fa-tools',
                'kill': 'fas fa-skull',
            };
            const formattedVersionText = Object.keys(versionIconMap).reduce((formatted, pattern) => {
                const regex = new RegExp(`\\b${pattern}\\b -`, 'gi'); // Modified regex pattern to include " -"
                return formatted.replace(regex, `<i class="${versionIconMap[pattern]}"></i>`);
            }, versionText);
            // add update list into the page
            const versionUpdateDiv = document.getElementById('update_notes');
            versionUpdateDiv.innerHTML = formattedVersionText;

            // to-do list
            const todo = data.todo;
            const todoDiv = document.getElementById('todo_list');
            const todoItems = todo.split('\n').filter(item => item.trim() !== '');

            // check if text exists
            if (todoItems.length > 0) {
                let todoListHTML = '<ol class="todo_list_items">'; // Start ordered list
            
                todoItems.forEach(item => {
                    todoListHTML += `<li>${item}</li>`; // Wrap each item in <li> tags
                });
            
                todoListHTML += '</ol>'; // End ordered list
                todoDiv.innerHTML = '<span class="todo_list_text">to-do list: </span>' + todoListHTML;
            } else {
                todoDiv.style.display = 'none'; // Hide the todoDiv if there are no items
            }

            function updateGalleryVisibility() {
                if (localStorage.getItem('activeTab') === 'tab_gallery') {
                  document.getElementById('gallery_credits').style.display = "block";
                } else {
                  document.getElementById('gallery_credits').style.display = "none";
                }
              }
              
              // Initial setup
              updateGalleryVisibility();
              
              // Set up a timer to continuously check for localStorage changes
              setInterval(function() {
                updateGalleryVisibility();
              }, 0); // Check every 1 second (adjust as needed)
            
              const credits = data.credits;
              const lastIndex = credits.lastIndexOf('\n');
              const credit = credits.substring(0, lastIndex).replace(/\n/g, ', ') + credits.substring(lastIndex);
              const creditDiv = document.getElementById('credits');
              
              // if it includes "(if i forgot some, my apologies)"
              if (credit.includes('(if i forgot some, my apologies, please message me on discord with a request that you want to be added in (provide proof))')) {
                const creditText = credit.replace('(if i forgot some, my apologies, please message me on discord with a request that you want to be added in (provide proof))', '<br><br><span style="font-family:SourceCode;font-size:12px;">(if i forgot some, my apologies, please message me on discord with a request that you want to be added in (provide proof))</span>');
                creditDiv.innerHTML = `${creditText}`;
              } else {
                creditDiv.innerHTML = credit;
              }
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Error fetching data:', error);
        });
});