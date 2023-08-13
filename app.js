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
  const message = document.querySelector(".message");



  const updateBoard = () => {
    for (let i = 0; i < cells.length; i++){
      cells[i].textContent = GameBoard.getCell(i);
    }
  };

  cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
      if (GameController.getIsGameOver() || e.target.textContent !== "") return;
      GameController.playRound(e.target.dataset.index)
      updateBoard();
    });
  });

  const setResult = (result) => {
    if (result === 'Draw') {
      setMessage("Draw!")
    } else {
      setMessage(`Player ${result} has won`);
    }
  };

  const setMessage = (text) => {
    message.textContent = text;
  };


  return { setResult,setMessage };
  
})();

const GameController = (() => {
  const player1 = Player('x');
  const player2 = Player('o');
  
  let round = 1;
  let isGameOver = false;
  
  const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  
  const playRound = (cellIndex) => {
    GameBoard.setCell(cellIndex, getCurrentPlayerMark());
    if (round === 9) {
      DisplayController.setResult('Draw');
      isGameOver = true;
    }
    if (checkWinner(parseInt(cellIndex))) {
      isGameOver = true;
      DisplayController.setResult(getCurrentPlayerMark().toUpperCase());
    }
    
    round++;
  };
  

  const checkWinner = (cellIndex) => {
    return winCombos
      .filter((combo) => combo.includes(cellIndex))
      .some((possibleCombo) =>
        possibleCombo.every(
          (index) => GameBoard.getCell(index) === getCurrentPlayerMark()
        )
      );
  };
  
  
  const getCurrentPlayerMark = () => {
    return round % 2 ? player1.getMark() : player2.getMark();
  };

  const getIsGameOver = () => {
    return isGameOver;
  }


  return { playRound,getIsGameOver };

})();
