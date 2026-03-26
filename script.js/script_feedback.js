document.addEventListener("DOMContentLoaded", () => {
  let stelleSelezionate = 0;

  const stelle = document.querySelectorAll(".stella");
  const bottoneFeedback = document.getElementById("btn-feedback");
  const bottoneInfo = document.getElementById("btn-info");
  const inputFeedback = document.getElementById("input-feedback");

  const selezionaStella = function (numero) {
    stelleSelezionate = numero;

    stelle.forEach((stella, index) => {
      if (index < numero) {
        stella.classList.add("attiva");
      } else {
        stella.classList.remove("attiva");
      }
    });
  };

  stelle.forEach((stella) => {
    stella.addEventListener("click", () => {
      const voto = Number(stella.dataset.voto);
      selezionaStella(voto);
    });
  });

  inputFeedback.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const testo = inputFeedback.value;
      console.log("Voto selezionato:", stelleSelezionate);
      console.log("Commento inserito:", testo);

      inputFeedback.value = "";
    }
  });

  bottoneInfo.addEventListener("click", () => {
    console.log("Hai cliccato su MORE INFO");
  });
});
