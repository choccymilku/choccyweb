// fetch to waka time api, log the data

fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://wakatime.com/api/v1/users/current/all_time_since_today`)}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
