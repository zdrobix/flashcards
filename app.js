const cardFront = document.querySelector('.card-front p');
const cardBack = document.querySelector('.card-back p');
const nextButton = document.querySelector('.next-button');
const numberButton = document.querySelector('.number-button');
const cardInner = document.querySelector('.card-inner');

let count = 0;
let flashcards = [
    { question: "Intrebare1", answer: "Foarte mult" },
    { question: "Intrebare2", answer: "Andrea Sabau" }
];
let total = flashcards.length;

let next_messages = [
    {message : "Next pls..."},
    {message : "Thank you, next"},
    {message : "Urmatoarea intrebare"},
    {message : "Next"},
    {message : "She's on FIRE"},
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
    if (flashcards.length === 0) {
        cardFront.textContent = "Gata intrebarile iub!!!";
        cardBack.textContent = "Da refresh la pagina pentru a incepe din nou. ";
        return;
    }
    count ++;
    const flashcard = getRandomFlashcard();
    if (count < total)
        numberButton.textContent = count + '/' + total;
    else numberButton.textContent = 'Ultima intrebare iub!';
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

updateCard();

nextButton.addEventListener('click', updateCard);
