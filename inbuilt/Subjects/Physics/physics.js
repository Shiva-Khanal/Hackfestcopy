const easyQuestions = [ 
  {q:"What is the SI unit of force?", opts:["Newton","Joule","Watt","Pascal"], ans:"Newton"},
  {q:"Acceleration due to gravity on Earth is approximately?", opts:["8.9 m/s²","9.8 m/s²","10.8 m/s²","9.0 m/s²"], ans:"9.8 m/s²"},
  {q:"1 kilometre = ?", opts:["100 m","1000 m","10000 m","1 m"], ans:"1000 m"},
  {q:"Which physical quantity is measured in Joules?", opts:["Force","Energy","Power","Pressure"], ans:"Energy"},
  {q:"Speed = ?", opts:["Distance × Time","Distance / Time","Time / Distance","Acceleration × Time"], ans:"Distance / Time"},
  {q:"Which of these is a scalar quantity?", opts:["Velocity","Force","Speed","Acceleration"], ans:"Speed"},
  {q:"The device used to measure electric current is?", opts:["Voltmeter","Ammeter","Ohmmeter","Thermometer"], ans:"Ammeter"},
  {q:"Light travels fastest in which medium?", opts:["Glass","Water","Air","Vacuum"], ans:"Vacuum"},
  {q:"Which of the following is NOT a unit of pressure?", opts:["Pascal","Bar","Newton","Torr"], ans:"Newton"},
  {q:"Who proposed the laws of motion?", opts:["Einstein","Newton","Galileo","Faraday"], ans:"Newton"}
];

const hardQuestions = [
  {q:"In SHM, displacement is given by x = 0.05cos(10πt). The amplitude is?", opts:["0.05 m","0.1 m","5 m","10 m"], ans:"0.05 m"},
  {q:"The escape velocity from Earth is approximately?", opts:["7 km/s","11.2 km/s","9.8 km/s","15 km/s"], ans:"11.2 km/s"},
  {q:"Two resistors of 4Ω and 6Ω are in series. The total resistance is?", opts:["2Ω","10Ω","24Ω","1.5Ω"], ans:"10Ω"},
  {q:"Work done on an object is equal to?", opts:["Change in momentum","Change in kinetic energy","Change in acceleration","Change in displacement"], ans:"Change in kinetic energy"},
  {q:"In a transformer, the voltage is doubled. The current in the secondary coil will?", opts:["Double","Halve","Remain same","Be zero"], ans:"Halve"},
  {q:"The half-life of a radioactive substance is 10 days. After 30 days, fraction remaining is?", opts:["1/2","1/4","1/8","1/16"], ans:"1/8"},
  {q:"In Young’s double slit experiment, the fringe width is proportional to?", opts:["Slit separation","Wavelength","Screen distance","Both wavelength and screen distance"], ans:"Both wavelength and screen distance"},
  {q:"If momentum is constant, which quantity must remain constant?", opts:["Mass","Velocity","Kinetic energy","Acceleration"], ans:"Velocity"},
  {q:"The magnetic flux through a coil changes from 5 Wb to 0 Wb in 0.1 s. Induced EMF is?", opts:["5 V","50 V","0.5 V","500 V"], ans:"50 V"},
  {q:"A projectile has maximum range when the angle of projection is?", opts:["30°","45°","60°","90°"], ans:"45°"}
];


const questionsDiv = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const backBtn = document.getElementById("back");
const resultDiv = document.getElementById("result");

function getPoints() {
  return Number(localStorage.getItem("points")) || 0;
}

function savePoints(p) {
  localStorage.setItem("points", p);
}

function getMarks() {
  const marks = localStorage.getItem("marks");
  return marks ? JSON.parse(marks) : [];
}

function saveMarks(marks) {
  localStorage.setItem("marks", JSON.stringify(marks));
}

let currentQuestions = [];
let userAnswers = [];

function loadQuestions() {
  if(getPoints() < 5) {
    currentQuestions = easyQuestions;
  } else {
    currentQuestions = hardQuestions;
  }
}

function displayQuestions() {
  questionsDiv.innerHTML = "";
  userAnswers = [];

  currentQuestions.forEach((item, i) => {
    const qDiv = document.createElement("div");
    qDiv.className = "question";

    let html = `<p>${i+1}. ${item.q}</p>`;
    item.opts.forEach(opt => {
      html += `
        <label>
          <input type="radio" name="q${i}" value="${opt}">
          ${opt}
        </label>
      `;
    });

    qDiv.innerHTML = html;
    questionsDiv.appendChild(qDiv);
  });
}

function calculateScore() {
  let score = 0;
  let review = "<h2>Review:</h2><ol>";

  currentQuestions.forEach((item, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    const answer = selected ? selected.value : null;

    if(answer === item.ans) {
      score++;
    } else {
      review += `<li>${item.q}<br> Your answer: <span class="wrong">${answer || "None"}</span><br> Correct: ${item.ans}</li>`;
    }
  });

  review += "</ol>";
  return {score, review};
}

function showResult() {
  const {score, review} = calculateScore();

  resultDiv.innerHTML = `<p>Your score: ${score} / ${currentQuestions.length}</p>${review}`;
  resultDiv.classList.remove("hidden");

  // Disable submit button
  submitBtn.disabled = true;

  // Disable all radios
  document.querySelectorAll("input[type=radio]").forEach(r => r.disabled = true);

  // Update points
  let points = getPoints();
  points += score;
  savePoints(points);

  // Save marks history
  let marks = getMarks();
  marks.push({date: new Date().toLocaleString(), score: score});
  saveMarks(marks);

  backBtn.classList.remove("hidden");
}

submitBtn.addEventListener("click", () => {
  showResult();
});

backBtn.addEventListener("click", () => {
  window.location.href = "../../../dashboard/dashboard.html";  // back to homepage(profile)
});

loadQuestions();
displayQuestions();
