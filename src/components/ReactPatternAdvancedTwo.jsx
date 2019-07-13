import React, { Component } from "react";
import Switch from "./Switch";

class Toggle extends Component {
  state = {
    on: true
  };
  toggle = () => this.setState(({ on }) => ({ on: !on }));
  render() {
    return this.props.children({ on: this.state.on, toggle: this.toggle });
  }
}

class ToggleB extends Component {
  state = {
    on: true
  };
  toggle = () => this.setState(({ on }) => ({ on: !on }));
  render() {
    return this.tsPropertySignature.children();
  }
}

export default class ReactPatternAdvancedTwo extends Component {
  render() {
    return (
      <>
        <h1>Pattern 2-A</h1>
        <Toggle>
          {({ on, toggle }) => (
            <>
              <div>{on ? "On" : "Off"}</div>
              <Switch on={on} onClick={toggle} />
              <div style={{ padding: 10 }}>
                <button
                  style={{ padding: "10px 20px", borderRadius: 10 }}
                  aria-label="custom-button"
                  onClick={toggle}
                >
                  {on ? "On" : "Off"}
                </button>
              </div>
            </>
          )}
        </Toggle>
        <hr />
      </>
    );
  }
}
