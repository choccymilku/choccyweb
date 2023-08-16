function fetchAndUpdateIcons(discord_user_id) {
    fetch(`https://dcdn.dstn.to/profile/${discord_user_id}`)
      .then(response => response.json())
      .then(data => {
        const githubAccount = data.connected_accounts.find(account => account.type === "github");
        const projectsMainElement = document.querySelector('#project_inner');
        
        // Clear existing content
        projectsMainElement.innerHTML = '';
  
        if (githubAccount) {
          const username = githubAccount.name; // Use the name from the "github" account

        //make a map of the languages to the icons
        const languageMap = {
          "html": "devicon-html5-plain",
          "css": "devicon-css3-plain",
          "scss": "devicon-sass-original",
          "vue": "devicon-vuejs-plain",
        }
  
          fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(repos => {
        repos.forEach(repo => {
            const repoDiv = document.createElement('div');
            repoDiv.classList.add('project-div');
            
            const repoInnerDiv = document.createElement('div');
            repoInnerDiv.classList.add('project-div-inner');
            
            const repoName = document.createElement('h3');
            repoName.classList.add('project-name');
            const repoNameLink = document.createElement('a'); // Create <a> element for the name
            repoNameLink.href = repo.html_url;
            repoNameLink.target = '_blank';
            repoNameLink.innerHTML = `${repo.name} <i class="fa-solid fa-arrow-up-right-from-square"></i>`; // Set the name text
            repoName.appendChild(repoNameLink); // Append the <a> element to the <h3>
            
            const repoDescription = document.createElement('p');
            repoDescription.classList.add('project-description');
            
            if (repo.description) {
              repoDescription.innerHTML = 
                `<i class="fa-solid fa-circle-info"></i>
                <span style="border-bottom:3px solid var(--text);">description:</span><br>
                ${repo.description}`;
            } else {
              repoDescription.innerHTML = ``;
            }
        
            const repoLanguage = document.createElement('p');
            repoLanguage.classList.add('project-language');
            const languageText = repo.language ? repo.language.toLowerCase() : 'N/A';
            let languageIconClass = '';
            
            if (languageText in languageMap) {
              languageIconClass = languageMap[languageText];
            } else if (repo.name && repo.name.toLowerCase() in languageMap) {
              languageIconClass = languageMap[repo.name.toLowerCase()];
            }
            
            if (languageIconClass) {
              repoLanguage.innerHTML = 
                `<i class="fa-solid fa-language"></i>
                <span style="border-bottom:3px solid var(--text);">language:</span><br>
                <span style="margin-top:14px;">${languageText}</span> <i class="${languageIconClass}"></i>`;
            } else {
              repoLanguage.innerHTML = '';
            }

            repoInnerDiv.appendChild(repoName);
            repoInnerDiv.appendChild(repoDescription);
            repoInnerDiv.appendChild(repoLanguage);
            
            repoDiv.appendChild(repoInnerDiv);
            projectsMainElement.appendChild(repoDiv);
        });            
      })
      .catch(error => {
        console.error("Error fetching GitHub repos:", error);
      });
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }
  
  fetchAndUpdateIcons(discord_user_id);
  