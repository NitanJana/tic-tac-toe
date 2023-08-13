const GameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  
  const getCell = (index) => {
    return board[index];
  };

  const setCell = (index,mark) => {
    board[index] = mark;
  };



  return { getCell,setCell };

})();

const Player = (mark) => {
  const getMark = () => mark;

  return { getMark };
};

const DisplayController = (() => {
  const cells = document.querySelectorAll(".cell");



  const updateBoard = () => {
    for (let i = 0; i < cells.length; i++){
      cells[i].textContent = GameBoard.getCell(i);
    }
  };

  cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
      GameController.playRound(e.target.dataset.index)
      updateBoard();
    });
  });

  
})();

const GameController = (() => {
  const player1 = Player('x');
  const player2 = Player('o');

  let round = 1;



  const playRound = (cellIndex) => {
    GameBoard.setCell(cellIndex, getCurrentPlayerMark());
    round++;
  };

  const getCurrentPlayerMark = () => {
    return round % 2 ? player1.getMark() : player2.getMark();
  };



  return { playRound };

})();
