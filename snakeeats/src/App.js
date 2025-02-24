import React from "react";
import "./App.css";
import Game, { changeDirection } from "./components/Game";

function App() {
  return (
    <div className="App">
      <Game />
      <div className="controls">
        <div className="control-row">
          <button onClick={() => changeDirection("up")}>Up</button>
        </div>
        <div className="mid-control-row">
          <button onClick={() => changeDirection("left")}>Left</button>
          <button onClick={() => changeDirection("right")}>Right</button>
        </div>
        <div className="control-row">
          <button onClick={() => changeDirection("down")}>Down</button>
        </div>
      </div>
    </div>
  );
}

export default App;
