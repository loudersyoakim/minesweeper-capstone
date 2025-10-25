import React, { useState, useEffect, useMemo } from "react";
import Header from "./components/header";
import Board from "./components/board";
import WinPopup from "./components/winpopup"; 
import HighScores from "./components/highscores"; // <-- IMPORT BARU
import {
  createBoard,
  revealCell,
  getNeighbors,
  checkWinCondition,
  DIFFICULTY_SETTINGS,
} from "./utils/gameLogic";
import { useTimer } from "./hooks/useTimer.js";

// --- FUNGSI BARU: SIMPAN HIGH SCORE ---
const saveHighScore = (difficulty, time) => {
  if (time === 0) return; // Jangan simpan jika waktu 0
  try {
    const key = "minesweeperHighScores";
    // Ambil semua skor yang ada
    const scores = JSON.parse(localStorage.getItem(key)) || [];
    // Tambahkan skor baru sebagai log
    scores.push({ difficulty, time, date: new Date().toISOString() });
    // Simpan kembali ke localStorage
    localStorage.setItem(key, JSON.stringify(scores));
  } catch (error) {
    console.error("Gagal menyimpan high score:", error);
  }
};
// ------------------------------------

const App = () => {
  const [difficulty, setDifficulty] = useState("newbie");
  const [settings, setSettings] = useState(DIFFICULTY_SETTINGS.newbie);
  const [board, setBoard] = useState(() =>
    createBoard(settings.rows, settings.cols, settings.mines)
  );
  const [gameState, setGameState] = useState("playing"); // 'playing', 'won', 'lost'
  const [flagCount, setFlagCount] = useState(0);

  const isGameRunning = gameState === "playing";
  const { seconds, resetTimer } = useTimer(isGameRunning);

  // Efek untuk memulai game baru ketika difficulty berubah
  useEffect(() => {
    const newSettings = DIFFICULTY_SETTINGS[difficulty];
    setSettings(newSettings);
    resetGame(newSettings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  // Efek untuk cek kemenangan setiap kali papan berubah
  useEffect(() => {
    if (gameState !== "playing") return;

    if (checkWinCondition(board, settings)) {
      setGameState("won");
      // --- PANGGIL FUNGSI SIMPAN SKOR SAAT MENANG ---
      saveHighScore(difficulty, seconds);
    }
    // Tambahkan dependency 'difficulty' dan 'seconds'
  }, [board, settings, gameState, difficulty, seconds]);

  const resetGame = (currentSettings = settings) => {
    setBoard(
      createBoard(
        currentSettings.rows,
        currentSettings.cols,
        currentSettings.mines
      )
    );
    setGameState("playing");
    setFlagCount(0);
    resetTimer();
  };

  const handleCellClick = (row, col) => {
    if (gameState !== "playing") return;

    const cell = board[row][col];
    if (cell.isFlagged || cell.isRevealed) return;

    // Game Over jika kena ranjau
    if (cell.isMine) {
      setGameState("lost");
      // Ungkap semua ranjau
      const newBoard = board.map((r) =>
        r.map((c) => (c.isMine ? { ...c, isRevealed: true } : c))
      );
      setBoard(newBoard);
      return;
    }

    // Buat salinan board baru untuk update state
    let newBoard = board.map((row) => [...row].map((cell) => ({ ...cell })));
    revealCell(newBoard, row, col); // Mutasi salinan, bukan state asli
    setBoard(newBoard);
  };

  const handleCellRightClick = (e, row, col) => {
    e.preventDefault(); // Mencegah menu konteks
    if (gameState !== "playing") return;

    const cell = board[row][col];
    if (cell.isRevealed) return;

    let newFlagCount = flagCount;
    if (cell.isFlagged) {
      newFlagCount--;
    } else {
      newFlagCount++;
    }

    const newBoard = [...board];
    newBoard[row][col] = { ...cell, isFlagged: !cell.isFlagged };
    setBoard(newBoard);
    setFlagCount(newFlagCount);
  };

  // --- LOGIKA BARU: HITUNG SISA KOTAK ---
  const revealedNonMinesCount = useMemo(() => {
    let count = 0;
    if (!board) return 0;
    for (let r = 0; r < settings.rows; r++) {
      for (let c = 0; c < settings.cols; c++) {
        if (board[r] && board[r][c] && board[r][c].isRevealed && !board[r][c].isMine) {
          count++;
        }
      }
    }
    return count;
  }, [board, settings.rows, settings.cols]);

  const totalNonMines = settings.rows * settings.cols - settings.mines;
  const remainingSafeCells = totalNonMines - revealedNonMinesCount;
  // ----------------------------------------

  return (
    <div className="game-container">
      <Header
        difficulty={difficulty}
        onDifficultyChange={(e) => setDifficulty(e.target.value)}
        onReset={() => resetGame(settings)}
        mineCount={settings.mines - flagCount}
        remainingCells={remainingSafeCells} // <-- PROP BARU
        timer={seconds}
        gameState={gameState}
      />
      <Board
        board={board}
        onCellClick={handleCellClick}
        onCellRightClick={handleCellRightClick}
        gameState={gameState}
      />
      {/* --- KOMPONEN BARU: HIGH SCORE --- */}
      <HighScores currentDifficulty={difficulty} />
      {/* ---------------------------------- */}

      {/* --- KOMPONEN BARU: POPUP MENANG --- */}
      {gameState === "won" && <WinPopup />}
      {/* ------------------------------------- */}
    </div>
  );
};

export default App;
