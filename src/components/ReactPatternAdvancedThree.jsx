import React, { Component } from "react";
import Switch from "./Switch";
const CallAll = (...fns) => (...args) => fns.forEach((fn) => fn && fn(args));
class Toggle extends Component {
  static defaultProps = {
    on: false,
    reset: () => {}
  };
  initialState = { on: this.props.initialOn };
  state = this.initialState;

  reset = () =>
    this.state(this.initialState, () => this.props.onReset(this.state.on));
  toggle = () =>
    this.state(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    );
  getStateAndHelpers = () => {
    return {
      on: this.state.on,
      reset: this.reset,
      getTogglerProps: ({ onClick, ...props }) => {
        return {
          onClick: CallAll(this.toggle, onClick),
          ...props
        };
      }
    };
  };
  render() {
    console.log(this.state);
    return this.props.children(this.getStateAndHelpers());
  }
}
class ToggleB extends Component {
  static defaultProps = {
    on: false,
    reset: () => {}
  };
  initialState = { on: this.props.on };
  state = this.initialState;
  internalSetState = (changes, callbacks) => {
    this.setState((currentState) => {
      const changedObject =
        typeof changes === "function" ? changes(currentState) : changes;
      const reducedChanged = this.props.stateReducer(
        currentState,
        changedObject
      );
      return Object.keys(reducedChanged).length ? reducedChanged : null;
    }, callbacks);
  };
  toggle = () =>
    this.internalSetState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    );
  reset = () =>
    this.internalSetState(this.initialState, () =>
      this.props.onReset(this.state.on)
    );
  getStateAndHelpers = () => {
    return {
      on: this.state.on,
      reset: this.reset,
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
class ReactPatternAdvancedThree extends Component {
  static defaultProps = {
    initialOn: false,
    onToggle: (...args) => console.log("onToggle", ...args),
    onReset: (...args) => console.log("onReset", ...args)
  };
  initialState = {
    timesClicked: 0
  };
  state = this.initialState;
  handleToggle = (...args) =>
    this.setState(
      ({ timesClicked }) => ({ timesClicked: timesClicked + 1 }),
      () => this.props.onToggle(...args)
    );
  handleReset = (...args) =>
    this.setState(this.initialState, () => this.props.onReset(...args));
  toggleStateReducer = (state, changes) => {
    if (this.state.timesClicked >= 4) {
      return { ...changes, on: false };
    }
    return changes;
  };
  render() {
    const { timesClicked } = this.state;
    console.log(this.state);
    return (
      <div>
        <h1>Pattern 3-A</h1>
        <Toggle
          initialOn={this.props.initialOn}
          onToggle={this.props.onToggle}
          onReset={this.props.onReset}
        >
          {({ on, getTogglerProps, reset }) => (
            <>
              <div>{on ? "On" : "Off"}</div>
              <Switch {...getTogglerProps({ on })} />
              <div style={{ padding: 10 }}>
                <button
                  style={{ padding: "10px 20px", borderRadius: 10 }}
                  onClick={reset}
                >
                  Reset
                </button>
              </div>
            </>
          )}
        </Toggle>
        <hr />
        <h1>PAttern 3-B</h1>
        <ToggleB
          stateReducer={this.toggleStateReducer}
          onToggle={this.handleToggle}
          onReset={this.handleReset}
        >
          {({ on, getTogglerProps, reset }) => (
            <>
              <div>{on ? "On" : "Off"}</div>
              <Switch {...getTogglerProps({ on })} />
              <div>
                {timesClicked <= 4 ? timesClicked : "clicked more than 4 times"}
              </div>
              <div style={{ padding: 10 }}>
                <button
                  style={{ padding: "10px 20px", borderRadius: 10 }}
                  onClick={reset}
                >
                  Reset
                </button>
              </div>
            </>
          )}
        </ToggleB>
      </div>
    );
  }
}
export default ReactPatternAdvancedThree;
