const GameBoard = (() => {
  const _board = ["x", "o", "x", "x", "o", "x", "o", "x", "o"];

  const getCell = (index) => {
    return _board[index];
  };

  return { getCell };

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

  return { updateBoard };
})();

DisplayController.updateBoard();