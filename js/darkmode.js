//DARKMODE SWITCH
let r = document.querySelector(":root");
let checkbox = document.getElementById("darkmode");

function darkMode() {
  if (checkbox.checked) {
    localStorage.setItem("mode", true);
    r.style.setProperty("--font-color", "#ccc");
    r.style.setProperty("--font-light-grey", "#393b4c");
    r.style.setProperty("--bg-color", "#1f212e");
    r.style.setProperty("--font-grey", "#888");
  } else {
    localStorage.setItem("mode", false);
    r.style.setProperty("--font-color", "#1f212e");
    r.style.setProperty("--font-light-grey", "#ccc");
    r.style.setProperty("--bg-color", "#eee");
    r.style.setProperty("--font-grey", "#666");
  }
}

// set mode variable if not set
if (localStorage.getItem("mode") === null) {
  localStorage.setItem("mode", false);
}

checkbox.addEventListener("click", darkMode);

// set darkmode on reload
if (localStorage.getItem("mode") === "true") {
  console.log("click!");
  checkbox.click();
}
