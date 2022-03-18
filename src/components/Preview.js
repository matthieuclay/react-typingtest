import React from "react";

const Preview = ({ text, userInput }) => {
  return (
    <div>
      {text.split("").map((symbol, index) => {
        let color;
        if (index < userInput.split("").length) {
          color = symbol === userInput[index] ? "#dfffa0" : "#fcbea4";
        }
        return (
          <span key={index} style={{ backgroundColor: color }}>
            {symbol}
          </span>
        );
      })}
    </div>
  );
};

export default Preview;
