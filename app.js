const cardFront = document.querySelector('.card-front p');
const cardBack = document.querySelector('.card-back p');
const nextButton = document.querySelector('.next-button');
const numberButton = document.querySelector('.number-button');
const cardInner = document.querySelector('.card-inner');

let count = 0;
let flashcards = [];
let total = 0;
fetch('flashcards.json')
    .then(response => response.json())
    .then(data => {
        flashcards = data;
        total = flashcards.length;
        console.log(flashcards);  
    })
    .catch(error => console.error('Error loading JSON:', error));

let next_messages = [
    {message : "Next"},
    {message : "Next"}
];

function getRandomFlashcard() {
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    return flashcards[randomIndex];
}

function updateCard() {
    cardInner.classList.remove('flipped');
    cardBack.style.visibility = 'hidden';
    if (flashcards.length === 0 ) {
        cardFront.textContent = "Aceasta a fost ultima intrebare.";
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

cardInner.addEventListener('click', () => {
    cardInner.classList.toggle('flipped');
});

if (flashcards.length > 0)
    updateCard();

nextButton.addEventListener('click', updateCard);
