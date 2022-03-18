import React from "react";
import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    <div className="logo">
      {/* Les images importées depuis la balise img sont accessibles dans "public" */}
      {/* On saisit le chemin comme si on était dans "public" */}
      <NavLink to="/">
        <img src="./assets/img/spacebar.svg" alt="logo" />
        <h1>The_Typing_Test</h1>
      </NavLink>
    </div>
  );
};

export default Logo;
