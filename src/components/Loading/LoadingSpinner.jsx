/**
 * LoadingSpinner - Full-screen loading indicator component
 * Displays animated oval spinner with fixed positioning
 * Uses react-loader-spinner for smooth animation
 */
import { Component } from "react";
import { Oval } from "react-loader-spinner";

/**
 * LoadingSpinner Component - Displays loading animation
 * @class
 * @extends {Component}
 */
class LoadingSpinner extends Component {
  render() {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9998,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <Oval
          type="Oval"
          color="#7c7f7c"
          secondaryColor="#4CAF50"
          height={80}
          width={80}
          strokeWidth="5"
          strokeWidthSecondary="5"
        />
      </div>
    );
  }
}

export default LoadingSpinner;
