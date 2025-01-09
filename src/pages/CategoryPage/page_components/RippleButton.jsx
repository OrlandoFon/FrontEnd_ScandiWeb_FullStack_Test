/**
 * RippleButton - Animated button component with ripple effect
 * Creates visual feedback on click with expanding circles
 * Uses CSS animations for smooth transitions
 */
import { Component } from "react";
import PropTypes from "prop-types";
import "./RippleButton.css";

/**
 * RippleButton Component - Button with ripple animation effect
 * @class
 * @extends {Component}
 */
class RippleButton extends Component {
  /**
   * Component PropTypes
   * @property {Function} onClick - Click event handler
   * @property {node} children - Button content
   */
  static propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node,
  };

  /**
   * @state
   * @property {Array} ripples - Array of active ripple effects
   */
  state = {
    ripples: [],
  };

  /**
   * Creates new ripple effect on click
   * @param {Event} event - Click event object
   */
  createRipple = (event) => {
    const button = event.currentTarget.getBoundingClientRect();
    const diameter = Math.max(button.width, button.height);

    const newRipple = {
      x: event.clientX - button.left - diameter / 2,
      y: event.clientY - button.top - diameter / 2,
      size: diameter,
      id: Date.now(),
    };

    this.setState((prevState) => ({
      ripples: [...prevState.ripples, newRipple],
    }));

    if (this.props.onClick) {
      this.props.onClick(event);
    }

    setTimeout(() => {
      this.setState((prevState) => ({
        ripples: prevState.ripples.filter((r) => r.id !== newRipple.id),
      }));
    }, 600);
  };

  render() {
    return (
      <button
        className="rounded-circle quick-shop-btn"
        onClick={this.createRipple}
        style={{
          background: "#5ECE7B",
          border: "none",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        {this.props.children}
        {this.state.ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="ripple"
            style={{
              left: `${ripple.x}px`,
              top: `${ripple.y}px`,
              width: `${ripple.size}px`,
              height: `${ripple.size}px`,
            }}
          />
        ))}
      </button>
    );
  }
}

export default RippleButton;
