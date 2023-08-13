const GameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];


  const getCell = (index) => {
    return board[index];
  };

  const setCell = (index,mark) => {
    board[index] = mark;
  };

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
      
    }
  }

  return { getCell,setCell,reset };

})();

const Player = (mark) => {
  const getMark = () => mark;

  return { getMark };
};

const DisplayController = (() => {
  const cells = document.querySelectorAll(".cell");
  const message = document.querySelector(".message");
  const modal = document.querySelector(".modal");
  const resultHeader = document.querySelector(".result-header");
  const restartMain = document.querySelector("#restart-main");
  const restartModal = document.querySelector("#restart-btn-modal");
  
  cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
      if (GameController.getIsGameOver() || e.target.textContent !== "") return;
      GameController.playRound(e.target.dataset.index)
      updateBoard();
    });
  });

  restartMain.addEventListener('click', () => {
    GameBoard.reset();
    GameController.reset();
    updateBoard();
    DisplayController.setMessage(`Let's Play`);
  });

  restartModal.addEventListener('click', () => {
    GameBoard.reset();
    GameController.reset();
    modal.close();
    updateBoard();
    DisplayController.setMessage(`Let's Play`);
  });
  
  const updateBoard = () => {
    for (let i = 0; i < cells.length; i++){
      cells[i].textContent = GameBoard.getCell(i);
    }
  };

  const setResult = (text) => {
    if (text === 'Draw') {
      resultHeader.textContent = text;
    } else {
      resultHeader.textContent = `Player ${text.toUpperCase()} has won`;
    }
    modal.showModal();
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
      isGameOver = true;
      DisplayController.setResult('Draw');
    }
    if (checkWinner(parseInt(cellIndex))) {
      isGameOver = true;
      DisplayController.setResult(getCurrentPlayerMark().toUpperCase());
    }
    
    round++;
    DisplayController.setMessage(`Player ${getCurrentPlayerMark().toUpperCase()}'s turn`)
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

  const reset = () => {
    round = 1;
    isGameOver = false;
  };

  return { playRound,getIsGameOver,reset };

})();
