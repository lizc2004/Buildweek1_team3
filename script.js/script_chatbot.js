const CHATBOT_API_URL = "http://127.0.0.1:8000/api/chat";
const CHATBOT_PASS_THRESHOLD = 60;

const chatbotSection = document.getElementById("chatbot-support");
const chatbotMessages = document.getElementById("chatbot-messages");
const chatbotForm = document.getElementById("chatbot-form");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotStatus = document.getElementById("chatbot-status");

let isFirstChatMessage = true;

const buildBenchmarkContext = () => {
  if (typeof examAnswersDetails === "undefined") {
    return [];
  }

  return examAnswersDetails
    .filter((item) => !item.isCorrect)
    .map((item) => ({
      questionNumber: item.questionIndex + 1,
      question: item.question,
      selectedAnswer: item.selectedAnswer,
      correctAnswer: item.correctAnswer,
    }));
};

const addChatMessage = (text, role) => {
  if (!chatbotMessages) {
    return;
  }

  const message = document.createElement("div");
  message.classList.add("chatbot-message", `chatbot-message-${role}`);
  message.textContent = text;
  chatbotMessages.appendChild(message);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
};

const setChatbotVisibility = (showChatbot) => {
  if (!chatbotSection) {
    return;
  }

  chatbotSection.classList.toggle("display-none", !showChatbot);
};

const showChatbotForFailedExam = (dati) => {
  const hasPassed = Number(dati.percentualeC) >= CHATBOT_PASS_THRESHOLD;
  setChatbotVisibility(!hasPassed);

  if (hasPassed || !chatbotMessages) {
    return;
  }

  chatbotMessages.innerHTML = "";
  chatbotStatus.textContent =
    "Hai bisogno di una mano? Scrivi una domanda e il tutor AI ti aiutera a ripassare.";
  addChatMessage(
    "Ciao! Possiamo rivedere insieme gli argomenti del benchmark e capire come migliorare.",
    "assistant"
  );
  isFirstChatMessage = true;
};

const sendChatMessage = async (event) => {
  event.preventDefault();

  const message = chatbotInput.value.trim();
  if (!message) {
    return;
  }

  addChatMessage(message, "user");
  chatbotInput.value = "";
  chatbotInput.disabled = true;
  chatbotStatus.textContent = "Il tutor AI sta rispondendo...";

  try {
    const response = await fetch(CHATBOT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        reset: isFirstChatMessage,
        benchmarkContext: buildBenchmarkContext(),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Errore nella risposta del server");
    }

    addChatMessage(data.reply, "assistant");
    chatbotStatus.textContent = "Puoi fare un'altra domanda quando vuoi.";
    isFirstChatMessage = false;
  } catch (error) {
    addChatMessage(
      "Non riesco a contattare il chatbot Python. Avvia il server con 'python chatbot/chatbot.py' e riprova.",
      "assistant"
    );
    chatbotStatus.textContent = "Server non raggiungibile.";
  } finally {
    chatbotInput.disabled = false;
    chatbotInput.focus();
  }
};

if (chatbotForm) {
  chatbotForm.addEventListener("submit", sendChatMessage);
}
