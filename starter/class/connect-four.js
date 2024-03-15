const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    // Screen.addCommand('t', 'test command (remove)', ConnectFour.testCommand);
    Screen.addCommand('up', 'moves cursor up', this.cursor.up);
    Screen.addCommand('Down', 'moves cursor down', this.cursor.down);
    Screen.addCommand('left', 'move cursor left', this.cursor.left);
    Screen.addCommand('right', 'moves cursor right', this.cursor.right);
    Screen.addCommand('return', "places a move in the current position", this.placeMove)

    this.cursor.setBackgroundColor();
    Screen.render();
  }
  // Return 'X' if player X wins
  // Return 'O' if player O wins
  // Return 'T' if the game is a tie
  // Return false if the game has not ended

  placeMove = () => {
    if(Screen.grid[this.cursor.row][this.cursor.col] === " ") {
      Screen.setTextColor(this.cursor.row, this.cursor.col, 'white');
      Screen.setGrid(this.row, this.col, this.playerTurn);
      Screen.render()
      if (Cursor.checkWin(Screen.grid)) {
        Cursor.endGame(Cursor.checkWin(Screen.grid));
      }
    }
  }

  static checkWin(grid) {
    // Horizontal Check
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 3; col++) {
        if (grid[row][col] != ' ' &&
        grid[row][col] === grid[row][col + 1] &&
        grid[row][col] === grid[row][col + 2] &&
        grid[row][col] === grid[row][col + 3]) {
          return grid[row][col];
        }
      }
    }

    // Vertical Check
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 4; row++) {
        if (grid[row][col] != ' ' &&
        grid[row][col] === grid[row + 1][col] &&
        grid[row][col] === grid[row + 2][col] &&
        grid[row][col] === grid[row + 3][col]) {
          return grid[row][col];
        }
      }
    }

    // Diagonal Check
    // DownWard win
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 3; col++) {
        if (grid[row][col] != ' ' &&
        grid[row][col] === grid[row + 1][col + 1] &&
        grid[row][col] === grid[row + 2][col + 2] &&
        grid[row][col] === grid[row + 3][col + 3]) {
          return grid[row][col];
        }
      }
    }

    // Upward Win
    for (let col = 6; col > 0; col--) {
      for (let row = 0; row < 3; row++) {
        if (grid[row][col] != ' ' &&
        grid[row][col] === grid[row + 1][col - 1] &&
        grid[row][col] === grid[row + 2][col - 2] &&
        grid[row][col] === grid[row + 3][col - 3]) {
          return grid[row][col];
        }
      }
    }

    // Tie Check
    if (grid.every(row => row.every(cell => cell !== ' '))) {
      return 'T'
    }

    return false 
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = ConnectFour;
