const generate = document.getElementById("generate");
const solve = document.getElementById("solve");
const clear = document.getElementById("clear");
const cells = [];

const createPuzzle = () => {
  return [
    [4, 0, 0, 7, 5, 0, 8, 0, 2],
    [9, 3, 0, 0, 2, 0, 0, 6, 0],
    [8, 7, 0, 0, 0, 1, 4, 0, 0],
    [5, 9, 0, 6, 0, 0, 0, 7, 0],
    [0, 0, 6, 3, 0, 4, 2, 0, 0],
    [0, 8, 0, 0, 0, 5, 0, 1, 3],
    [0, 0, 7, 9, 0, 0, 0, 4, 1],
    [0, 6, 0, 0, 3, 0, 0, 2, 9],
    [3, 0, 5, 0, 4, 7, 0, 0, 0],
  ];
};

const sudokuGUI = () => {
  const table = document.getElementById("sudoku__gui");

  for (let c = 0; c < 9; c++) {
    const row = document.createElement("tr");

    for (let r = 0; r < 9; r++) {
      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = 1;
      input.row = r;
      input.column = c;
      input.square = squareNumber(r, c);
      input.onkeydown = validate;

      const cell = document.createElement("td");
      cell.appendChild(input);

      row.appendChild(cell);
      cells.push(input);
    }
    table.appendChild(row);
  }
};

const validate = (e) => {
  const key = e.key;
  if (!/[0-9]/.test(key)) {
    e.preventDefault();
  }
};

const squareNumber = (row, column) => {
  if (row < 3 && column < 3) return 0;
  if (row > 2 && row < 6 && column < 3) return 1;
  if (row > 5 && column < 3) return 2;
  if (row < 3 && column > 2 && column < 6) return 3;
  if (row > 2 && row < 6 && column > 2 && column < 6) return 4;
  if (row > 5 && column > 2 && column < 6) return 5;
  if (row < 3 && column > 5) return 6;
  if (row > 2 && row < 6 && column > 5) return 7;
  if (row > 5 && column > 5) return 8;
};

const validCheck = (cell, value) => {
  for (let i = 0; i < cells.length; i++) {
    if (
      (cells[i].row == cell.row ||
        cells[i].column == cell.column ||
        cells[i].square == cell.square) &&
      cells[i].value == value
    ) {
      return false;
    }
  }
  return true;
};

const generateSudoku = () => {
  clearSudoku();
  for (cell of cells) {
    cell.a = 1;
  }

  solveSudoku(true);

  for (cell of cells) {
    if (Math.floor(Math.random() * 3) == 0) {
      cell.value = "";
    }
  }

  for (cell of cells) {
    if (cell.value > 0) {
      cell.a = 0;
    }
  }
};

const loadSudoku = () => {
  let i = 0,
    sudoku = createPuzzle();
  for (let c = 0; c < 9; c++) {
    for (let r = 0; r < 9; r++) {
      if (sudoku[c][r] != 0) {
        cells[i].value = sudoku[c][r];
      } else {
        cells[i].a = 1;
      }
      i++;
    }
  }
};

const solveSudoku = (random_row) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let i = 0;
  let n = 0;
  let m = 1;

  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  while (true) {
    if (i < 9 && random_row) {
      let random_value = nums[Math.floor(Math.random() * nums.length)];
      nums.splice(nums.indexOf(random_value), 1);
      cells[i].value = random_value;
      i++;
    } else if (cells[i].a == 1) {
      if (validCheck(cells[i], numbers[n])) {
        cells[i].value = numbers[n];
        i++;
        n = 0;
        m = 1;
      } else {
        if (n == 8) {
          cells[i].value = 0;
          i--;
          m = 0;
          if (cells[i].value == 9) {
            i--;
          }
          n = cells[i].value;
        } else {
          n++;
        }
      }
    } else {
      if (m) {
        i++;
      } else {
        i--;
      }
    }
    if (i == 81) {
      break;
    }
  }
};

const clearSudoku = () => {
  cells.forEach((cell) => {
    cell.value = "";
    cell.a = 0;
  });
};

sudokuGUI();
generate.addEventListener("click", generateSudoku);
solve.addEventListener("click", () => solveSudoku(false));
clear.addEventListener("click", clearSudoku);
