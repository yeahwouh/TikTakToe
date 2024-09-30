function GameBoard(){
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

    const playerSigns = ["O", "X"];
    const tickCell = function(cell, player){
        // Map cell to the actual indices
        cell = cell.map((x) => x-1);
        let [row, column] = cell;
        board[row][column] = playerSigns[player-1];
    }


    return {getBoard, logBoard, tickCell};
}

let jonn = GameBoard();
jonn.tickCell([2,2], 2)
jonn.tickCell([2,3], 1)
jonn.tickCell([1,1], 2)
jonn.tickCell([3,3], 1)
jonn.tickCell([1,2], 2)
jonn.tickCell([1,3], 1)

jonn.logBoard()

let a = [[1,2,3],
                [4,5,6],
                [7,8,9]];
console.log(a[2][2]);