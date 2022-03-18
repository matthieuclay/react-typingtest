import React, { useEffect, useState } from "react";
import axios from "axios";
import Preview from "./Preview";
import SpeedIndicator from "./SpeedIndicator";

const BASE_URL = "https://type.fit/api/quotes";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [symbols, setSymbols] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [intervalSeconds, setIntervalSeconds] = useState(0);
  const [texts, setTexts] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios.get(BASE_URL).then((response) => {
      setTexts(response.data);
      setText(
        response.data[Math.floor(Math.random() * response.data.length)].text
      );
    });
  }, []);

  function getText() {
    const randomKey = Math.floor(Math.random() * texts.length);

    if (text === texts[randomKey].text) {
      getText();
      return;
    }

    setText(texts[randomKey].text);
  }

  const onRestart = () => {
    getText();
    setUserInput("");
    setSeconds(0);
    setSymbols(0);
    setIsStarted(false);
    setIsFinished(false);
    setIntervalSeconds(0);
    clearInterval(intervalSeconds);
  };

  const onFinish = (userInput) => {
    if (userInput === text) {
      clearInterval(intervalSeconds);
      setIsFinished(!isFinished);
    }
  };

  const onUserInputChange = (e) => {
    setTimer();
    onFinish(e);
    setUserInput(e);
    setSymbols(countCorrectSymbols(e));
  };

  const countCorrectSymbols = (userInput) => {
    const newText = text.replace(" ", "");
    return userInput
      .replace(" ", "")
      .split("")
      .filter((symbol, i) => symbol === newText[i]).length;
  };

  const setTimer = () => {
    if (!isStarted) {
      setIsStarted(!isStarted);
      setIntervalSeconds(
        setInterval(() => {
          setSeconds((prev) => prev + 1);
        }, 1000)
      );
    }
  };

  return (
    <div className="App">
      <Preview text={text} userInput={userInput} />
      <textarea
        value={userInput}
        onChange={(e) => onUserInputChange(e.target.value)}
        placeholder="Start typing..."
        readOnly={isFinished}
      ></textarea>
      <SpeedIndicator symbols={symbols} seconds={seconds} />
      <button onClick={onRestart}>Restart</button>
    </div>
  );
};

export default App;
