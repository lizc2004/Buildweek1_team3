const welcome = document.getElementById("welcome");
const benchmark = document.getElementById("benchmark");
const results = document.getElementById("results");
const feedback = document.getElementById("feedback");

const nascondiPagine = () => {
  benchmark.style.display = "none";
  results.style.display = "none";
  feedback.style.display = "none";
};

nascondiPagine();

const welcomeNextP = () => {
  welcome.style.display = "none";
  benchmark.style.display = "flex";
};

const next = document.getElementById("buttonWelcomeFeedbackPR");

next.addEventListener("click", welcomeNextP);
