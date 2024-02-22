fetch('following.json')
    .then(response => response.json())
    .then(following => {
        let table = document.querySelector('table');
        following.forEach(following => {
            let row = table.insertRow();
            let photocell = row.insertCell();
            let handlecell = row.insertCell();
            let namecell = row.insertCell();
            photocell.innerHTML = `<img src="${following.photo}" alt="follower" class="followerphoto">`;
            handlecell.textContent = following.handle;
            namecell.textContent = following.name;
        });
    });