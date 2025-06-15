const cardFront = document.querySelector('.card-front p');
const cardBack = document.querySelector('.card-back p');
const nextButton = document.querySelector('.next-button');
const switchButton = document.querySelector('.switch-course');
const numberButton = document.querySelector('.number-button');
const scoreButton = document.querySelector('.score-button');
const cardInner = document.querySelector('.card-inner');

let score = 0;
let count = 0;
let flashcards = [];
let answered = [];
let total = 0;
let start = 0;
let next_messages = [
    {message : "Next pls..."},
    {message : "Thank you, next"},
    {message : "Next"},
    {message : "She's on FIRE"},
    {message : "Go beautiful!"}
];
let courses = [
    {name: 'Web', file: 'flashcards_web.json'},
    {name: 'Antro', file: 'flashcards_antro.json'},
    {name: 'Retele', file: 'flashcards_retele.json'}
]

function fetchInput(inputfile) {
    fetch(inputfile)
        .then(response => response.json())
        .then(data => {
            flashcards = data;
            total = flashcards.length;
        })
        .catch(error => console.error('Error loading JSON:', error));
}

function getRandomFlashcard() {
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    return flashcards[randomIndex];
}

function checkEnd() {
    if (flashcards.length === 0 ) {
        cardFront.textContent = "Aceasta a fost ultima intrebare, iub.";
        cardBack.textContent = "Da refresh la pagina pentru a incepe din nou. ";
        setTimeout(() => {
        cardBack.style.visibility = 'visible';
        }, 300);
        return true;
    }
}

function setFlashcard(flashcard) {
    cardFront.innerHTML = '';
    cardBack.textContent = '';

    const questionEl = document.createElement('p');
    questionEl.textContent = flashcard.question;
    cardFront.appendChild(questionEl);
    cardFront.appendChild(document.createElement('br'))

    if (flashcard.options && Array.isArray(flashcard.options)) {
        const shuffledOptions = [...flashcard.options];
        for (let i = shuffledOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
        }
        shuffledOptions.forEach(opt => {
            const label = document.createElement('label');
            label.className = 'cheeky-checkbox-label'

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = opt;
            checkbox.className = 'cheeky-checkbox'

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(' ' + opt));

            cardFront.appendChild(label);
        });
    } else {
        cardBack.textContent = flashcard.answer;
    }

    window.currentFlashcard = flashcard;
}

function checkAnswer() {
    if (!currentFlashcard) return;
    if (answered.includes(window.currentFlashcard)) return;
    answered.push(window.currentFlashcard);
    const checkboxes = cardFront.querySelectorAll('input[type="checkbox"]');
    const selectedOptions = [];
    checkboxes.forEach(cb => {
        if (cb.checked) selectedOptions.push(cb.value);
    });

    let correct = false;
    if (Array.isArray(currentFlashcard.answer)) {
        const sortedSelected = selectedOptions.slice().sort();
        const sortedAnswer = currentFlashcard.answer.slice().sort();
        correct = sortedSelected.length === sortedAnswer.length &&
                  sortedSelected.every((val, idx) => val === sortedAnswer[idx]);
    } else {
        correct = selectedOptions.length === 1 && selectedOptions[0] === currentFlashcard.answer;
    }

    if (Array.isArray(currentFlashcard.answer)) {
        cardBack.textContent = currentFlashcard.answer.map(ans => `• ${ans}`).join('\n');
    } else {
        cardBack.textContent = currentFlashcard.answer;
    }

    if (correct && !currentFlashcard.answered) {
        score++;
        scoreButton.textContent = "✅ " + score;
        currentFlashcard.answered = true;
    }
}

function updateCard() {
    cardInner.classList.remove('flipped');
    cardBack.style.visibility = 'hidden';
    if (checkEnd()) {
        return;
    }
    if (count > 0)
        checkAnswer();
    const flashcard = getRandomFlashcard();
    numberButton.textContent = ((count ++) + 1) + '/' + total;
    setFlashcard(flashcard);
    flashcards = flashcards.filter(card => card !== flashcard);
    nextButton.textContent = 'Next';
    if (switchButton.textContent === 'Antro')
        nextButton.textContent = next_messages[Math.floor(Math.random() * next_messages.length)].message;
    setTimeout(() => {
        cardBack.style.visibility = 'visible';
    }, 300);
}

function updateWidth() {
    const card = document.querySelector('.card');
    if (!card) return;
    if (switchButton.textContent === 'Web') {
        card.style.width = '400px';
        card.style.height = '400px';
        document.querySelectorAll('.next-button, .switch-course, .number-button, .score-button').forEach(btn => {
        btn.style.width = '400px';
    });
    } 
    if (switchButton.textContent === 'Antro' || switchButton.textContent === 'Retele') {
        card.style.width = '300px';
        card.style.height = '300px';
        document.querySelectorAll('.next-button, .switch-course, .number-button, .score-button').forEach(btn => {
        btn.style.width = '300px';
    });
    }
}

function changeCourse() {
    count = 0;
    const currentIndex = courses.findIndex(course => course.name === switchButton.textContent);
    const nextIndex = (currentIndex + 1) % courses.length;
    switchButton.textContent = courses[nextIndex].name;
    fetchInput(courses[nextIndex].file);
    updateWidth();
}

cardInner.addEventListener('click', (e) => {
    const tag = e.target.tagName.toLowerCase();
    if (tag === 'input' || tag === 'label' || tag === 'button') {
        return;
    }
    cardInner.classList.toggle('flipped');
});

fetchInput('flashcards_web.json');
if (flashcards.length > 0)
    updateCard();

nextButton.addEventListener('click', updateCard);
switchButton.addEventListener('click', changeCourse);
scoreButton.addEventListener('click', checkAnswer);
updateWidth();
