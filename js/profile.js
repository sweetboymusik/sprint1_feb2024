let body = document.body;
let profilephoto = document.querySelector("#photo1");
let followpic = document.querySelector("#followicon");
let infopic = document.querySelector("#infoicon");
let postspic = document.querySelector("#postsicon");
let followerspic = document.querySelector("#likesicon");
let following = document.querySelector("#followinglink");

function photoClick(e) {
  e.preventDefault();
  window.open(profilephoto.src, "_blank", "width=400,height=400");
}

function followClick(e) {
  e.preventDefault();
  let clickedElement = e.target;
  clickedElement.classList.toggle("follow-blue");
  if (clickedElement.classList.contains("follow-blue")) {
    clickedElement.innerText = "Following";
  } else {
    clickedElement.innerText = "Follow";
  }
}

function infoClick(e) {
  e.preventDefault();
  alert("For more information, please visit www.techhubnl.ca");
}

function tabClick(e) {
  e.preventDefault();
  postspic.classList.remove("tab-active");
  followerspic.classList.remove("tab-active");
  e.target.classList.add("tab-active");
}

function followingClick(e) {
  e.preventDefault();
  window.open(
    "/pages/profile/following.html",
    "_blank",
    "width=600,height=600"
  );
}

profilephoto.addEventListener("click", photoClick);
followpic.addEventListener("click", followClick);
infopic.addEventListener("click", infoClick);

postspic.addEventListener("click", tabClick);
followerspic.addEventListener("click", tabClick);
following.addEventListener("click", followingClick);
