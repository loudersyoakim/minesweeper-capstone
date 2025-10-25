import React, { useState, useEffect } from "react";
import "./highscores.css";

const HighScores = ({ currentDifficulty }) => {
  const [topScores, setTopScores] = useState([]);

  useEffect(() => {
    try {
      const key = "minesweeperHighScores";
      const allScores = JSON.parse(localStorage.getItem(key)) || [];

      // 1. Filter berdasarkan difficulty saat ini
      const relevantScores = allScores.filter(
        (score) => score.difficulty === currentDifficulty
      );

      // 2. Sort berdasarkan waktu (tercepat)
      relevantScores.sort((a, b) => a.time - b.time);

      // 3. Ambil Top 5
      setTopScores(relevantScores.slice(0, 5));
    } catch (error) {
      console.error("Gagal memuat high score:", error);
      setTopScores([]);
    }
    // Update list setiap kali difficulty berubah
  }, [currentDifficulty]);

  if (topScores.length === 0) {
    return (
      <div className="high-scores">
        <h4>Top 5 ({currentDifficulty})</h4>
        <p>Belum ada skor.</p>
      </div>
    );
  }

  return (
    <div className="high-scores">
      <h4>Top 5 ({currentDifficulty})</h4>
      <ol>
        {topScores.map((score, index) => (
          <li key={index}>
            <span>{score.time} detik</span>
            <span className="score-date">
              {new Date(score.date).toLocaleDateString("id-ID")}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default HighScores;
