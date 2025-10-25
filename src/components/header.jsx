import React from "react";

const Header = ({
  difficulty,
  onDifficultyChange,
  onReset,
  mineCount,
  remainingCells, // <-- PROP BARU
  timer,
  gameState,
}) => {
  const getEmoji = () => {
    if (gameState === "won") return "↻";
    if (gameState === "lost") return "↻";
    return "↻";
  };

  return (
    <div className="header">
      {/* Grup stat di kiri */}
      <div className="stat-group">
        <div className="stat">
          <span>💣</span>
          <span>{String(mineCount).padStart(3, "0")}</span>
        </div>
        {/* --- STAT BARU: SISA KOTAK --- */}
        <div className="stat">
          <span>📦</span>
          <span>{String(remainingCells).padStart(3, "0")}</span>
        </div>
        {/* ------------------------------ */}
      </div>

      {/* Kontrol di tengah */}
      <div className="controls">
        <button className="reset-button" onClick={onReset}>
          {getEmoji()}
        </button>
        <select value={difficulty} onChange={onDifficultyChange}>
          <option value="newbie">Newbie</option>
          <option value="intermediate">Intermediate</option>
          <option value="pro">Pro</option>
        </select>
      </div>

      {/* Grup stat di kanan */}
      <div className="stat-group">
        <div className="stat">
          <span>⏱️</span>
          <span>{String(timer).padStart(3, "0")}</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Header);
