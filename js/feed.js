/* 
    This script reads the postData.json file and local storage
    to generate html to be injected into each page's post feed.

    NOTE: All of the html for the post feed is generated and
    added to the DOM through this script, The HTML document for
    each page will have an almost-empty feed element. Check
    generatePost() and generateReply() functions for the 
    majority of the html for the feed section(s).
*/

// reference the current page and feed element
let page = document.title;
let feed = document.querySelector(".post-feed");

// read JSON and store in local storage (if not already there)
let postData;
if (!localStorage.getItem("postData"))
  fetch("../data/postData.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((post) => generatePost(post));
      localStorage.setItem("postData", JSON.stringify(data));
      postData = JSON.parse(localStorage.getItem("postData"));
      let id = 90001;
      localStorage.setItem("nextId", id);
      location.reload();
    })
    .catch((error) => {
      console.log(error);
    });

// retrieve post data from local storage (if there)
if (localStorage.getItem("postData")) {
  postData = JSON.parse(localStorage.getItem("postData"));
}

// generate posts (all for Home page, individual user posts for profile page)
if (page === "Home") {
  postData.forEach((post) => generatePost(post));
} else {
  let posts = postData.filter((post) => post.user === page);
  posts.forEach((post) => generatePost(post));
}

function updatePostData(id, key, value) {
  // read post data from local storage
  let data = JSON.parse(localStorage.getItem("postData"));

  // find the correct entry
  let entry;
  data.forEach((post) => {
    if (post.id === parseInt(id)) entry = post;
  });

  // handle comment/reply add
  if (key === "replyAdd") {
    entry.comments.push(value);
  }

  // handle comment/reply delete
  if (key === "replyDel") {
    for (let i = 0; i < entry.comments.length; i++) {
      if (entry.comments[i].id === value) {
        entry.comments.splice(i, 1);
        break;
      }
    }
  }

  // handle repost change
  if (key === "repost") {
    entry.reposts = value;
    entry.reposted = !entry.reposted;
  }

  // handle heart change
  if (key === "heart") {
    entry.hearts = value;
    entry.hearted = !entry.hearted;
  }

  // handle bookmark change
  if (key === "bookmark") {
    entry.bookmark = !entry.bookmark;
  }

  // update changes in local storage
  localStorage.setItem("postData", JSON.stringify(data));
}

function generatePost(post) {
  // extract all properties from post data
  let {
    id,
    user,
    userName,
    verified,
    time,
    content,
    reposts,
    hearts,
    bookmark,
    media,
    comments,
    hearted,
    reposted,
  } = post;

  // create html template
  let html = `
      <div class="post-container">
        <a href="">
          <img
            src="../assets/feed/${user}.png"
            alt="user profile picture"
            class="post-profile-pic"
          />
        </a>

        <div class="post-contents">

          <header class="post-header">
            <h3 class="post-user-name"><a href="">${userName}</a></h3>
            ${isVerified(verified)}
            <span>@${user} &CenterDot; <time>${time}</time></span>
          </header>

          <p class="post-text">
            ${content}
          </p>

          ${generateMedia(media) || ""}

          <footer class="post-footer">

            <button class="post-button comment">
              <i class="fa-regular fa-comment"></i>
              <span>${comments.length}</span>
            </button>

            <button type="button" class="${
              reposted ? `active` : ""
            } post-button re-post">
              <i class="fa-solid fa-retweet"></i>
              <span>${reposts}</span>
            </button>

            <button class="${hearted ? `active` : ""} post-button heart">
              <i class="${hearted ? `fa-solid` : `fa-regular`} fa-heart"></i>
              <span>${hearts}</span>
            </button>

            <div class="post-button share">
              <button type="button">
                <i class="${
                  bookmark ? "active fa-solid" : "fa-regular"
                } fa-bookmark bookmark"></i>
              </button>
              <button type="button">
                <i class="fa-solid fa-arrow-up-from-bracket send"></i>
              </button>

            </div>
          </footer>
        </div>
      </div>`;

  // add new post to feed element
  let postElement = document.createElement("article");
  postElement.classList.add("post");
  postElement.id = `id${id}`;
  postElement.innerHTML = html;

  let commentElements = comments.map((reply) => generateReply(reply));
  commentElements.forEach((element) => postElement.appendChild(element));
  postElement.appendChild(generateReplyField());

  feed.appendChild(postElement);
}

function generateReply(reply) {
  // extract all properties from reply data
  let { id, user, userName, verified, time, content, trash } = reply;

  // create html template
  let html = `
      <i class="fa-solid fa-arrow-turn-up reply-icon"></i>

      <a href="">
        <img
          src="../assets/feed/${user}.png"
          alt="user profile picture"
          class="post-profile-pic"
        />
      </a>

      <div class="post-contents">

        <header class="post-header">
          <h3 class="post-user-name"><a href="">${userName}</a></h3>
          ${isVerified(verified)}
          <span>@${user} &CenterDot; <time>${time}</time></span>
        </header>

        <p class="post-text">
          ${content}
        </p>

      </div>

      ${canDelete(trash)}`;

  // create div container and apply properties
  let replyElement = document.createElement("div");
  replyElement.classList.add("post-container", "reply", "hidden");
  replyElement.innerHTML = html;
  replyElement.id = `id${id}`;

  // return new element to post
  return replyElement;
}

function isVerified(verified) {
  //return verified icon if user is verified
  return verified
    ? `
      <img
        src="../assets/feed/verified.png"
        alt="verified icon"
        class="post-verified-icon"
      />`
    : "";
}

function canDelete(trash) {
  // return trash icon if post was made by user
  return trash
    ? `
  <button class="post-button delete">
    <i class="fa-regular fa-trash-can"></i>
  </button>`
    : "";
}

function generateMedia(media) {
  // exit function if no media present
  if (media.length === 0) return;

  // add all assets to html template
  let html = "";
  media.forEach((asset) => (html += asset));

  // return new element to post
  return `<div class="post-images">${html}</div>`;
}

function generateReplyField() {
  // create container and apply properties
  let container = document.createElement("div");
  container.classList.add("post-container", "reply", "reply-field", "hidden");

  // create html template
  let html = `
          <input
            type="text"
            name="reply"
            placeholder="Reply"
            class="reply-input"
          />
          <button type="submit" class="reply-btn">Reply</button>`;

  container.innerHTML = html;

  // return new element to post
  return container;
}

function handleComment(e) {
  // reference icon
  let icon = this.children[0];

  // toggle necessary classes
  this.classList.toggle("active");
  icon.classList.toggle("fa-regular");
  icon.classList.toggle("fa-solid");

  // gather all comments/replies
  let comments = this.closest(".post").querySelectorAll(".reply");

  // toggle on/off hidden class
  comments.forEach((comment) => comment.classList.toggle("hidden"));
}

function handleRepost(e) {
  // reference icon, text, and specific post
  let icon = this.children[0];
  let text = this.children[1];
  let id = this.closest(".post").id;

  // toggle necessary classes
  this.classList.toggle("active");

  // extract value from text
  let value = parseInt(text.innerText);

  // handle ui and data update based on active status
  if (this.classList.contains("active")) {
    text.innerText = `${value + 1}`;
    updatePostData(id.slice(2), "repost", value + 1);
  } else {
    text.innerText = `${value - 1}`;
    updatePostData(id.slice(2), "repost", value - 1);
  }
}

function handleHeart() {
  // reference icon, text, and specific post
  let icon = this.children[0];
  let text = this.children[1];
  let id = this.closest(".post").id;

  // toggle necessary classes
  this.classList.toggle("active");
  icon.classList.toggle("fa-regular");
  icon.classList.toggle("fa-solid");

  // extract value from text
  let value = parseInt(text.innerText);

  // handle ui and data update based on active status
  if (this.classList.contains("active")) {
    text.innerText = `${value + 1}`;
    updatePostData(id.slice(2), "heart", value + 1);
  } else {
    text.innerText = `${value - 1}`;
    updatePostData(id.slice(2), "heart", value - 1);
  }
}

function handleBookmark() {
  // reference post
  let id = this.closest(".post").id;

  // toggle necessary classes
  this.classList.toggle("active");
  this.classList.toggle("fa-regular");
  this.classList.toggle("fa-solid");

  // handle ui and data update
  updatePostData(id.slice(2), "bookmark", null);
}

function handleSend() {
  alert("Shared with your whole contact list. Cannot undo!");
}

function handleReplyAdd(e) {
  // exit function if enter key is not the button pressed
  if (e.target.classList.contains("reply-input") && e.key !== "Enter") return;

  // get input and reset input field
  let input;
  if (e.target.classList.contains("reply-input")) {
    input = e.target.value;
    e.target.value = null;
  } else {
    input = e.target.previousElementSibling.value;
    e.target.previousElementSibling.value = null;
  }

  // check if input field is empty and exit if true
  if (!input) {
    alert("Reply cannot be empty!");
    return;
  }

  // reference post and comment button
  let post = e.target.closest(".post");
  let commentBtn = post.children[0].querySelector(".comment");

  // create div containers
  let container = document.createElement("div");
  let contents = document.createElement("div");
  let header = document.createElement("header");

  // assign classes to div containers
  container.classList.add("post-container", "reply");
  contents.classList.add("post-contents");
  header.classList.add("post-header");

  // create post elements
  let icon = document.createElement("i");
  let delBtn = document.createElement("button");
  let del = document.createElement("i");
  let pic = document.createElement("a");
  let userName = document.createElement("h3");
  let userInfo = document.createElement("span");
  let text = document.createElement("p");

  // assign classes to post elements
  userName.classList.add("post-user-name");
  text.classList.add("post-text");
  icon.classList.add("fa-solid", "fa-arrow-turn-up", "reply-icon");
  del.classList.add("fa-regular", "fa-trash-can");
  delBtn.classList.add("post-button", "delete");

  // set comment id and store next id
  let id = localStorage.getItem("nextId");
  container.id = `id${id}`;
  localStorage.setItem("nextId", parseInt(id) + 1);

  // values to be written to local storage
  let values = {
    id: id,
    user: "TechHubNL",
    userName: "Tech Hub NL",
    verified: true,
    time: "just now",
    content: `${input}`,
    trash: true,
  };
  updatePostData(post.id.slice(2), "replyAdd", values);

  // assign values to elements
  text.innerText = input;
  userName.innerHTML = `<a href="">Tech Hub NL</a>`;
  userInfo.innerHTML = `@TechHubNL &CenterDot; <time>just now</time>`;
  pic.innerHTML = `
  <img src="../assets/feed/TechHubNL.png" 
       alt="user profile picture" 
       class="post-profile-pic">`;

  // attach event listener to new delete post button
  delBtn.addEventListener("click", handleReplyDel);

  // build parent/child tree for post component
  delBtn.appendChild(del);
  header.appendChild(userName);
  header.appendChild(userInfo);
  contents.appendChild(header);
  contents.appendChild(text);
  container.appendChild(icon);
  container.appendChild(pic);
  container.appendChild(contents);
  container.appendChild(delBtn);

  // add post component to the DOM
  e.target.parentElement.insertAdjacentElement("beforebegin", container);

  // increment comment count
  let prevValue = parseInt(commentBtn.children[1].innerText);
  commentBtn.children[1].innerText = `${prevValue + 1}`;
}

function handleReplyDel(e) {
  // get reply, id, and comment button
  let reply = this.closest(".reply");
  let replyId = reply.id;

  let post = reply.closest(".post");
  let postId = post.id;

  let label = reply.closest(".post").querySelector(".comment").children[1];

  // update the comment icon counter
  let prevValue = parseInt(label.innerText);
  label.innerText = `${prevValue - 1}`;

  // remove element and update local storage
  e.target.closest(".reply").remove();
  updatePostData(postId.slice(2), "replyDel", replyId.slice(2));
}

// set event listeners for each post/reply element
const posts = document.querySelectorAll(".post");
const deleteBtn = document.querySelectorAll(".fa-trash-can");

posts.forEach((post) => {
  let commentBtn = post.querySelector(".comment");
  let repostBtn = post.querySelector(".re-post");
  let heartBtn = post.querySelector(".heart");
  let bookmarkBtn = post.querySelector(".bookmark");
  let sendBtn = post.querySelector(".send");

  let replyBtn = post.querySelector(".reply-btn");
  let replyInput = post.querySelector(".reply-input");

  commentBtn.addEventListener("click", handleComment);
  repostBtn.addEventListener("click", handleRepost);
  heartBtn.addEventListener("click", handleHeart);
  bookmarkBtn.addEventListener("click", handleBookmark);
  sendBtn.addEventListener("click", handleSend);

  replyBtn.addEventListener("click", handleReplyAdd);
  replyInput.addEventListener("keydown", handleReplyAdd);
});

deleteBtn.forEach((btn) => {
  btn.addEventListener("click", handleReplyDel);
});

// insert end of feed component
let endOfFeed = `
  <article class="post">
    <div class="post-container end">
    <p>End of feed. Back to the top!</p>
    <a href="#top"><i class="fa-solid fa-circle-up"></i></a>
    </div>
  </article>
`;

let end = document.createElement("article");
end.classList.add("post-container", "end");
end.innerHTML = endOfFeed;
feed.appendChild(end);
