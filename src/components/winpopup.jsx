import React from "react";
import "./WinPopup.css";

const WinPopup = () => {
  return (
    <div className="popup-overlay">
      <div className="win-popup">
        <h2>Selamat!</h2>
        <p>🏆 Anda Menang! 🏆</p>
      </div>
    </div>
  );
};

export default WinPopup;
