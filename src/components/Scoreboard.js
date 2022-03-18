import axios from "axios";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";

const Scoreboard = () => {
  const [scoreboard, SetScoreboard] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/scoreboard").then((response) => {
      SetScoreboard(response.data);
    });
  }, []);

  return (
    <div className="scoreboard">
      <Logo />

      <div className="scores">
        {scoreboard
          .sort((a, b) => b.score - a.score)
          .map((data) => (
            <div className="score" key={data.id}>
              <p>{data.username}</p>
              <p>{data.score + "wpm"}</p>
              <p>{data.date}</p>
            </div>
          ))}
      </div>

      <Navigation />
    </div>
  );
};

export default Scoreboard;
