import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navigation">
      <ul>
        <NavLink
          to="/test"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>The_Test</li>
        </NavLink>
        <NavLink
          to="/scoreboard"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>The_Scoreboard</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navigation;
