let seconds= 60
let circle = 565                                 //Lunghezza circle che dovrà animarsi//
let display= document.getElementById('display')

const ring = ()=>{
    let animationCircle = circle - (seconds*circle/60)
    document.getElementById('second-circle').style.strokeDashoffset= animationCircle
}

const examResults= []

const resetTimer = ()=>{                        //Cliccando il button con questa funzione il timer torna a 60
    seconds= 60
    display.innerText= 60
    ring()
}

const questionElement = document.querySelector('#question h1')
const answersContainer = document.getElementById('answers')
const indice = document.getElementById('indice')
const nextBtn = document.getElementById('nextBtn')

let currentQuestionIndex= 0

const showQuestion= ()=>{
    answersContainer.innerHTML= ""                                         //azzera le answers
    nextBtn.style.display = "none"                                         //toglie il bottone avanti per ogni Question nuova
    let currentQuestion= databaseQuestions[currentQuestionIndex]           //Pesca le Questions dall'array

    questionElement.innerHTML = currentQuestion.question                      
    let nQuestion= currentQuestionIndex +1                                  
    indice.innerHTML= nQuestion
                          
        currentQuestion.answers.forEach(answerP => {
        const button = document.createElement('button')
        button.innerHTML = answerP.text
        button.classList.add('btn')
        button.dataset.isCorrect = answerP.correct                          //Salva il booleano nel bottone
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
    const selectedButton= answersContainer.querySelector('.btn.selected')
    if(selectedButton){
        const result = selectedButton.dataset.isCorrect === 'true'
        examResults.push(result)
    }
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
            examResults.push(false)
            currentQuestionIndex++
            showQuestion()
            resetTimer()
            timer()
            }
    }, 1000)                                                    //Set interval funziona con i milliseconds, da specificare quindi che l'azione va compita ogni secondo
}

timer()

console.log(examResults)