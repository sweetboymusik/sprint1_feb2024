/* 
This file is used to fetch the following data 
from following.json file and display it in the following.html page.
*/

fetch('/data/following.json')
    .then(response => response.json())
    .then(following => {
        let table = document.querySelector('table');
        following.forEach(following => {
            let row = table.insertRow();
            let photocell = row.insertCell();
            let handlecell = row.insertCell();
            let namecell = row.insertCell();
            photocell.innerHTML = `<img src="${following.photo}" alt="follower" class="followingphoto">`;
            handlecell.textContent = following.handle;
            namecell.textContent = following.name;
        });
    });