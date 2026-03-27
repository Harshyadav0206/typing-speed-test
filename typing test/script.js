let words =["Java", "Pizza", "Burger", "Coding", "Speed", "Keyboard"];
let sentences = [
    "Java is a powerful language",
    "Practice typing daily",
    "Consistency is the key",
    "Accuracy matters more than speed"
];
let startTime;
let timerInterval;
let totalChars = 0;
let originalText ="";

function login() {
    let userField = document.getElementById("user");
    let passField = document.getElementById("pass");

    if (!userField || !passField) {
        alert("Input fields not found ❌");
        return;
    }

    let u = userField.value;
    let p = passField.value;

    if (u === "admin" && p === "1234") {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("gameBox").style.display = "block";

        localStorage.setItem("user", u);
    } else {
        alert("Wrong Login ❌");
    }
}
window.onload = function() {
    let user = localStorage.getItem("user");
    if (user) {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("gameBox").style.display = "block";
    }
};
function startGame() {
    let mode =document.getElementById("mode").value;
    document.getElementById("input").value = "";
    document.getElementById("result").innerText = "";
    totalChars = 0;
    clearTimeout(timerInterval);
   
    if (mode === "word") {
        originalText = words[Math.floor(Math.random() * words.length)];
    } 
    else if (mode === "sentence") {
        originalText = sentences[Math.floor(Math.random() * sentences.length)];
    } 
    else if (mode === "timer") {
        originalText = "Start typing as fast as you can...";
        timerInterval = setTimeout(endTimerMode, 30000);
    }
    document.getElementById("text").innerText = originalText;
    startTime = new Date().getTime();
}
document.getElementById("input").addEventListener("input", function () {

    let mode = document.getElementById("mode").value;
    let input = this.value;

    let displayHTML = "";
    let correct = 0;


    if (mode === "timer") {
        totalChars = input.length;
        return;
    }
for (let i = 0; i < originalText.length; i++) {
        if (input[i] == null) {
            displayHTML += originalText[i];
        }
        else if (input[i] === originalText[i]) {
            displayHTML += "<span class='correct'>" + originalText[i] + "</span>";
            correct++;
        }
        else {
            displayHTML += "<span class='wrong'>" + originalText[i] + "</span>";
        }
    }
 document.getElementById("text").innerHTML = displayHTML;
    if (input === originalText) {
        let endTime = new Date().getTime();
        let timeTaken = (endTime - startTime) / 1000;
        let wpm = Math.round((correct / 5) / (timeTaken / 60));
        let accuracy = Math.round((correct / originalText.length) * 100);
        document.getElementById("result").innerText =
            "Time: " + timeTaken.toFixed(2) + "s | WPM: " + wpm + " | Accuracy: " + accuracy + "%";

        saveScore(wpm);
    }
});
function endTimerMode() {
    let time = 30;
    let wpm = Math.round((totalChars / 5) / time * 60);

    document.getElementById("result").innerText =
        " Time's up! WPM: " + wpm;

    saveScore(wpm);
    function saveScore(score) {
    let user = localStorage.getItem("user") || "guest";
    let oldScore = localStorage.getItem(user + "_score");

    if (!oldScore || score > oldScore) {
        localStorage.setItem(user + "_score", score);
    }

    }
}