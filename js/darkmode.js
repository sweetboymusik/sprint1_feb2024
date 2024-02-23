//DARKMODE SWITCH
let r = document.querySelector(":root");
let mode;

// check if mode is on or off
localStorage.getItem("darkmode")
  ? (mode = localStorage.getItem("darkmode"))
  : (localStorage.setItem("darkmode", false), (mode = false));

// manually check box if needed on page load
mode
  ? (document.getElementById("darkmode").checked = true)
  : (document.getElementById("darkmode").checked = false);

// call function on load
darkMode();

function darkMode() {
  if (document.getElementById("darkmode").checked) {
    r.style.setProperty("--font-color", "#ccc");
    r.style.setProperty("--bg-color", "#1f212e");
    r.style.setProperty("--font-grey", "#888");
    localStorage.setItem("darkmode", true);
  } else {
    r.style.setProperty("--font-color", "#1f212e");
    r.style.setProperty("--bg-color", "#eee");
    r.style.setProperty("--font-grey", "#666");
    localStorage.setItem("darkmode", false);
  }
}
