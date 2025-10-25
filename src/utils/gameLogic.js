// Definisikan tingkat kesulitan
export const DIFFICULTY_SETTINGS = {
  newbie: { rows: 10, cols: 15, mines: 10 },
  intermediate: { rows: 15, cols: 15, mines: 25 },
  pro: { rows: 15, cols: 30, mines: 50 },
};

// Fungsi untuk membuat sel individual
const createCell = (row, col) => ({
  row,
  col,
  isMine: false,
  isRevealed: false,
  isFlagged: false,
  neighborCount: 0,
});

// Fungsi utama untuk membuat papan
export const createBoard = (rows, cols, mines) => {
  // 1. Buat grid kosong
  let board = [];
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < cols; c++) {
      row.push(createCell(r, c));
    }
    board.push(row);
  }

  // 2. Tanam ranjau secara acak
  let minesPlaced = 0;
  while (minesPlaced < mines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (!board[row][col].isMine) {
      board[row][col].isMine = true;
      minesPlaced++;
    }
  }

  // 3. Hitung tetangga (neighborCount)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].isMine) continue;

      let count = 0;
      getNeighbors(board, r, c).forEach((neighbor) => {
        if (neighbor.isMine) {
          count++;
        }
      });
      board[r][c].neighborCount = count;
    }
  }

  return board;
};

// Helper untuk mendapatkan 8 tetangga
export const getNeighbors = (board, row, col) => {
  const neighbors = [];
  const rows = board.length;
  const cols = board[0].length;

  for (let r_offset = -1; r_offset <= 1; r_offset++) {
    for (let c_offset = -1; c_offset <= 1; c_offset++) {
      if (r_offset === 0 && c_offset === 0) continue;

      const nr = row + r_offset;
      const nc = col + c_offset;

      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        neighbors.push(board[nr][nc]);
      }
    }
  }
  return neighbors;
};

// Logika untuk mengungkap sel (termasuk "flood fill" rekursif)
export const revealCell = (board, row, col) => {
  const cell = board[row][col];
  if (cell.isRevealed || cell.isFlagged) return board;

  cell.isRevealed = true;

  // Jika sel adalah '0', ungkap semua tetangganya secara rekursif
  if (cell.neighborCount === 0 && !cell.isMine) {
    getNeighbors(board, row, col).forEach((neighbor) => {
      if (!neighbor.isRevealed) {
        revealCell(board, neighbor.row, neighbor.col);
      }
    });
  }

  return board;
};

// Cek kondisi menang
export const checkWinCondition = (board, settings) => {
  let revealedNonMines = 0;
  const totalNonMines = settings.rows * settings.cols - settings.mines;

  for (let r = 0; r < settings.rows; r++) {
    for (let c = 0; c < settings.cols; c++) {
      if (board[r][c].isRevealed && !board[r][c].isMine) {
        revealedNonMines++;
      }
    }
  }
  return revealedNonMines === totalNonMines;
};
