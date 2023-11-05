function finishLoading() {
          document.getElementById('body').style.backgroundColor = 'var(--color2)';
      
          if (localStorage.getItem("activeTab") !== "tab_data") {
            if ($(window).width() >= 550) {
              var visibleBarHeight = $(".bar:visible").height();
              var updatedHeight = visibleBarHeight + 2; // Add 2 pixels to the original height
              $("#preloader_main").css("height", updatedHeight + "px", "important");
              console.log("🐛 visible Bar Height:", visibleBarHeight);
            }
          }
      
          $(document).ready(function() {
            var totalWidth = 0;
            var maxWidth = $("#tabs").width(); // Get the maximum allowed width of #tabs
      
            $("#tabs").children().each(function(index) {
              var elementWidth = $(this).width();
              totalWidth += elementWidth + 16.5;
            });
      
            if (totalWidth <= maxWidth) {
              var updatedWidth = totalWidth;
              $("#preloader_tabs").css("width", updatedWidth + "px");
              console.log("🐛 total tabs Width:", totalWidth);
            } else {
              console.log("🐛 total width exceeds the maximum allowed width");
              $("#preloader_tabs").css("width", "calc(100% - 20px)");
              $("#preloader_tabs").css("transition", "0s");
            }
          });
      
          $("#preloader").css("background-color", "transparent");
          $("#preloader_tabs").css("transition", "0.3s");
          $("#preloader_main").css("transition", "0.3s");
          $("#preloader_topbar_left_inner").css("transition", "0.3s");
          $("#preloader_topbar_left_inner").css("opacity", "0");
      
          // calculate how long it takes to load the page and color the background
          var loadtime = performance.now();
          var loadtime = Math.round(loadtime);
          var loadtime = loadtime / 1000;
          var loadtime = loadtime + "s";
          console.log("📈 page Load Time:", loadtime);
        
          // 500ms delay
          setTimeout(function() {
            $("#preloader").css("opacity", "0");
            $("body").css("background-color", "var(--color2)");
          }, 700);
          setTimeout(function() {
            $("#preloader").css("display", "none");
          }, 900);
        }

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
            const versionText = data.update.replace(/\n/g, '<br>');
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
              finishLoading();
              console.log("🐛 localStorage is tab_me");
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // If there's an error with the fetch, you can still proceed with the rest of the window.onload logic
        finishLoading();
      });
  });