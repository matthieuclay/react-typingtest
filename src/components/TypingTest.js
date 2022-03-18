import React, { useEffect, useState } from "react";
import axios from "axios";
import Preview from "./Preview";
import SpeedIndicator from "./SpeedIndicator";
import Navigation from "./Navigation";
import Logo from "./Logo";

const BASE_URL = "https://type.fit/api/quotes";
const DB_URL = "http://localhost:3001/scoreboard";

const TypingTest = () => {
  const [userInput, setUserInput] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [symbols, setSymbols] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [intervalSeconds, setIntervalSeconds] = useState(0);
  const [texts, setTexts] = useState([]);
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(BASE_URL);
      let key = Math.floor(Math.random() * response.data.length);
      setTexts(response.data);

      if (response.data[key].text.length < 100) {
        getData();
        return;
      }

      setText(response.data[key].text);
    };

    getData();
  }, []);

  const getText = () => {
    const randomKey = Math.floor(Math.random() * texts.length);

    if (texts[randomKey].text.length < 100) {
      getText();
      return;
    }

    if (text === texts[randomKey].text) {
      getText();
      return;
    }

    setText(texts[randomKey].text);
  };

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

  const onFinish = async (userInput) => {
    if (userInput === text) {
      setScore();
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

  const setScore = () => {
    const wpm = symbols / 5 / (seconds / 60);
    let data = {
      score: wpm,
      username: username,
      date: new Date(),
    };
    axios.post(DB_URL, data).then(console.log(data));
  };

  return (
    <div className="typing-test">
      <Logo />
      <Preview text={text} userInput={userInput} />
      <textarea
        value={userInput}
        onChange={(e) => onUserInputChange(e.target.value)}
        placeholder="Start typing..."
        readOnly={isFinished}
      ></textarea>
      <SpeedIndicator symbols={symbols} seconds={seconds} />
      {isStarted && <button onClick={onRestart}>Restart</button>}
      <Navigation />
    </div>
  );
};

export default TypingTest;
