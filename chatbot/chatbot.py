import json
import os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

try:
    from anthropic import Anthropic
except ImportError:
    Anthropic = None

SYSTEM_PROMPT = (
    "You are a helpful assistant for students who did not pass a benchmark. "
    "Explain mistakes clearly, suggest what to study next, and keep the tone encouraging."
)
MODEL_CANDIDATES = [
    model.strip()
    for model in os.getenv(
        "ANTHROPIC_MODELS",
        "claude-3-7-sonnet-latest,claude-3-5-haiku-latest,claude-sonnet-4-20250514",
    ).split(",")
    if model.strip()
]
DEFAULT_HOST = "127.0.0.1"
DEFAULT_PORT = 8000

client = Anthropic() if Anthropic is not None else None
conversation_history = []
benchmark_context = []


def build_context_message():
    if not benchmark_context:
        return ""

    lines = [
        "Qui sotto trovi le domande che l'utente ha sbagliato nel benchmark.",
        "Usale per spiegare l'errore, confrontare la risposta data con quella corretta, e suggerire come ripassare.",
        "",
    ]

    for item in benchmark_context:
        lines.extend(
            [
                f"Domanda {item.get('questionNumber', '?')}: {item.get('question', '')}",
                f"Risposta data: {item.get('selectedAnswer', '')}",
                f"Risposta corretta: {item.get('correctAnswer', '')}",
                "",
            ]
        )

    return "\n".join(lines).strip()


def build_fallback_response(user_message):
    return (
        "Posso aiutarti a ripassare, ma al momento il server Python non riesce a "
        "contattare il modello AI. Controlla che la variabile d'ambiente "
        "ANTHROPIC_API_KEY sia configurata correttamente, poi riprova.\n\n"
        f"Intanto, in base al tuo messaggio ('{user_message}'), ti consiglio di "
        "ripartire dagli argomenti in cui hai avuto piu difficolta e rifare il test."
    )


def chat(user_message):
    """Send a message and get a response from the chatbot."""
    if not conversation_history:
        context_message = build_context_message()
        if context_message:
            conversation_history.append({"role": "user", "content": context_message})

    conversation_history.append({"role": "user", "content": user_message})

    try:
        if client is None:
            raise RuntimeError("Anthropic SDK non installato")

        last_error = None
        assistant_message = None

        for model_name in MODEL_CANDIDATES:
            try:
                response = client.messages.create(
                    model=model_name,
                    max_tokens=1024,
                    system=SYSTEM_PROMPT,
                    messages=conversation_history,
                )
                print(f"Modello Anthropic in uso: {model_name}")
                assistant_message = response.content[0].text
                break
            except Exception as error:
                last_error = error
                print(f"Errore chatbot Anthropic con modello {model_name}: {error}")

        if assistant_message is None:
            raise last_error or RuntimeError("Nessun modello Anthropic disponibile")
    except Exception as error:
        print(f"Errore chatbot Anthropic finale: {error}")
        assistant_message = build_fallback_response(user_message)

    conversation_history.append({"role": "assistant", "content": assistant_message})
    return assistant_message


def reset_conversation():
    conversation_history.clear()


def set_benchmark_context(context_items):
    benchmark_context.clear()
    if isinstance(context_items, list):
        benchmark_context.extend(context_items)


class ChatbotHandler(BaseHTTPRequestHandler):
    def _send_json(self, status_code, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self._send_json(204, {})

    def do_GET(self):
        if self.path == "/health":
            self._send_json(200, {"status": "ok"})
            return

        self._send_json(404, {"error": "Endpoint non trovato"})

    def do_POST(self):
        if self.path == "/api/chat":
            content_length = int(self.headers.get("Content-Length", "0"))
            raw_body = self.rfile.read(content_length)

            try:
                payload = json.loads(raw_body.decode("utf-8") or "{}")
            except json.JSONDecodeError:
                self._send_json(400, {"error": "JSON non valido"})
                return

            message = (payload.get("message") or "").strip()
            reset_requested = bool(payload.get("reset"))
            context_items = payload.get("benchmarkContext") or []

            if reset_requested:
                reset_conversation()
                set_benchmark_context(context_items)

            if not message:
                self._send_json(400, {"error": "Il messaggio non puo essere vuoto"})
                return

            assistant_message = chat(message)
            self._send_json(200, {"reply": assistant_message})
            return

        self._send_json(404, {"error": "Endpoint non trovato"})


def run_server(host=DEFAULT_HOST, port=DEFAULT_PORT):
    server = ThreadingHTTPServer((host, port), ChatbotHandler)
    print(f"Chatbot server attivo su http://{host}:{port}")
    server.serve_forever()


def main():
    """Main chatbot loop."""
    print("Benchmark Chatbot - Type 'quit' to exit")
    print("-" * 40)

    while True:
        user_input = input("You: ").strip()
        if user_input.lower() == "quit":
            break
        if not user_input:
            continue

        response = chat(user_input)
        print(f"Bot: {response}\n")


if __name__ == "__main__":
    mode = os.getenv("CHATBOT_MODE", "server").lower()
    if mode == "cli":
        main()
    else:
        run_server()
