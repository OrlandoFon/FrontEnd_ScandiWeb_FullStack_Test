/**
 * CategoryButton - Animated navigation button component
 * Handles category selection with letter and underline animations
 * Manages loading states and active category highlighting
 */
import { Component } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

/**
 * CategoryButton Component - Animated category selection button
 * @class
 * @extends {Component}
 */
class CategoryButton extends Component {
  /**
   * Animation variants for underline effect
   * @property {Object} hidden - Hidden state (width: 0)
   * @property {Object} visible - Visible state (width: 100%)
   */
  underlineVariants = {
    hidden: { width: 0 },
    visible: { width: "100%" },
  };

  /**
   * Animation variants for letter colors
   * @property {Object} hidden - Default color state
   * @property {Object} visible - Active color state
   */
  letterVariants = {
    hidden: { color: "#000000" },
    visible: { color: "#5ECE7B" },
  };

  render() {
    const { categoryName, isActive, onClick, isLoading } = this.props;
    const letters = categoryName.split("");
    const hrefPath = `/${categoryName.toLowerCase()}`;

    return (
      <motion.a
        href={hrefPath}
        data-testid={isActive ? "active-category-link" : "category-link"}
        onClick={(e) => {
          e.preventDefault(); // Prevent full page reload
          if (!isLoading && onClick) {
            onClick();
          }
        }}
        className="nav-link category-button"
        style={{
          position: "relative",
          background: "none",
          border: "none",
          padding: 0,
          margin: "0 10px",
          cursor: isLoading ? "not-allowed" : "pointer",
          opacity: isLoading ? 0.5 : 1,
          color: isActive ? "#5ECE7B" : "#000000",
          fontWeight: isActive ? "bold" : "normal",
          fontSize: "16px",
          textDecoration: "none", // ensure no default underline
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <span style={{ display: "inline-flex", overflow: "hidden" }}>
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              variants={this.letterVariants}
              initial="hidden"
              animate={isActive ? "visible" : "hidden"}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
              }}
              style={{ display: "inline-block" }}
            >
              {letter}
            </motion.span>
          ))}
        </span>
        {isActive && (
          <motion.div
            variants={this.underlineVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              position: "absolute",
              bottom: "-2px",
              left: 0,
              height: "2px",
              background: "#5ECE7B",
            }}
          />
        )}
      </motion.a>
    );
  }
}
/**
 * Component PropTypes
 * @property {string} categoryName - Category name to display
 * @property {boolean} isActive - Whether category is currently active
 * @property {Function} onClick - Click handler for category selection
 * @property {boolean} isLoading - Loading state indicator
 */
CategoryButton.propTypes = {
  categoryName: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default CategoryButton;
