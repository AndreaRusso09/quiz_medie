// Dati del quiz con le domande richieste
const quizData = [
    {
        question: "DOMANDA 1/3 (ITIS GRASSI) - Qual è uno dei pilastri fondamentali dell'offerta formativa dell'ITIS Carlo Grassi di Torino?",
        options: [
            { text: "Enogastronomia e Arte Culinaria", isCorrect: false, key: 'A' },
            { text: "Informatica, Elettronica e Meccatronica", isCorrect: true, key: 'B' },
            { text: "Studi Classici e Lingue Antiche", isCorrect: false, key: 'C' }
        ],
        type: "[GRASSI/IDENTIFY]"
    },
    {
        question: "DOMANDA 2/3 (IA) - Come si chiama il campo dell'IA che permette ai computer di 'leggere' e interpretare il linguaggio umano (testi, chat)?",
        options: [
            { text: "Computer Vision", isCorrect: false, key: 'A' },
            { text: "Elaborazione del Linguaggio Naturale (NLP)", isCorrect: true, key: 'B' },
            { text: "Robotica Industriale", isCorrect: false, key: 'C' }
        ],
        type: "[IA/DECRYPT]"
    },
    {
        question: "DOMANDA 3/3 (IA) - Quale termine definisce la capacità di un'IA di migliorare le sue prestazioni imparando dai dati senza essere programmata esplicitamente?",
        options: [
            { text: "Spegnimento e Riavvio", isCorrect: false, key: 'A' },
            { text: "Machine Learning (Apprendimento Automatico)", isCorrect: true, key: 'B' },
            { text: "Programmazione Manuale", isCorrect: false, key: 'C' }
        ],
        type: "[IA/ALGORITHM]"
    }
];

let currentQuestionIndex = 0;
let score = 0;
const totalXP = quizData.length * 10; 

// Dichiarazione delle variabili DOM a livello globale (Saranno inizializzate in avvio)
let modal, questionNumEl, questionTextEl, optionsEl, feedbackEl, scoreDisplayEl, startButton, mainTitle;


// 1. Funzione di inizializzazione che viene chiamata DOPO il caricamento del DOM
document.addEventListener('DOMContentLoaded', () => {
    // Inizializza tutte le variabili DOM in modo sicuro
    modal = document.getElementById('quiz-modal');
    questionNumEl = document.getElementById('modal-question-number');
    questionTextEl = document.getElementById('modal-question-text');
    optionsEl = document.getElementById('modal-options');
    feedbackEl = document.getElementById('feedback-area');
    scoreDisplayEl = document.getElementById('score-display');
    startButton = document.getElementById('start-btn');
    mainTitle = document.getElementById('main-title');
});

// Funzione principale del quiz (chiamata dal pulsante HTML)
function iniziaQuiz() {
    // Controllo di sicurezza: se gli elementi non sono ancora pronti, avvisa
    if (!modal) {
        alert("Errore di caricamento: Riprova a ricaricare Codepen.");
        return;
    }

    alert("Benvenuto nell'interfaccia di test! Seleziona la risposta per procedere.");
    
    currentQuestionIndex = 0;
    score = 0;
    updateScoreDisplay(score);
    startButton.style.display = 'none'; 
    mainTitle.innerHTML = '[[ DECRYPTING DATA... ]]';
    
    loadQuestion(currentQuestionIndex);
}


// 2. Carica la Domanda nel Modale
function loadQuestion(index) {
    if (index >= quizData.length) {
        showFinalResults();
        return;
    }

    const q = quizData[index];
    
    // Reset elementi del modale
    feedbackEl.innerHTML = 'Seleziona una risposta...';
    feedbackEl.classList.remove('correct-feedback', 'incorrect-feedback');
    optionsEl.innerHTML = ''; 

    // Popola il modale
    questionNumEl.innerHTML = `${q.type} - TEST ${index + 1}/${quizData.length}`;
    questionTextEl.textContent = q.question;

    q.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = `${option.key}) ${option.text}`;
        
        // Aggiunge il listener per la risposta
        button.onclick = () => checkAnswer(option, q.options);
        
        optionsEl.appendChild(button);
    });

    modal.style.display = 'block'; // Mostra il modale
}


// 3. Verifica della Risposta
function checkAnswer(selectedOption, allOptions) {
    
    // 1. Disabilita e colora tutti i pulsanti
    allOptions.forEach((option, idx) => {
        const btn = optionsEl.children[idx];
        btn.disabled = true;
        
        if (option.isCorrect) {
            btn.style.backgroundColor = 'rgba(0, 255, 65, 0.2)';
            btn.style.borderColor = '#00ff41';
            btn.style.color = '#00ff41';
        } else if (selectedOption.key === option.key) {
            btn.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
            btn.style.borderColor = '#ff0000';
            btn.style.color = '#ff0000';
            btn.style.boxShadow = '0 0 15px #ff0000';
        }
    });

    // 2. Feedback
    if (selectedOption.isCorrect) {
        score += 10;
        feedbackEl.innerHTML = '🟢 DATA INJECTED: CORRETTO. +10 XP. Accesso al livello successivo.';
        feedbackEl.classList.add('correct-feedback');
    } else {
        feedbackEl.innerHTML = '🔴 DATA CORRUPTED: ERRORE. La risposta corretta era: ' + allOptions.find(o => o.isCorrect).key + ') ' + allOptions.find(o => o.isCorrect).text;
        feedbackEl.classList.add('incorrect-feedback');
    }

    updateScoreDisplay(score);

    // 3. Avvia la prossima domanda dopo un ritardo scenografico
    setTimeout(() => {
        modal.style.display = 'none';
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }, 3000); // 3 secondi per apprezzare il feedback
}


// 4. Aggiorna Punteggio a Schermo
function updateScoreDisplay(currentScore) {
    if (scoreDisplayEl) {
        scoreDisplayEl.textContent = `DATA_SCORE: ${currentScore} / ${totalXP}`;
        scoreDisplayEl.style.color = '#ffffff'; 
        setTimeout(() => {
            scoreDisplayEl.style.color = '#ff00ff'; 
        }, 100);
    }
}


// 5. Risultato Finale
function showFinalResults() {
    let finalMessage;
    
    if (score === totalXP) {
        finalMessage = `[[ FULL ACCESS: SAGGIO ]] Bravo/a! Sei pronto per il futuro.`;
    } else if (score >= 10) {
        finalMessage = `[[ PARTIAL ACCESS: NOVICE ]] Buon inizio! Ti aspettiamo al Grassi per l'upgrade completo.`;
    } else {
        finalMessage = `[[ ACCESS DENIED ]] Il tuo sistema richiede un reset. Iscriviti al Grassi per un riavvio di successo!`;
    }
    
    alert(`--- RAPPORTO FINALE ---\nPunti XP totali: ${score} / ${totalXP}\n${finalMessage}`);

    // Resetta l'interfaccia principale
    if (mainTitle) mainTitle.innerHTML = `[[ SYSTEM OFFLINE ]]`;
    if (startButton) {
        startButton.textContent = '[[ RIPROVA ]]';
        startButton.style.display = 'block';
    }
}
