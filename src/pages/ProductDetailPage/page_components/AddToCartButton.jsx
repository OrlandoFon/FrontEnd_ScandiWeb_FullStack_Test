/**
 * AddToCartButton - Dynamic button component for product actions
 * Changes appearance and behavior based on product stock and selected attributes
 * Handles cart addition with proper validation states
 */
import { Component } from "react";
import PropTypes from "prop-types";

/**
 * AddToCartButton Component - Handles product cart interactions
 * @class
 * @extends {Component}
 */
class AddToCartButton extends Component {
  /**
   * Renders button with dynamic state based on product availability
   * @returns {JSX.Element} Button element with conditional styling
   */
  render() {
    const { inStock, allAttributesSelected, onClickAddToCart } = this.props;

    let buttonText = "";
    let buttonColor = "";

    if (!inStock) {
      buttonText = "OUT OF STOCK";
      buttonColor = "red";
    } else if (!allAttributesSelected) {
      buttonText = "SELECT OPTIONS";
      buttonColor = "gray";
    } else {
      buttonText = "ADD TO CART";
      buttonColor = "green";
    }

    return (
      <button
        className="btn btn-success btn-lg mb-4 w-100"
        disabled={!inStock || !allAttributesSelected}
        onClick={onClickAddToCart}
        data-testid="add-to-cart"
        style={{
          border: "none",
          background: buttonColor,
        }}
      >
        {buttonText}
      </button>
    );
  }
}

/**
 * Component PropTypes
 * @property {boolean} inStock - Whether product is in stock
 * @property {boolean} allAttributesSelected - Whether all required attributes are selected
 * @property {Function} onClickAddToCart - Handler for add to cart action
 */
AddToCartButton.propTypes = {
  inStock: PropTypes.bool.isRequired,
  allAttributesSelected: PropTypes.bool.isRequired,
  onClickAddToCart: PropTypes.func.isRequired,
};

export default AddToCartButton;
