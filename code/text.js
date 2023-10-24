document.addEventListener('DOMContentLoaded', function() {
    // Fetch the TO-DO list from the URL
    fetch('https://raw.githubusercontent.com/choccymilku/choccy-newer-and-improved/main/TEXT.md')
        .then(response => response.text())
        .then(data => {
            // version number and text
            const versionMatch = data.version.match(/version (\d+\.\d+\.\d+)/i);
            const version = versionMatch ? `v.${versionMatch[1]}` : 'forgor the version 💀';

            // add version into the page
            const versionElement = document.getElementById('version');
            versionElement.innerHTML = version + ' <i class="fa-solid fa-circle-question"></i>';
            // match icons and format
            const versionText = data.version.replace(/^version \d+\.\d+\.\d+\n/, '').trim().replace(/\n/g, '<br>');
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
            
            const credit = data.galleryCredit;
            const creditDiv = document.getElementById('credits');
            creditDiv.innerHTML = credit;

            const github_log = [version, todo, credit];
            console.log(github_log);
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Error fetching data:', error);
        });
});
