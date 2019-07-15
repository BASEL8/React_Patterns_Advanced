import React, { Component } from "react";
import Switch from "./Switch";
class Toggle extends Component {
  static On = ({ on, children }) => (on ? children : null);
  static Off = ({ on, children }) => (on ? null : children);
  static Button = ({ on, toggle }) => <Switch on={on} onClick={toggle} />;
  state = {
    on: true
  };
  toggle = () => this.setState(({ on }) => ({ on: !on }));
  render() {
    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        on: this.state.on,
        toggle: this.toggle
      });
    });
  }
}
const MainContext = React.createContext({ on: true, toggle: () => {} });
class ToggleB extends Component {
  static On = ({ children }) => (
    <MainContext.Consumer>
      {({ on }) => (on ? children : null)}
    </MainContext.Consumer>
  );

  static Off = ({ children }) => (
    <MainContext.Consumer>
      {({ on }) => (on ? null : children)}
    </MainContext.Consumer>
  );
  static Button = () => (
    <MainContext.Consumer>
      {({ on, toggle }) => <Switch on={on} onClick={toggle} />}
    </MainContext.Consumer>
  );
  state = {
    on: true
  };
  toggle = () => this.setState(({ on }) => ({ on: !on }));
  render() {
    return (
      <MainContext.Provider value={{ on: this.state.on, toggle: this.toggle }}>
        {this.props.children}
      </MainContext.Provider>
    );
  }
}
export default class ReactPatternsAdvancedOne extends Component {
  render() {
    return (
      <>
        <h1>Pattern 1-A</h1>
        <Toggle>
          <Toggle.On>
            <div>On</div>
          </Toggle.On>
          <Toggle.Off>
            <div>Off</div>
          </Toggle.Off>
          <Toggle.Button />
        </Toggle>
        <hr />
        <h1>Pattern 1-B</h1>
        <ToggleB>
          <div>
            <ToggleB.On>
              <div>On</div>
            </ToggleB.On>
          </div>
          <div>
            <ToggleB.Off>
              <div>Off</div>
            </ToggleB.Off>
          </div>
          <div>
            <ToggleB.Button />
          </div>
        </ToggleB>
      </>
    );
  }
}
