const puzzleContainer = document.getElementById("puzzle-container");
const shuffleButton = document.getElementById("shuffle-btn");
const completionModal = document.getElementById("completion-modal");
const closeBtn = document.getElementById("close-btn");

const rows = 3, cols = 3;
let pieces = [];
let correctOrder = [];

// Generate puzzle pieces
function createPuzzle() {
    const positions = [];

    // Initialize the correct positions for pieces
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            correctOrder.push(row * cols + col);
        }
    }

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const piece = document.createElement("div");
            piece.classList.add("puzzle-piece");
            piece.style.backgroundImage = "url('images/cat_doodle3.png')"; // Make sure the image path is correct
            piece.style.backgroundPosition = `-${col * 100}px -${row * 100}px`; // Set the background to show the correct piece
            piece.setAttribute("data-id", row * cols + col); // Each piece gets a unique ID

            piece.draggable = true;
            piece.addEventListener("dragstart", dragStart);
            piece.addEventListener("dragover", dragOver);
            piece.addEventListener("drop", drop);

            puzzleContainer.appendChild(piece);
            positions.push(piece);
        }
    }

    pieces = positions;
    shufflePuzzle();
}

// Shuffle puzzle pieces
function shufflePuzzle() {
    const shuffled = [...pieces].sort(() => Math.random() - 0.5);
    puzzleContainer.innerHTML = "";
    shuffled.forEach(piece => puzzleContainer.appendChild(piece));
}

// Drag and drop events
let draggedPiece = null;

function dragStart(event) {
    draggedPiece = event.target;
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    if (event.target.classList.contains("puzzle-piece")) {
        // Swap the two pieces
        let draggedIndex = [...puzzleContainer.children].indexOf(draggedPiece);
        let targetIndex = [...puzzleContainer.children].indexOf(event.target);

        puzzleContainer.insertBefore(draggedPiece, puzzleContainer.children[targetIndex]);
        puzzleContainer.insertBefore(event.target, puzzleContainer.children[draggedIndex]);

        checkCompletion(); // Check if the puzzle is solved after each drop
    }
}

// Check if the puzzle is complete
function checkCompletion() {
    let isComplete = true;

    // Check if each piece is in its correct position
    [...puzzleContainer.children].forEach((piece, index) => {
        if (parseInt(piece.getAttribute("data-id")) !== correctOrder[index]) {
            isComplete = false;
        }
    });

    // If puzzle is complete, show the modal
    if (isComplete) {
        showCompletionScreen();
    }
}

// Show completion modal
function showCompletionScreen() {
    completionModal.style.display = "flex"; // Show the modal
}

// Close the completion modal
// closeBtn.addEventListener("click", () => {
//     completionModal.style.display = "none"; // Hide the modal
// });

// Initialize game
createPuzzle();
shuffleButton.addEventListener("click", shufflePuzzle);
