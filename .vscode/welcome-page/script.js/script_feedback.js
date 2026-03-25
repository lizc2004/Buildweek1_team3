let stelleSelezionate = 0;

const selezionaStella = function (numero) {
  stelleSelezionate = numero;
  const stelle = document.querySelectorAll(".stella");

  stelle.forEach((stella, index) => {
    if (index < numero) {
      stella.classList.add("attiva");
    } else {
      stella.classList.remove("attiva");
    }
  });
};

const stelle = document.querySelectorAll(".stella");
stelle.forEach((stella) => {
  stella.addEventListener("click", () => {
    const voto = Number(stella.dataset.voto);
    selezionaStella(voto);
  });
});

document.getElementById("btn-feedback").addEventListener("click", () => {
  const testo = document.getElementById("input-feedback").value;
  console.log("Voto:", stelleSelezionate);
  console.log("Commento:", testo);
});

document.getElementById("btn-info").addEventListener("click", () => {
  window.location.href = "./results.html";
});
