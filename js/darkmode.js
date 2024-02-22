

//DARKMODE SWITCH
let r = document.querySelector(':root');

function darkMode() {
    
    if (document.getElementById("darkmode").checked) {
        r.style.setProperty('--font-color', 'white');
        r.style.setProperty('--bg-color', 'black');
        r.style.setProperty('--font-grey', 'lightgrey');
    } else {
    r.style.setProperty('--font-color', 'black');
    r.style.setProperty('--bg-color', 'white');
    r.style.setProperty('--font-grey', 'grey');
    }
        
}