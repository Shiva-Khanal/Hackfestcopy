const buttonsMath = document.querySelectorAll(".Mathematics-button");

buttonsMath.forEach(button => {
  button.addEventListener("click", () => {
    const subject = button.textContent;
    localStorage.setItem("selectedSubject", subject);
    window.location.href = "Subjects/Math/math.html";
  });
});
const buttonsPhy = document.querySelectorAll(".Physics-button");

buttonsPhy.forEach(button => {
  button.addEventListener("click", () => {
    const subject = button.textContent;
    localStorage.setItem("selectedSubject", subject);
    window.location.href = "Subjects/Physics/physics.html";
  });
});
const buttonsOth = document.querySelectorAll(".subject-button");

buttonsOth.forEach(button => {
  button.addEventListener("click", () => {
    const subject = button.textContent;
    localStorage.setItem("selectedSubject", subject);
    window.location.href = "Subjects/Othersubject.html";
  });
});