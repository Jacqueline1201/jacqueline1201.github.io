let score = 0;

const box = document.getElementById("box");
const scoreDisplay = document.getElementById("score");
const gameContainer = document.getElementById("game-container");

function setBoxPosition(x, y) {
    box.style.left = x + "px";
    box.style.top = y + "px";
}

function moveBox() {
    const maxX = window.innerWidth - box.clientWidth;
    const maxY = window.innerHeight - box.clientHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    box.style.left = randomX + "px";
    box.style.top = randomY + "px";
}

box.addEventListener("click", function () {
    score++;
    scoreDisplay.textContent = score;
    moveBox();
});

// Center the box relative to the screen (body)
function centerBox() {
    const centerX = (window.innerWidth*1.1 - box.clientWidth) / 2;
    const centerY = (window.innerHeight*1.4 - box.clientHeight) / 2;
    setBoxPosition(centerX, centerY);
}

// Wait until the page fully loads to ensure correct dimensions
window.onload = centerBox;
