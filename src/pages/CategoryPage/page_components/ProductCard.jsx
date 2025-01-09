/**
 * ProductCard - Individual product display component
 * Handles hover animations and quick shop functionality
 * Shows product details with stock status and price
 */
import { Component } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import RippleButton from "./RippleButton";
import cartIcon from "../../../assets/cart.png";

/**
 * ProductCard Component - Displays product information in card format
 * @class
 * @extends {Component}
 */
class ProductCard extends Component {
  /**
   * @state
   * @property {boolean} isHovered - Tracks mouse hover state
   */
  state = {
    isHovered: false,
  };

  /**
   * Animation variants for quick shop button
   * @property {Object} hidden - Hidden state properties
   * @property {Object} visible - Visible state properties
   */
  buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  /**
   * Sets hover state to true
   * @method
   */
  handleHoverStart = () => this.setState({ isHovered: true });
  /**
   * Sets hover state to false
   * @method
   */
  handleHoverEnd = () => this.setState({ isHovered: false });

  /**
   * Converts string to kebab case for testing IDs
   * @param {string} str - String to convert
   * @returns {string} Kebab case string
   */
  toKebabCase = (str) => str.toLowerCase().replace(/\s+/g, "-");

  render() {
    const { product, onQuickShop, onClick } = this.props;
    const { isHovered } = this.state;
    const productNameKebab = this.toKebabCase(product.name);

    return (
      <motion.div
        className="card h-100 shadow-sm"
        data-testid={`product-${productNameKebab}`}
        whileHover={
          product.inStock
            ? {
                y: -5,
                border: "1px solid black",
                cursor: isHovered ? "pointer" : "default",
              }
            : {}
        }
        transition={{ duration: 0.2 }}
        onClick={onClick}
        onHoverStart={this.handleHoverStart}
        onHoverEnd={this.handleHoverEnd}
      >
        <div className="position-relative">
          <img
            src={product.gallery[0]}
            className="card-img-top"
            alt={product.name}
            style={{ height: "200px", objectFit: "cover" }}
          />
          {!product.inStock && (
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-white bg-opacity-75">
              <span
                className="position-absolute top-50 start-50 translate-middle 
                         fw-bold text-muted text-uppercase p-2 rounded-2"
                style={{
                  fontFamily: "Helvetica, sans-serif",
                  fontSize: "24px",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  boxShadow: "0 0px 5px rgba(255, 255, 255, 0.9)",
                  border: "2px solid #8d8f9a",
                }}
              >
                OUT OF STOCK
              </span>
            </div>
          )}
          {product.inStock && (
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="position-absolute"
                  style={{
                    right: "20px",
                    bottom: "-20px",
                    zIndex: 3,
                  }}
                  variants={this.buttonVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.2 }}
                >
                  <RippleButton onClick={(e) => onQuickShop(e, product)}>
                    <img
                      src={cartIcon}
                      alt="Quick shop"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </RippleButton>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">
            {product.price.currency.symbol}
            {product.price.amount}
          </p>
        </div>
      </motion.div>
    );
  }
}

/**
 * Component PropTypes
 * @property {Object} product - Product information
 * @property {string[]} product.gallery - Product images URLs
 * @property {string} product.name - Product name
 * @property {boolean} product.inStock - Product stock status
 * @property {Object} product.price - Product price information
 * @property {Object} product.price.currency - Currency information
 * @property {string} product.price.currency.symbol - Currency symbol
 * @property {number} product.price.amount - Price amount
 * @property {Function} onQuickShop - Quick shop button handler
 * @property {Function} onClick - Card click handler
 */
ProductCard.propTypes = {
  product: PropTypes.shape({
    gallery: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    inStock: PropTypes.bool.isRequired,
    price: PropTypes.shape({
      currency: PropTypes.shape({
        symbol: PropTypes.string.isRequired,
      }).isRequired,
      amount: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  onQuickShop: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ProductCard;
