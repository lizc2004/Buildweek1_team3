const timeQuestion = 30;
let seconds = timeQuestion;
let circle = 565; //Lunghezza circle che dovrà animarsi//
let display = document.getElementById("display");

const ring = () => {
  let animationCircle = circle - (seconds * circle) / 30;
  document.getElementById("second-circle").style.strokeDashoffset =
    animationCircle;
};

const examResults = [];

const resetTimer = () => {
  // il timer torna a 30
  seconds = 30;
  display.innerText = 30;
  ring();
};

const questionElement = document.querySelector("#question h1");
const answersContainer = document.getElementById("answers");
const indice = document.getElementById("indice");
const nextBtn = document.getElementById("nextBtn");

let currentQuestionIndex = 0;

const showQuestion= ()=>{
    answersContainer.innerHTML= ""                                         //azzera le answers
    nextBtn.style.display = "none"                                         //toglie il bottone avanti per ogni Question nuova
    let currentQuestion= databaseQuestions[currentQuestionIndex]           //Pesca le Questions dall'array

  questionElement.innerHTML = currentQuestion.question;
  let nQuestion = currentQuestionIndex + 1;
  indice.innerHTML = nQuestion;

  currentQuestion.answers.forEach((answerP) => {
    const button = document.createElement("button");
    button.innerHTML = answerP.text;
    button.classList.add("btn");
    button.classList.add("answers");
    button.dataset.isCorrect = answerP.correct; //Salva il booleano nel bottone
    button.addEventListener("click", () => {
      nextBtn.style.display = "block";
      const answers = answersContainer.querySelectorAll(".btn");
      answers.forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");
    });
    answersContainer.appendChild(button);
  });
};

const startQuiz = () => {
    currentQuestionIndex = 0
    showQuestion()
    resetTimer()
}

// Timer che lampeggia

let blink

const startBlink = () => {
  clearInterval(blink)
  display.classList.remove("blink")
  blink = setInterval(function () {
    if (seconds <= 0) {
      display.classList.remove("blink")
      clearInterval(blink)
      return
    } 
    if(seconds <= timeQuestion/2){
      display.classList.toggle("blink") 
    } else {
      display.classList.remove('blink')
    }
  }, 500); //Velocità blink
};

startBlink()

const welcomePage = document.getElementById('welcome')
const benchmarkPage = document.getElementById('benchmark')
const resultPage = document.getElementById('results')
const feedbackPage = document.getElementById('feedback')
const btnProceed= document.getElementsByClassName('buttonLightBlue')[0]
const checkbox = document.getElementById('control')

btnProceed.addEventListener('click',()=>{
    if(checkbox.checked){
    welcomePage.classList.add('display-none')
    benchmarkPage.classList.remove('display-none')
    startQuiz()
    timer()
    }
})

//Gestisce il tasto avanti tra una domanda e l'altra

nextBtn.addEventListener('click', ()=>{
  stopTimer()
    const selectedButton= answersContainer.querySelector('.btn.selected')
    if(selectedButton){
        const result = selectedButton.dataset.isCorrect === 'true'
        examResults.push(result)
    }
             currentQuestionIndex++
         if (currentQuestionIndex < databaseQuestions.length){
             showQuestion()
             resetTimer()
             startBlink()
             timer()
         } else {                                              //Con questo else verranno mostrati i risultati
            mostraPaginaRisultati()
            benchmarkPage.classList.add('display-none')
            resultPage.classList.remove('display-none')
}
})

//Gestisce e fa partire il Timer

let countdown

const stopTimer= ()=>{
  clearInterval(countdown)
  clearInterval(blink)
}

const timer = () => {
  stopTimer()
  startBlink()
  countdown = setInterval(function () {
    if (seconds > 0) {
      seconds--;
      display.innerText = seconds;
      ring();
    } else {
      stopTimer()
      examResults.push(false);
      currentQuestionIndex++;
      if(currentQuestionIndex < databaseQuestions.length) {
        showQuestion()
        resetTimer()
        startBlink()
        timer()
      } else {
        benchmarkPage.classList.add('display-none')
        resultPage.classList.remove('display-none')
        mostraPaginaRisultati()
      }
    }
  }, 1000); //Set interval funziona con i milliseconds, da specificare quindi che l'azione va compiuta ogni secondo
};

