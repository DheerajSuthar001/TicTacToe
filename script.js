const gameInfo = document.querySelector(".gameInfo");
const newGameBtn = document.querySelector("#newGame");
const boxes = document.querySelectorAll(".box");

let currentPlayer;
let gameGrid;
const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
initializeGame();
//Initialize game
function initializeGame() {
    currentPlayer = 'X';
    gameInfo.textContent = `Current Player ${currentPlayer}`;
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    newGameBtn.classList.remove("active");
    boxes.forEach((e) => {
        e.innerText = '';
        e.style.pointerEvents = "auto";
        e.classList.remove('win');
    })
}
boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    })
});
function swap() {
    if (currentPlayer === 'X')
        currentPlayer = 'O';
    else
        currentPlayer = 'X';
    gameInfo.textContent = `Current Player ${currentPlayer}`;
}
function checkGameOver() {
    let isWin = false;
    winningPositions.forEach((p) => {
        if ((gameGrid[p[0]] === 'X' && gameGrid[p[1]] === 'X' && gameGrid[p[2]] === 'X') || gameGrid[p[0]] === 'O' && gameGrid[p[1]] === 'O' && gameGrid[p[2]] === 'O') {
            p.forEach(element => {
                boxes[element].classList.add("win");
            });
            boxes.forEach((e) => {
                e.style.pointerEvents = "none";
            });
            newGameBtn.classList.add("active");
            gameInfo.textContent = `${currentPlayer} won`;
            return;
        }
        
        let fillCount=0;
        gameGrid.forEach(value => {
            if(value!=='')
                fillCount++;
        });
        if(fillCount==9){
            newGameBtn.classList.add("active");
            gameInfo.textContent = `Game Tied!`;
        }
    })
}
function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swap();
        checkGameOver();
    }
}
newGameBtn.addEventListener('click', initializeGame);
