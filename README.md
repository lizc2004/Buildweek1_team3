# Git Workflow — Build Week Epicode

Benvenuti nel progetto! Seguite queste istruzioni per lavorare senza conflitti e senza stress.

---

## Regole d'oro

1. **Nessuno lavora direttamente su `main`** — mai, per nessun motivo
2. **Ogni feature ha il suo branch** — non un branch per persona, ma per sezione del progetto
3. **Prima di iniziare a lavorare**, sincronizzate sempre il vostro branch con `develop`
4. **Commit piccoli e frequenti** — meglio tanti piccoli che uno enorme a fine giornata
5. **Messaggi di commit chiari** — il team deve capire cosa hai fatto

---

## Struttura dei branch

```
main       → versione stabile e funzionante (solo merge finali)
develop    → branch di integrazione (tutti i lavori confluiscono qui)
feature/   → branch per ogni sezione (es. feature/navbar, feature/hero)
```

---

## Workflow passo dopo passo

### 1. Clona la repo (solo la prima volta)

**Terminale**
```bash
git clone <URL_DELLA_REPO>
cd Buildweek1_team3
```

**GitHub Desktop**
`File → Clone Repository → incolla l'URL → Clone`

---

### 2. Spostati sul tuo branch (solo la prima volta)

I branch sono già stati creati dal team leader. Spostati semplicemente sul tuo:

**Terminale**
```bash
git checkout feature/welcome_emanuela
```
**GitHub Desktop**
`Menu a tendina in alto → seleziona il tuo branch`

> Ogni membro ha il suo branch assegnato. Consulta la tabella in fondo a questo README.

---

### 3. Lavora e salva il tuo lavoro (commit)

Scrivi il tuo codice, poi salva con un commit:

**Terminale**
```bash
git add .
git commit -m "feat: descrizione breve di cosa hai fatto"
```

**GitHub Desktop**
`Pannello Changes → scrivi il messaggio in basso a sinistra → Commit to feature/...`

> Esempi di messaggi buoni:
> - `feat: aggiunta welcome page`
> - `fix: corretto timer sulla question page`
> - `style: aggiornati colori globali`
>
> Esempi di messaggi da evitare:
> - `modifiche`
> - `roba`
> - `aaaaa`

Fai commit spesso — meglio tanti piccoli che uno enorme a fine giornata.

---

### 4. Prima di pushare — scarica develop e mergalo nel tuo branch

Questo è il passaggio piu importante. Prima di inviare il tuo lavoro su GitHub, devi scaricare le ultime modifiche di `develop` e integrarle nel tuo branch. In questo modo sei tu a risolvere eventuali conflitti in locale, senza aspettare il team leader.

**Terminale**
```bash
git checkout develop
git pull origin develop
git checkout feature/il-tuo-branch
git merge develop
```

**GitHub Desktop**
`Cambia su develop → Repository → Pull → Torna al tuo branch → Branch → Merge into current branch → develop`

Se appaiono conflitti, significa che qualcun altro ha modificato lo stesso file che hai toccato anche tu. Apri il file nell'editor, cerca i blocchi `<<<<<<<` e scegli quale versione tenere, poi:

**Terminale**
```bash
git add .
git commit -m "fix: risolto conflitto su nome-file"
```

**GitHub Desktop**
`Marca il file come risolto → completa il merge`

> Se non sei sicuro di come risolvere un conflitto, chiedi al team leader prima di procedere.

---
---

### 5. Pusha il tuo branch su GitHub

Solo dopo aver fatto il merge con develop puoi pushare:

**Terminale**
```bash
git push origin feature/il-tuo-branch
```

**GitHub Desktop**
`Pulsante "Push origin"`

---

### 6. Apri una Pull Request (quando la tua sezione è pronta)

1. Vai su **GitHub.com** nella repo del progetto
2. Clicca su **"Compare & pull request"** (appare in automatico dopo il push)
3. Verifica che sia impostato: **base → `develop`**, **compare → il tuo branch**
4. Scrivi una descrizione di cosa hai fatto
5. Aggiungi il **team leader come reviewer**
6. Clicca **"Create pull request"**

> Il merge lo fa **solo il team leader** dopo aver revisionato il codice.

---

### 7. Merge finale su main (solo team leader, a fine progetto)

Quando tutto funziona correttamente su `develop` e il progetto è completo, il team leader apre un'ultima Pull Request da `develop` verso `main`. Questo rappresenta la consegna finale.

```
feature/xxx  →  develop  →  (solo a fine progetto)  →  main
```

> Nessun membro del team apre PR verso `main`. Solo il team leader, una volta sola, alla fine.

---

## Situazioni comuni e come risolverle

### "Ho lavorato su `main` o `develop` per sbaglio!"

**Terminale**
```bash
git stash
git checkout feature/il-tuo-branch
git stash pop
```

**GitHub Desktop**
`Branch → seleziona il tuo branch → Branch → Merge into current branch → seleziona develop`

---

## Divisione del lavoro

| Branch | Pagina | Responsabile |
|--------|---------|--------------|
| `feature/welcome_emanuela` | Welcome page | @itsemanuela |
| `feature/questions_vincenzo` | Questions page | @VincenzoManfredi99 |
| `feature/results_alessandro` | Results page | @alessandro.nappa |
| `feature/feedback_noemi` | Feedback page | @lizc2004 |
| `feature/style_davide` | CSS globale e variabili | @Vidied |

---

## Contatti

Se ti blocchi o non sei sicuro di qualcosa: **chiedi al team leader prima di fare qualsiasi merge**. Meglio chiedere che dover fare un revert!
