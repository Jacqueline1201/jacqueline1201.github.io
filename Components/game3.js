let score = 0;
let gameInterval;
let moleInterval;
let activeMole = null;
let isGameOver = false;

function startGame() {
    score = 0;
    document.getElementById("score").textContent = score;
    isGameOver = false;
    startMoleMovement();
}

function startMoleMovement() {
    // Hide any active moles
    hideMole();
    // Start the game loop if the game is not over
    if (!isGameOver) {
        gameInterval = setInterval(showRandomMole, 1000);
    }
}

function showRandomMole() {
    // If the game is over, stop generating new moles
    if (isGameOver) return;

    // Pick a random hole
    const holes = document.querySelectorAll('.hole');
    const randomIndex = Math.floor(Math.random() * holes.length);
    const randomHole = holes[randomIndex];

    // Create the mole element if not already created
    if (!randomHole.querySelector('.mole')) {
        const mole = document.createElement('div');
        mole.classList.add('mole');
        mole.addEventListener('click', hitMole);
        randomHole.appendChild(mole);
    }

    // Show the mole by changing its position
    const mole = randomHole.querySelector('.mole');
    mole.style.display = 'block';

    // Move mole up
    mole.style.top = '0';
    setTimeout(() => {
        mole.style.top = '-100%'; // Hide the mole after a moment
    }, 800);
}

function hitMole(event) {
    // Increase the score when a mole is hit
    score++;
    document.getElementById("score").textContent = score;
    
    // Check if the score reaches 5 to show the modal
    if (score === 8) {
        stopGame();
        showModal();
    }
    
    hideMole();
}

function hideMole() {
    // Hide any visible mole
    const moles = document.querySelectorAll('.mole');
    moles.forEach(mole => mole.style.display = 'none');
}

// Modal functions
function showModal() {
    const modal = document.getElementById('completion-modal');
    modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById('completion-modal');
    modal.style.display = "none";
}

// Stop the game when the modal appears
function stopGame() {
    isGameOver = true;
    clearInterval(gameInterval); // Stop generating new moles
}
