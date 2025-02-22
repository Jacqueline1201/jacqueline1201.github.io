const confettiContainer = document.getElementById("confetti-container");

function createConfetti() {
    for (let i = 0; i < 100; i++) { // Number of confetti pieces
        const confettiPiece = document.createElement("div");
        confettiPiece.classList.add("confetti");

        // Randomize confetti color
        const colors = ["#7F95D1", "#FF82A9", "#FFC0BE", "#68A357", "#A6B07E"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        confettiPiece.style.backgroundColor = randomColor;

        // Randomize the position and animation delay
        const randomLeft = Math.random() * 100; // Position between 0% and 100%
        const randomDelay = Math.random() * 2; // Random delay for the animation
        confettiPiece.style.left = `${randomLeft}%`;
        confettiPiece.style.animationDelay = `${randomDelay}s`;

        confettiContainer.appendChild(confettiPiece);

        // Remove the confetti after animation completes (to prevent memory leaks)
        setTimeout(() => {
            confettiPiece.remove();
        }, 3000); // Matches the animation duration
    }
}

// Trigger confetti when the page loads
window.onload = createConfetti;
