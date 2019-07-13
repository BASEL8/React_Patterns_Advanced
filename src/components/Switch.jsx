import React, { Component } from "react";

export default class Switch extends Component {
  render() {
    const { on, className = "", ...props } = this.props;
    const btnClassName = [
      className,
      "toggle-btn",
      on ? "toggle-btn-on" : "toggle-btn-off"
    ]
      .filter(Boolean)
      .join(" ");
    return (
      <>
        <input
          checked={on}
          type="Radio"
          className="toggle-input"
          onChange={() => {}}
        />
        <button className={btnClassName} {...props} />
      </>
    );
  }
}
