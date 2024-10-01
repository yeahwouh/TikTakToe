function Gameboard(){

    let board = [];
    for(let i = 0; i<3; i++){
        board[i]=[];
        for(let j = 0; j<3; j++){
            board[i][j] = [];
        }
    }

    const getBoard = () => board;
    const logBoard = () => console.log(board);

    const tickCell = function(cell, token){
        let [row, column] = cell;
        board[row][column] = token;
        console.log("tick")
    }

    return {getBoard, logBoard, tickCell};
}

function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
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

    const playRound = (cell) => {
        board.tickCell(cell, activePlayer.token);
        board.logBoard();
        switchPlayerTurn();
        console.log(activePlayer)
    };

    return {playRound, getActivePlayer, getBoard};
}

const game = GameController();

function ScreenController() {
    const game = GameController();
    const board = game.getBoard();
    let activePlayer = game.getActivePlayer();
    let turnText = document.querySelector(".turn");
    let boardDiv = document.querySelector(".board");
    const updateScreen = () => {
        // Clear the board
        boardDiv.textContent = "";
        // Display whos turn it is
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

        function clickHandlerBoard(e) {
            console.log("AA")
            const selectedCell = e.target.position;

            if (!selectedCell) return;

            game.playRound(selectedCell);
            updateScreen();
        }
        boardDiv.addEventListener("click", clickHandlerBoard, {once : true});
    }

    // Initial render
    updateScreen();
}

ScreenController();
