// Replace the introductory question text with actual name/title text
var name = ""
var title = "jess bodie richards"

// Listen for 1st animations to end, then fade in new text
document.getElementById("showName").addEventListener("animationend", fadeNewText);
document.getElementById("showTitle").addEventListener("animationend",  fadeNewText);

function fadeNewText (e) {
    e.target.setAttribute("style", "font-size: 3.5rem; animation-name: fadeIn; animation-delay: 0.15s; animation-duration: 0.8s;")

    if (e.target.id === "showName") {
        e.target.textContent = name;
        document.getElementById("showName").removeEventListener("animationend", fadeNewText);
    } else if (e.target.id === "showTitle") {
        e.target.textContent = title;
        document.getElementById("showTitle").removeEventListener("animationend", fadeNewText);
    }
}
