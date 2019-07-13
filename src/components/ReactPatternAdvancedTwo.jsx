import React, { Component } from "react";
import Switch from "./Switch";
const CallAll = (...fns) => (...args) =>
  fns.forEach((fn) => {
    fn && fn(args);
  });

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
  getStateAndHelpers = () => {
    return {
      on: this.state.on,
      toggle: this.toggle,
      togglerProps: {
        onClick: this.toggle,
        "aria-expanded": this.state.on
      }
    };
  };
  render() {
    return this.props.children(this.getStateAndHelpers());
  }
}

class ToggleC extends Component {
  state = {
    on: true
  };
  toggle = () => this.setState(({ on }) => ({ on: !on }));
  getStateAndHelpers = () => {
    return {
      on: this.state.on,
      getTogglerProps: ({ onClick, ...props }) => {
        return {
          onClick: CallAll(this.toggle, onClick),
          ...props
        };
      }
    };
  };
  render() {
    return this.props.children(this.getStateAndHelpers());
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
        <h1>Pattern 2-B</h1>
        <ToggleB>
          {({ on, togglerProps }) => (
            <>
              <div>{on ? "On" : "Off"}</div>
              <Switch on={on} {...togglerProps} />
              <div style={{ padding: 10 }}>
                <button
                  style={{ padding: "10px 20px", borderRadius: 10 }}
                  {...togglerProps}
                >
                  {on ? "On" : "Off"}
                </button>
              </div>
            </>
          )}
        </ToggleB>
        <hr />
        <h1>Pattern 2-C</h1>
        <ToggleC>
          {({ on, getTogglerProps }) => (
            <>
              <div>{on ? "On" : "Off"}</div>
              <Switch {...getTogglerProps({ on })} />
              <div style={{ padding: 10 }}>
                <button
                  {...getTogglerProps({
                    onClick: () => alert(on)
                  })}
                  style={{ padding: "10px 20px", borderRadius: 10 }}
                >
                  {on ? "On" : "Off"}
                </button>
              </div>
            </>
          )}
        </ToggleC>
        <hr />
      </>
    );
  }
}
