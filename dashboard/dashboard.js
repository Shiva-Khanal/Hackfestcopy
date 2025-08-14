document.getElementById("Inbuilt").addEventListener("click", function(event) {
    let points = Number(localStorage.getItem("points")) || 0;

    if (points < 5) {
        event.preventDefault(); // Stop the link from going to feature1.html
        alert(`You need at least 5 points for this feature. You have ${points}.`);
    }
    // If points >= 5, the link works normally and navigates
});
document.getElementById("Selftest").addEventListener("click", function(event) {
    let points = Number(localStorage.getItem("points")) || 0;

    if (points < 15) {
        event.preventDefault();
        alert(`You need at least 15 points for this feature. You have ${points}.`);
    }
});
document.getElementById("Notes").addEventListener("click", function(event) {
    let points = Number(localStorage.getItem("points")) || 0;

    if (points < 10) {
        event.preventDefault();
        alert(`You need at least 10 points for this feature. You have ${points}.`);
    }
});
document.getElementById("Review").addEventListener("click", function(event) {
    let points = Number(localStorage.getItem("points")) || 0;

    if (points < 20) {
        event.preventDefault();
        alert(`You need at least 20 points for this feature. You have ${points}.`);
    }
});
document.getElementById("selfstudy").addEventListener("click", function(event) {
    let points = Number(localStorage.getItem("points")) || 0;

    if (points < 5) {
        event.preventDefault();
        alert(`You need at least 5 points for this feature. You have ${points}.`);
    }
});