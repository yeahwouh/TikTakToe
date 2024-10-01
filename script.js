function Gameboard(){

    let board = [];
    for(let i = 0; i<3; i++){
        board[i]=[];
        for(let j = 0; j<3; j++){
            board[i][j] = [];
        }
    }

    const getBoard = () => board;
    const logBoard = () => {
      for(let row in board){
          console.log(board[row])
      }
    };

    const tickCell = function(cell, token){
        // Map cell to the actual indices
        cell = cell.map(num => num-1);
        let [row, column] = cell;
        board[row][column] = token;
    }

    return {getBoard, logBoard, tickCell};
}

function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = Gameboard();

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

    };

    const printNewRound = () => {
        console.log(`It's ${activePlayer.name}s turn`);
        board.logBoard();
    };

    return {playRound, getActivePlayer};
}

const game = GameController();


game.playRound([1,2])