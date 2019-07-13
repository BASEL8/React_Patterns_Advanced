import React from "react";
import "./App.css";
import ReactPatternsAdvancedOne from "./components/ReactPatternsAdvanced_1";
import ReactPatternAdvancedTwo from "./components/ReactPatternAdvancedTwo";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Patterns Advanced</h1>
      </header>
      <div>
        <hr />
        <hr />
        <ReactPatternsAdvancedOne />
        <hr />
        <hr />
        <ReactPatternAdvancedTwo />
      </div>
    </div>
  );
}

export default App;
