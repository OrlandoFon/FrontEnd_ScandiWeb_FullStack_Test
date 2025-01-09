/**
 * CategoryTitle - Displays current category name as page heading
 * Handles formatting and conditional rendering of category text
 * Shows "PRODUCTS" for "all" category, otherwise shows uppercase category name
 */
import { Component } from "react";
import PropTypes from "prop-types";

/**
 * CategoryTitle Component - Renders page heading based on active category
 * @class
 * @extends {Component}
 */
class CategoryTitle extends Component {
  render() {
    const { activeCategory } = this.props;
    return (
      <h1 className="display-6 mb-4">
        {activeCategory === "all" ? "PRODUCTS" : activeCategory.toUpperCase()}
      </h1>
    );
  }
}

/**
 * Component PropTypes
 * @property {string} activeCategory - Currently selected category name
 */
CategoryTitle.propTypes = {
  activeCategory: PropTypes.string.isRequired,
};

export default CategoryTitle;
