import React from "react";
import Cell from "./cell";

const Board = ({ board, onCellClick, onCellRightClick, gameState }) => {
  // Gunakan CSS variable untuk mengatur ukuran grid secara dinamis
  const boardStyle = {
    gridTemplateRows: `repeat(${board.length}, 1fr)`,
    gridTemplateColumns: `repeat(${board[0].length}, 1fr)`,
  };

  // Tambahkan kelas 'game-over' untuk menonaktifkan interaksi
  const boardClassName = `board ${gameState !== "playing" ? "game-over" : ""}`;

  return (
    <div className={boardClassName} style={boardStyle}>
      {board.map((row, r) =>
        row.map((cellData, c) => (
          <Cell
            key={`${r}-${c}`}
            data={cellData}
            onClick={onCellClick}
            onRightClick={onCellRightClick}
          />
        ))
      )}
    </div>
  );
};

export default React.memo(Board);
