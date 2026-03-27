function calcoloRisultati() {
    const totaleDomande = examResults.length //array contentente le risposte
    const risposteCorrette = examResults.filter(risposta => risposta === true).length
    const risposteSbagliate = totaleDomande - risposteCorrette
    const percentualeCorrette = ((risposteCorrette / totaleDomande) * 100).toFixed(1)
    const percentualeSbagliate = (100 - percentualeCorrette).toFixed(1)

    return {
        totale: totaleDomande,
        corrette: risposteCorrette,
        sbagliate: risposteSbagliate,
        percentualeC: percentualeCorrette,
        percentualeS: percentualeSbagliate
    }
}

// funzione 2: modificare i testi html nella pagina results

function aggiornaTestiHtml(dati) {
  document.getElementById("percentuale-corrette").innerText =
    dati.percentualeC + "%";
  document.getElementById("testo-corrette").innerText =
    dati.corrette + "/" + dati.totale + " questions";
  document.getElementById("percentuale-sbagliate").innerText =
    dati.percentualeS + "%";
  document.getElementById("testo-sbagliate").innerText =
    dati.sbagliate + "/" + dati.totale + " questions";

  console.log("Testi aggiornati correttamente nell'interfaccia.");
}

// funzione 3: aggiornare il grafico a torta

function aggiornaGrafico(dati) {
  const grafico = document.getElementById("donut-chart");
  const gradiente = `conic-gradient(
        #c2128d ${dati.percentualeS}%, 
        #5dffff ${dati.percentualeS}% 100%
    )`;
  grafico.style.background = gradiente;
  console.log("Grafico aggiornato con gradiente:", gradiente);
}

//funzione prova lancio coriandoli
function lanciaCoriandoli() {
  for (let i = 0; i < 120; i++) {
    const confetto = document.createElement("div");
    confetto.classList.add("confetto");

    confetto.style.left = Math.random() * 100 + "vw";
    confetto.style.animationDelay = Math.random() * 2 + "s";
    confetto.style.backgroundColor = ["#00ffff", "#c2128d", "#ffffff", "#ffd700"][
      Math.floor(Math.random() * 4)
    ];

    document.body.appendChild(confetto);

    setTimeout(() => {
      confetto.remove();
    }, 4000);
  }
}

// funzione 4: messaggio centrale

function mostraMessaggioCentrale(dati) {
  // seleziona il contenitore centrale del messaggio
  const contenitore = document.getElementById("messaggio-risultato");

  // se la percentuale delle risposte corrette e almeno 60
  if (dati.percentualeC >= 60) {
    // mostra il messaggio di promozione
    contenitore.innerHTML = `
      <p class="testo-bold">Congratulazioni</p>
      <p class="testo-cyan">Hai superato l'esame</p>
      <p class="testo-small">
        Ti invieremo il certificato tra pochi minuti. 
        Controlla la tua email
      </p>
    `;

    // lancia i coriandoli solo in caso di esame superato
    lanciaCoriandoli();
  } else {
    // altrimenti mostra il messaggio di bocciatura
    contenitore.innerHTML = `
      <p class="testo-bold">Oops!</p>
      <p class="testo-magenta">Non hai superato l'esame</p>
      <p class="testo-small">
        Non preoccuparti! Puoi riprovare per migliorare il tuo 
        punteggio e ottenere il tuo certificato
      </p>
    `;
  }
}
// funzione 5: aggiorna la pagina dei risultati

function mostraPaginaRisultati() {
    const datiFinali = calcoloRisultati()
    aggiornaTestiHtml(datiFinali)
    aggiornaGrafico(datiFinali)
    mostraMessaggioCentrale(datiFinali)

    console.log("Pagina risultati generata con successo!", datiFinali)
}

const rate= document.getElementById('rate')

rate.addEventListener('click',()=>{
  feedbackPage.classList.remove('display-none')
  resultPage.classList.add('display-none')
})
