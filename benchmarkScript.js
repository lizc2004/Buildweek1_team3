let secondi= 60
let cerchio = 565
let display= document.getElementById('display')

const anello = ()=>{
    let animazioneCerchio = cerchio - (secondi*cerchio/60)
    document.getElementById('secondo-cerchio').style.strokeDashoffset= animazioneCerchio
}

const timer = ()=> {
    setInterval(function(){
         if(secondi > 0){
            if(secondi > 0){
                secondi = secondi-1
                display.innerText= secondi
                anello()
            }
        }
    }, 1000)
}

timer()

const continua = ()=>{
    secondi= 60
    display.innerText= 60
    anello()
}

const databaseDomande = [
    {
        domanda: "Qual è l'oceano più vasto della Terra?",
        risposte: ["Oceano Atlantico", "Oceano Indiano", "Oceano Pacifico", "Oceano Artico"],
        corretta: "Oceano Pacifico"
    },
    {
        domanda: "In quale città si trova la sede del Parlamento Europeo?",
        risposte: ["Bruxelles", "Strasburgo", "Lussemburgo", "Ginevra"],
        corretta: "Strasburgo",
    },
    {
        domanda: "Chi ha scritto il romanzo '1984'?",
        risposte: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "Ernest Hemingway"],
        corretta: "George Orwell"
    },
    {
        domanda: "Quale scienziato ha formulato la teoria della relatività?",
        risposte: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Galileo Galilei"],
        corretta: "Albert Einstein"
    },
    {
        domanda: "In che anno è iniziata la Prima Guerra Mondiale?",
        risposte: ["1912", "1914", "1918", "1939"],
        corretta: "1914"
    },
    {
        domanda: "Qual è il fiume più lungo del mondo?",
        risposte: ["Rio delle Amazzoni", "Nilo", "Mississippi", "Fiume Azzurro"],
        corretta: "Nilo"
    },
]