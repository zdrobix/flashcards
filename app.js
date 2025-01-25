const cardFront = document.querySelector('.card-front p');
const cardBack = document.querySelector('.card-back p');
const nextButton = document.querySelector('.next-button');
const switchButton = document.querySelector('.switch-course');
const numberButton = document.querySelector('.number-button');
const cardInner = document.querySelector('.card-inner');

let count = 0;
let flashcards = [];
let total = 0;
let start = 0;
let next_messages = [
    {message : "Next"},
    {message : "Next"}
];

function fetchInput(inputfile) {
    fetch(inputfile)
        .then(response => response.json())
        .then(data => {
            flashcards = data;
            total = flashcards.length;
            console.log(flashcards);  
        })
        .catch(error => console.error('Error loading JSON:', error));
}

function getRandomFlashcard() {
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    return flashcards[randomIndex];
}

function updateCard() {
    cardInner.classList.remove('flipped');
    cardBack.style.visibility = 'hidden';
    if (flashcards.length === 0 ) {
        cardFront.textContent = "Aceasta a fost ultima intrebare, iub.";
        cardBack.textContent = "Da refresh la pagina pentru a incepe din nou. ";
        setTimeout(() => {
        cardBack.style.visibility = 'visible';
        }, 300);
        return;
    }
    count ++;
    const flashcard = getRandomFlashcard();
    numberButton.textContent = count + '/' + total;
    cardFront.textContent = flashcard.question;
        cardBack.textContent = flashcard.answer;
    flashcards = flashcards.filter(card => card !== flashcard);
    nextButton.textContent = next_messages[Math.floor(Math.random() * next_messages.length)].message;
    setTimeout(() => {
        cardBack.style.visibility = 'visible';
    }, 300);
}

function changeCourse() {
    count = 0;
    if (switchButton.textContent === 'Antro') {
        switchButton.textContent = 'Retele';
        fetchInput('flashcards_retele.json');
        return;
    }
    switchButton.textContent = 'Antro';
    fetchInput('flashcards_antro.json');
}

cardInner.addEventListener('click', () => {
    cardInner.classList.toggle('flipped');
});

fetchInput('flashcards_antro.json');
if (flashcards.length > 0)
    updateCard();

nextButton.addEventListener('click', updateCard);

switchButton.addEventListener('click', changeCourse)
