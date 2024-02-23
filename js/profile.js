/* 
This file contains the js code for the profile page.
*/

// Get the elements from the HTML file
let body = document.body;
let profilephoto = document.querySelector("#photo1");
let followpic = document.querySelector("#followicon");
let infopic = document.querySelector("#infoicon");
let postspic = document.querySelector("#postsicon");
let following = document.querySelector("#followinglink");

// Open the profile photo in a new tab when clicked
function photoClick(e) {
  e.preventDefault();
  window.open(profilephoto.src, "_blank", "width=400,height=400");
}

// Toggle the follow button and change it to "Following" when clicked
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

// Display an alert when the info icon is clicked
function infoClick(e) {
  e.preventDefault();
  alert("For more information, please visit our website.");
}

// Ttoggle the tabs and change the active tab
function tabClick(e) {
  e.preventDefault();
  postspic.classList.remove("tab-active");
  followerspic.classList.remove("tab-active");
  e.target.classList.add("tab-active");
}

// Open the following page in a new tab
function followingClick(e) {
  e.preventDefault();
  window.open(
    "/pages/profile/following.html",
    "_blank",
    "width=600,height=600"
  );
}

// Call the functions when the icons are clicked
profilephoto.addEventListener("click", photoClick);
followpic.addEventListener("click", followClick);
infopic.addEventListener("click", infoClick);

postspic.addEventListener("click", tabClick);
following.addEventListener("click", followingClick);
