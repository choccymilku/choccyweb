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
          "shell" : "devicon-bash-plain",
          "go" : "devicon-go-original-wordmark"
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
            const repoNameLink = document.createElement('a');
            repoNameLink.href = repo.html_url;
            repoNameLink.target = '_blank';
            repoNameLink.innerHTML = `${repo.name} <i class="fa-solid fa-arrow-up-right-from-square"></i>`;
            repoName.appendChild(repoNameLink);
    
            const repoDescription = document.createElement('p');
            repoDescription.classList.add('project-description');
            if (repo.description) {
                repoDescription.innerHTML =
                    `<i class="fa-solid fa-circle-info"></i>
                    <span style="border-bottom:3px solid var(--text);">description:</span><br>
                    ${repo.description}`;
            } else {
                repoDescription.innerHTML = '';
            }
    
            const repoInfoDiv = document.createElement('div'); // Create div for language and created_at
            repoInfoDiv.classList.add('project-info');
    
            const repoLanguage = document.createElement('p');
            repoLanguage.classList.add('project-info-inner');
            const languageText = repo.language ? repo.language.toLowerCase() : 'N/A';
            let languageIconClass = languageMap[languageText] || '';
            if (!languageIconClass) {
                if (languageText !== 'n/a') {
                    languageIconClass = `devicon-${languageText}-plain`;
                } else {
                    languageIconClass = '';
                }
            }
            if (languageIconClass) {
                repoLanguage.innerHTML =
                    `<i class="fa-solid fa-language"></i>
                    <span style="border-bottom:3px solid var(--text);">language:</span><br>
                    <span style="margin-top:14px;">${languageText}</span> <i class="${languageIconClass}"></i>`;
            } else {
                repoLanguage.innerHTML = '';
            }
    
            repoInfoDiv.appendChild(repoLanguage);
            repoInnerDiv.appendChild(repoName);
            repoInnerDiv.appendChild(repoDescription);
            repoInnerDiv.appendChild(repoInfoDiv);
    
            repoDiv.appendChild(repoInnerDiv);
            projectsMainElement.appendChild(repoDiv);

                    // Remove skeleton loaders in case of an error
        const skeletonLoaderProjects = document.getElementById('skeleton_loader_projects');
        if (skeletonLoaderProjects) {
          skeletonLoaderProjects.remove();
        }
          })     
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
  