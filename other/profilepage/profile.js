let body = document.body;
let profilephoto = document.querySelector("#photo1");
let followpic = document.querySelector("#followicon");
let infopic = document.querySelector("#infoicon");
let postspic = document.querySelector("#postsicon");
let repliespic = document.querySelector("#repliesicon");
let mediapic = document.querySelector("#mediaicon");
let likespic = document.querySelector("#likesicon");
let following = document.querySelector("#followinglink");

function photoClick(e) {
    e.preventDefault();
    window.open(profilephoto.src, "_blank", "width=400,height=400");
}

function followClick(e) {
    e.preventDefault(); 
    let clickedElement = e.target;
    clickedElement.classList.toggle('follow-blue');
    if (clickedElement.classList.contains('follow-blue')) {
        clickedElement.innerText = 'Following';
    } else {
        clickedElement.innerText = 'Follow';
    }
}

function infoClick(e) {
    e.preventDefault();
    window.open("https://www.techhubnl.ca", "_blank", "width=400,height=400");
}

function tabClick(e) {
    e.preventDefault();
    postspic.classList.remove('tab-active');
    repliespic.classList.remove('tab-active');
    mediapic.classList.remove('tab-active');
    likespic.classList.remove('tab-active');
    e.target.classList.add('tab-active');
}

function followingClick(e) {
    e.preventDefault();
    window.open("/following.html", "_blank", "width=600,height=600");
}

profilephoto.addEventListener("click", photoClick);
followpic.addEventListener("click", followClick);
infopic.addEventListener("click", infoClick);

postspic.addEventListener("click", tabClick);
repliespic.addEventListener("click", tabClick);
mediapic.addEventListener("click", tabClick);
likespic.addEventListener("click", tabClick);  
following.addEventListener("click", followingClick);  


