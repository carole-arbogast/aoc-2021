import run from "aocrunner";
import chunk from "lodash/chunk.js";

const fakeInput = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

interface RowOrColumn {
  items: Array<number | "X">;
}

interface Board {
  rows: RowOrColumn[];
  columns: RowOrColumn[];
}

interface Position {
  col: number;
  row: number;
}

const parseInput = (rawInput: string) => rawInput;

class Bingo {
  data: string;
  drawnNumbers: number[];
  boards: Board[];
  winners: Board[];
  winningNumber: number | null;
  winningBoardIndex: number[];

  constructor(data: string) {
    this.winners = [];
    this.winningNumber = null;
    this.winningBoardIndex = [];
    this.data = data;
    this.drawnNumbers = this.generateDrawnNumbers();
    this.boards = this.generateBoards();
  }

  private generateDrawnNumbers(): number[] {
    const entries = this.data.split("\n")[0].split(",");
    return entries.map((e) => Number(e));
  }

  private generateRows(board: string[]) {
    return board.map((row) => {
      const rowItems = row
        .split(" ")
        .filter((e) => e !== "")
        .map((e) => Number(e));
      return {
        items: rowItems,
      };
    });
  }

  private generateColumns(rows: RowOrColumn[]) {
    const columns = new Array(5).fill(null).map((column, colIndex) => {
      return {
        items: new Array(5).fill(null).map((_e, index) => {
          return rows[index].items[colIndex];
        }),
      };
    });
    return columns;
  }

  private generateBoards(): Board[] {
    const entries = this.data.split("\n").filter((e) => e !== "");
    const boards = chunk(entries.slice(1, entries.length), 5);
    const formatedBoards = boards.map((board) => {
      const rows = this.generateRows(board);
      const columns = this.generateColumns(rows);

      return {
        rows,
        columns,
      };
    });
    return formatedBoards;
  }

  private checkBingo(board: Board, index: number, number: number) {
    const updatedRows: RowOrColumn[] = board.rows.map((row) => ({
      items: row.items.map((item) => (item === number ? "X" : item)),
    }));

    const updatedColumns: RowOrColumn[] = board.columns.map((row) => ({
      items: row.items.map((item) => (item === number ? "X" : item)),
    }));

    this.boards[index].rows = updatedRows;
    this.boards[index].columns = updatedColumns;

    const bingo =
      updatedRows.find((row) => row.items.every((item) => item === "X")) ||
      updatedColumns.find((row) => row.items.every((item) => item === "X"));
    return bingo;
  }

  private checkBoards(boards: Board[], number: number) {
    for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
      const board = boards[boardIndex];

      const bingo = this.checkBingo(board, boardIndex, number);

      if (bingo) {
        this.winners = [...this.winners, board];
        this.winningNumber = number;
        this.winningBoardIndex = [...this.winningBoardIndex, boardIndex];
      }
    }
  }

  playGame() {
    const { drawnNumbers, boards } = this;
    while (this.winners.length === 0) {
      for (let i = 0; i < drawnNumbers.length; i++) {
        const number = drawnNumbers[i];
        if (this.winners.length > 0) {
          break;
        }
        this.checkBoards(boards, number);
      }
    }

    return this.winners;
  }

  findLastWinner() {
    const losingBoards = this.drawnNumbers.map((number, numIndex) => {
      const filteredBoards = this.boards.filter((board, index) => {
        const bingo = Boolean(this.checkBingo(board, index, number));
        return !bingo;
      });
      if (filteredBoards.length === 1) {
        // Loop over remaining numbers. If it's a bingo, update winning number + winners + break the loop.
        const remainingNumbers = this.drawnNumbers.slice(numIndex);

        for (let i = 0; i < remainingNumbers.length; i++) {
          const board = filteredBoards[0];
          const number = remainingNumbers[i];

          const updatedRows: RowOrColumn[] = board.rows.map((row) => ({
            items: row.items.map((item) => (item === number ? "X" : item)),
          }));

          const updatedColumns: RowOrColumn[] = board.columns.map((row) => ({
            items: row.items.map((item) => (item === number ? "X" : item)),
          }));

          const bingo =
            updatedRows.find((row) =>
              row.items.every((item) => item === "X"),
            ) ||
            updatedColumns.find((row) =>
              row.items.every((item) => item === "X"),
            );

          if (bingo) {
            const updatedBoard: Board = {
              rows: updatedRows,
              columns: updatedColumns,
            };
            this.winningNumber = number;
            this.winners = [updatedBoard];
            break;
          }
        }
      }
      this.boards = filteredBoards;
      return { remainingBoards: filteredBoards, number };
    });
  }

  getWinnerScore() {
    if (this.winners.length === 0) {
      throw Error("There is no winner yet");
    }

    if (!this.winningNumber) {
      throw Error("There is no winning number yet");
    }

    const unmarkedValues = this.winners[this.winners.length - 1].rows
      .map((row) => row.items)
      .flat()
      .filter((e) => e !== "X") as [number];

    const sum = unmarkedValues.reduce((acc, next) => {
      return (acc = acc + next);
    }, 0);

    return sum * this.winningNumber;
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const game = new Bingo(input);
  game.playGame();
  const res = game.getWinnerScore();
  return res;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const game = new Bingo(input);
  game.findLastWinner();
  const res = game.getWinnerScore();
  return res;
};

run({
  part1: {
    tests: [
      {
        input: fakeInput,
        expected: 4512,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [{ input: fakeInput, expected: 1924 }],
    solution: part2,
  },
  trimTestInputs: true,
});
