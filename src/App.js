import React from "react";
import "./App.css";
import ReactPatternsAdvancedOne from "./components/ReactPatternsAdvancedOne";
import ReactPatternAdvancedTwo from "./components/ReactPatternAdvancedTwo";
import ReactPatternAdvancedThree from "./components/ReactPatternAdvancedThree";

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
        <hr />
        <hr />
        <ReactPatternAdvancedThree />
      </div>
    </div>
  );
}

export default App;
