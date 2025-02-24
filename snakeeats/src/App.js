import './App.css';
import { changeDirection } from './components/game.js';
function App() {
  return (
    <div className="App">
      <div className="controls">
        <div className="control-row">
          <button onClick={() => changeDirection('up')}>Up</button>
        </div>
        <div className="mid-control-row">
          <button onClick={() => changeDirection('left')}>Left</button>
          <button onClick={() => changeDirection('right')}>Right</button>
        </div>
        <div className="control-row">
          <button onClick={() => changeDirection('down')}>Down</button>
        </div>
      </div>
    </div>
  );
}

export default App;
