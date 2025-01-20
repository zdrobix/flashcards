const cardFront = document.querySelector('.card-front p');
const cardBack = document.querySelector('.card-back p');
const nextButton = document.querySelector('.next-button');
const numberButton = document.querySelector('.number-button');

let count = 0;
let flashcards = [
    { question: "intrebare1", answer: "Foarte mult" },
    { question: "Ciaooo", answer: "Andrea Sabau" },
];
let total = flashcards.length;

function getRandomFlashcard() {
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    return flashcards[randomIndex];
}

function updateCard() {
    if (flashcards.length === 0) {
        cardFront.textContent = "Gata intrebarile iub!!!";
        cardBack.textContent = "Da refresh la pagina pentru a incepe din nou.";
        return;
    }
    count ++;
    const flashcard = getRandomFlashcard();
    numberButton.textContent = count + '/' + total;
    cardFront.textContent = flashcard.question;
    cardBack.textContent = flashcard.answer;
    flashcards = flashcards.filter(card => card !== flashcard);
}

updateCard();

nextButton.addEventListener('click', updateCard);
