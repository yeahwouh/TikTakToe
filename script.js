function Gameboard(){

    let board = [];
    for(let i = 0; i<3; i++){
        board[i]=[];
        for(let j = 0; j<3; j++){
            board[i][j] = [" "];
        }
    }

    const getBoard = () => board;

    const tickCell = function(cell, token){
        let [row, column] = cell;
        board[row][column] = token;
    }

    return {getBoard, tickCell};
}

function GameController(playerOneName, playerTwoName) {
    const board = Gameboard();
    const getBoard = () => board.getBoard();

    const players = [
        {name: playerOneName,
         token: "O"},
        {name: playerTwoName,
         token: "X"}
    ];

    let activePlayer = players[0];
    const getActivePlayer = () => activePlayer;

    const switchPlayerTurn = () => {
        (activePlayer === players[1]) ? activePlayer = players[0] : activePlayer = players[1];
    };

    const checkWinner = function(){
        for (let i = 0; i < 3; i++) {
            // Check rows
            if (board.getBoard()[i][0] !== " " && board.getBoard()[i][0] === board.getBoard()[i][1] && board.getBoard()[i][1] === board.getBoard()[i][2]) {
                return board.getBoard()[i][0]; // Return "X" or "O"
            }
            // Check columns
            if (board.getBoard()[0][i] !== " " && board.getBoard()[0][i] === board.getBoard()[1][i] && board.getBoard()[1][i] === board.getBoard()[2][i]) {
                return board.getBoard()[0][i]; // Return "X" or "O"
            }
        }

        // Check diagonals
        if (board.getBoard()[1][1] !== " ") { // Check if the center cell is not empty
            if (board.getBoard()[0][0] === board.getBoard()[1][1] && board.getBoard()[1][1] === board.getBoard()[2][2]) {
                return board.getBoard()[1][1]; // Return "X" or "O"
            }
            if (board.getBoard()[0][2] === board.getBoard()[1][1] && board.getBoard()[1][1] === board.getBoard()[2][0]) {
                return board.getBoard()[1][1]; // Return "X" or "O"
            }
        }

        // No winner
        return null;
    }

    const playRound = (cell) => {
            board.tickCell(cell, activePlayer.token);
            switchPlayerTurn();
        }
    return {playRound, getActivePlayer, getBoard, checkWinner};
}

function ScreenController(playerOneName, playerTwoName) {
    const game = GameController(playerOneName, playerTwoName);
    const board = game.getBoard();
    let turnText = document.querySelector(".turn");
    let container = document.querySelector(".container");
    let boardDiv = document.createElement("div");
    boardDiv.classList.add("board")
    container.appendChild(boardDiv)
    const updateScreen = () => {
        // Clear the board
        boardDiv.textContent = "";
        // Display whos turn it is
        let activePlayer = game.getActivePlayer();
        turnText.textContent = "It's " + activePlayer.name+"s turn...";

        // Render the board
        board.forEach((row, row_index) => {
            row.forEach((cell, column_index) => {
               let cellButton = document.createElement("button");
               cellButton.classList.add("cell");

               cellButton.position = [row_index, column_index];
               cellButton.textContent = cell;
               boardDiv.appendChild(cellButton);
            });
        });
        if (game.checkWinner() !== null) {
            turnText.textContent = game.checkWinner() + " WON!!"
            boardDiv.remove();
            container.append(form);
        }

        function clickHandlerBoard(e) {
            const selectedCell = e.target.position;

            // Check if cell is already ticked
            let row = selectedCell[0];
            let column = selectedCell[1];
            if (board[row][column] == " ") {
                game.playRound(selectedCell);
                updateScreen();
            } else {
                return;
            }
            if (!selectedCell) return;
        }
        boardDiv.addEventListener("click", clickHandlerBoard);
    }

    // Initial render
    updateScreen();
}

let form = document.getElementById('nameForm')
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page
    const playerOneName = document.getElementById('nameInput1').value;
    const playerTwoName = document.getElementById('nameInput2').value;
    form.remove()
    ScreenController(playerOneName, playerTwoName);
});
