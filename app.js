const game = document.getElementById("game");
const ghost = document.getElementById("ghost");
const player = document.getElementById("player");

const SIZE = 45;                              // emoji size
const MAX = game.clientWidth - SIZE;          // keep everything inside the box
const PLAYER_STEP = 20;
const GHOST_STEP = 5;

let playerX = 200, playerY = 200;
let ghostX = 0, ghostY = 0;
let gameOver = false;

function clamp(n) {
    return Math.max(0, Math.min(MAX, n));
}

function draw() {
    player.style.left = playerX + "px";
    player.style.top = playerY + "px";
    ghost.style.left = ghostX + "px";
    ghost.style.top = ghostY + "px";
}

// Player movement (called by the buttons)
function moveTop()   { if (!gameOver) { playerY = clamp(playerY - PLAYER_STEP); draw(); } }
function moveDown()  { if (!gameOver) { playerY = clamp(playerY + PLAYER_STEP); draw(); } }
function moveLeft()  { if (!gameOver) { playerX = clamp(playerX - PLAYER_STEP); draw(); } }
function moveRight() { if (!gameOver) { playerX = clamp(playerX + PLAYER_STEP); draw(); } }

// Arrow keys too
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") moveTop();
    if (e.key === "ArrowDown") moveDown();
    if (e.key === "ArrowLeft") moveLeft();
    if (e.key === "ArrowRight") moveRight();
});

function moveGhost() {
    if (gameOver) return;

    // Move ghost horizontally towards the player
    if (ghostX < playerX) {
        ghostX = Math.min(ghostX + GHOST_STEP, playerX);
    } else if (ghostX > playerX) {
        ghostX = Math.max(ghostX - GHOST_STEP, playerX);
    }

    // Move ghost vertically towards the player
    if (ghostY < playerY) {
        ghostY = Math.min(ghostY + GHOST_STEP, playerY);
    } else if (ghostY > playerY) {
        ghostY = Math.max(ghostY - GHOST_STEP, playerY);
    }

    draw();
    checkCaught();
}

function checkCaught() {
    const close = Math.abs(ghostX - playerX) < SIZE / 2 &&
                  Math.abs(ghostY - playerY) < SIZE / 2;
    if (close) {
        gameOver = true;
        player.textContent = "&#128169;";
        setTimeout(() => alert("The ghost got you!"), 50);
    }
}

draw();

// Run the moveGhost function every 100 milliseconds
setInterval(moveGhost, 100);