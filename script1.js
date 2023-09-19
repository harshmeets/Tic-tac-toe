const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let flippedCards = [];
let matchedCards = [];
let lives = 10; // Number of lives
let isFlipping = false;

const gameContainer = document.getElementById('game-container');
const restartButton = document.getElementById('restart-button');
const gameOverModal = document.getElementById('game-over-modal');
const gameOverMessage = document.getElementById('game-over-message');
const restartButtonModal = document.getElementById('restart-button-modal');
const livesDisplay = document.getElementById('lives');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.innerHTML = '<div class="front"></div><div class="back">' + value + '</div>';
    card.addEventListener('click', () => flipCard(card));
    gameContainer.appendChild(card);
}

function startGame() {
    flippedCards = [];
    matchedCards = [];
    lives = 10;
    livesDisplay.textContent = `Lives: ${lives}`;
    gameContainer.innerHTML = '';
    shuffleArray(cardValues);
    cardValues.forEach(value => createCard(value));
    restartButton.style.display = 'none';
    gameOverModal.style.display = 'none';
}

function flipCard(card) {
    if (isFlipping || card.classList.contains('flipped') || flippedCards.length >= 2) return;
    
    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        isFlipping = true;
        setTimeout(checkMatch, 1);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        matchedCards.push(card1, card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        if (matchedCards.length === cardValues.length) {
            showWinningDialog();
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 1000);
        updateLives();
        if (lives <= 0) {
            showLosingDialog();
        }
    }
    flippedCards = [];
    isFlipping = false;
}

function updateLives() {
    lives--;
    livesDisplay.textContent = `Lives: ${lives}`;
}

function showWinningDialog() {
    alert('Congratulations! You won!');
    restartButton.style.display = 'block';
}

function showLosingDialog() {
    gameOverMessage.textContent = 'Game Over! You ran out of lives.';
    gameOverModal.style.display = 'flex';
    revealAllCards();
}

function revealAllCards() {
    const cards = document.querySelectorAll('.card:not(.matched)');
    cards.forEach(card => card.classList.add('flipped'));
}

restartButton.addEventListener('click', startGame);
restartButtonModal.addEventListener('click', startGame);

// Start the game when the page loads
startGame();
