import React from "react";

const Cell = ({ data, onClick, onRightClick }) => {
  const { isRevealed, isMine, isFlagged, neighborCount, row, col } = data;

  const handleClick = () => {
    onClick(row, col);
  };

  const handleRightClick = (e) => {
    onRightClick(e, row, col);
  };

  const getCellContent = () => {
    if (!isRevealed) {
      return isFlagged ? "🚩" : null;
    }
    if (isMine) {
      return "💣";
    }
    if (neighborCount > 0) {
      return neighborCount;
    }
    return null;
  };

  // Tentukan kelas CSS berdasarkan state sel
  let className = "cell";
  if (isRevealed) {
    className += " revealed";
    if (isMine) {
      className += " mine";
    } else if (neighborCount > 0) {
      className += ` n${neighborCount}`;
    }
  } else if (isFlagged) {
    className += " flagged";
  }

  return (
    <div
      className={className}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {getCellContent()}
    </div>
  );
};

export default React.memo(Cell);
