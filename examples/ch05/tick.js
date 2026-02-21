import { createApp, h, hFragment } from "../../packages/runtime/dist/philo-scratch.js";

const state = {
  winner: null,
  currentPlayer: "p1",
  board: Array.from({ length: 3 }, () => [0, 0, 0]),
};

const reducers = {
  "play-turn": (state, location) => {
    let { board, currentPlayer, winner } = state;
    let [ridx, cidx] = location;
    console.log("BOARD:", board);
    if (board[ridx][cidx] !== 0 || winner) {
      console.log("invalid:", ridx, cidx, board[ridx][cidx], winner);
      return state;
    }
    board[ridx][cidx] = currentPlayer;

    if (threeInARow(board)) {
      winner = currentPlayer;
    } else if (board.every((row) => row.every((cell) => cell !== 0))) {
      winner = "Draw";
    } else {
      currentPlayer = switchTurn(currentPlayer);
    }
    console.log("switching player: ", currentPlayer, board);
    return {
      winner,
      currentPlayer,
      board,
    };
  },
};

function threeInARow(board) {
  for (let i = 0; i < 3; i++) {
    // rows
    if (board[i][0] !== 0 && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      return true;
    }
    // columns
    for (let j = 0; j < 3; j++) {
      if (board[0][j] !== 0 && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
        return true;
      }
    }
    // diagonales
    if (board[0][0] !== 0 && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return true;
    }
    if (board[0][2] !== 0 && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return true;
    }
    return false;
  }
}

function switchTurn(currentPlayer) {
  if (currentPlayer === "p1") return "p2";
  else return "p1";
}

function App(state, emit) {
  console.log("APP: ", state, emit);
  return hFragment([
    h("h1", {}, ["Tic Tac Toe"]),
    Board(state, emit),
    h("h2", {}, [state.winner ? `Winner: ${state.winner}` : `Turn: ${state.currentPlayer}`]),
  ]);
}

function Board({ board }, emit) {
  return h("table", {}, [
    h(
      "tbody",
      {},
      board.map((row, ridx) =>
        h(
          "tr",
          {},
          row.map((cell, cidx) =>
            h("button", { on: { click: () => emit("play-turn", [ridx, cidx]) } }, [String(cell)]),
          ),
        ),
      ),
    ),
  ]);
}

console.log({ state, reducers });
createApp({ state, view: App, reducers }).mount(document.body);
