import React from "react";

const SpeedIndicator = ({ symbols, seconds }) => {
  if (symbols !== 0 && seconds !== 0) {
    const wpm = symbols / 5 / (seconds / 60);

    return <div>{Math.round(wpm)} wpm</div>;
  }
  return null;
};

export default SpeedIndicator;
