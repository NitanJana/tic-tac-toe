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
  this.mark = mark;

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
      GameBoard.setCell(e.target.dataset.index, 'x');
      updateBoard();
    });
  });

  

  return { updateBoard };
})();

DisplayController.updateBoard();