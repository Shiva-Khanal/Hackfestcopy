const easyQuestions = [ 
  {q:"Simplify: 2 + 3 × 4", opts:["14","20","24","10"], ans:"14"},
  {q:"Square of 12?", opts:["124","122","144","154"], ans:"144"},
  {q:"Cube of 3?", opts:["6","9","27","18"], ans:"27"},
  {q:"Value of 5² + 4²?", opts:["25","41","45","29"], ans:"41"},
  {q:"√81 = ?", opts:["8","9","7","6"], ans:"9"},
  {q:"LCM of 4 and 6?", opts:["10","12","8","14"], ans:"12"},
  {q:"HCF of 18 and 24?", opts:["6","8","12","4"], ans:"6"},
  {q:"Simplify: 15 ÷ (5 × 3)", opts:["1","3","5","15"], ans:"1"},
  {q:"Value of 2³?", opts:["6","8","4","9"], ans:"8"},
  {q:"Perimeter of square with side 5 cm?", opts:["20 cm","25 cm","15 cm","10 cm"], ans:"20 cm"}
];

const hardQuestions = [
  {q:"Derivative of sin(x)?", opts:["cos(x)","-cos(x)","sin(x)","-sin(x)"], ans:"cos(x)"},
  {q:"Integral of x dx?", opts:["x²/2 + C","x + C","ln|x| + C","e^x + C"], ans:"x²/2 + C"},
  {q:"Solve: 3x - 5 = 10", opts:["3","4","5","6"], ans:"5"},
  {q:"If f(x) = x², f'(3) = ?", opts:["3","6","9","12"], ans:"6"},
  {q:"Value of log₁₀(1000)?", opts:["1","2","3","10"], ans:"3"},
  {q:"Simplify: (x²)³", opts:["x⁵","x⁶","x⁸","x⁹"], ans:"x⁶"},
  {q:"Area of circle with radius 7?", opts:["154","44","77","100"], ans:"154"},
  {q:"Limit of sin(x)/x as x → 0?", opts:["0","1","∞","Does not exist"], ans:"1"},
  {q:"If a² - b² = 0, then a = ?", opts:["b","-b","±b","0"], ans:"±b"},
  {q:"Sum of first 10 natural numbers?", opts:["45","50","55","60"], ans:"55"}
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
  window.location.href = "dashboard.html";  // back to homepage(profile)
});

loadQuestions();
displayQuestions();
