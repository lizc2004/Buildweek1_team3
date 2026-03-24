let seconds= 60
let circle = 565                                 //Lunghezza circle che dovrà animarsi//
let display= document.getElementById('display')

const ring = ()=>{
    let animationCircle = circle - (seconds*circle/60)
    document.getElementById('second-circle').style.strokeDashoffset= animationCircle
}



const resetTimer = ()=>{                        //Cliccando il button con questa funzione il timer torna a 60
    seconds= 60
    display.innerText= 60
    ring()
}

const databaseQuestions = [
    {
        question: "Qual è l'oceano più vasto della Terra?",
        answers: ["Oceano Atlantico", "Oceano Indiano", "Oceano Pacifico", "Oceano Artico"],
        corretta: "Oceano Pacifico"
    },
    {
        question: "In quale città si trova la sede del Parlamento Europeo?",
        answers: ["Bruxelles", "Strasburgo", "Lussemburgo", "Ginevra"],
        corretta: "Strasburgo",
    },
    {
        question: "Chi ha scritto il romanzo '1984'?",
        answers: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "Ernest Hemingway"],
        corretta: "George Orwell"
    },
    {
        question: "Quale scienziato ha formulato la teoria della relatività?",
        answers: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Galileo Galilei"],
        corretta: "Albert Einstein"
    },
    {
        question: "In che anno è iniziata la Prima Guerra Mondiale?",
        answers: ["1912", "1914", "1918", "1939"],
        corretta: "1914"
    },
    {
        question: "Qual è il fiume più lungo del mondo?",
        answers: ["Rio delle Amazzoni", "Nilo", "Mississippi", "Fiume Azzurro"],
        corretta: "Nilo"
    },
]



const QuestionElement = document.querySelector('#question h1')
const answersContainer = document.getElementById('answers')
const indice = document.getElementById('indice')
const nextBtn = document.getElementById('nextBtn')

let currentQuestionIndex= 0

const showQuestion= ()=>{
    answersContainer.innerHTML= ""                                         //azzera le answers
    nextBtn.style.display = "none"                                          //toglie il bottone avanti per ogni Question nuova
    let currentQuestion= databaseQuestions[currentQuestionIndex]              //Pesca le Questions dall'array
    QuestionElement.innerHTML = currentQuestion.question                      
    let nQuestion= currentQuestionIndex +1                                  
    indice.innerHTML= nQuestion
                          
        currentQuestion.answers.forEach(testoanswers => {
        const button = document.createElement('button')
        button.innerHTML = testoanswers
        button.classList.add('btn')
        button.addEventListener('click', ()=>{
            nextBtn.style.display = 'block'
            const answers = answersContainer.querySelectorAll('.btn')
            answers.forEach(btn=> btn.classList.remove('selected'))
            button.classList.add('selected')
        })
        answersContainer.appendChild(button)
    });
}

const startQuiz = () => {
    currentQuestionIndex = 0;
    showQuestion();
}

nextBtn.addEventListener('click', ()=>{
             currentQuestionIndex++
         if (currentQuestionIndex < databaseQuestions.length){
             showQuestion()
             resetTimer()
         } else {                                                        //Con questo else verranno mostrati i risultati
             questionElement.innerHTML = "Quiz Terminato!"        
             answersContainer.innerHTML = ""
}
})


startQuiz()


const timer = ()=> {
    const countdown = setInterval(function(){                     //Esegue un blocco di codice ogni secondo
            if(seconds > 0){
                seconds--
                display.innerText= seconds
                ring()
            } else {
            clearInterval(countdown)
            currentQuestionIndex++
            showQuestion()
            resetTimer()
            timer()
            }
    }, 1000)                                                    //Set interval funziona con i milliseconds, da specificare quindi che l'azione va compita ogni secondo
}

timer()