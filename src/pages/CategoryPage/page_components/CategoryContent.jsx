/**
 * CategoryContent - Main content area for category page
 * Handles product filtering, animations, and quick shop functionality
 * Manages product grid layout and navigation
 */
import { Component } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import CartManager from "../../../services/CartManagerService";
import ProductCard from "./ProductCard";
import { withRouter } from "../../../hoc/withRouter";

/**
 * CategoryContent Component - Manages product grid and animations
 * @class
 * @extends {Component}
 */
class CategoryContent extends Component {
  /**
   * Animation variants for container
   * @property {Object} hidden - Initial hidden state
   * @property {Object} show - Visible state with stagger
   * @property {Object} exit - Exit animation state
   */
  containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  /**
   * Animation variants for individual items
   * @property {Object} hidden - Initial hidden state
   * @property {Object} show - Visible state with transition
   */
  itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  /**
   * Handles quick shop button click
   * @param {Event} e - Click event
   * @param {Object} product - Product to add to cart
   */
  handleQuickShop = (e, product) => {
    const { toggleOverlay } = this.props;
    e.stopPropagation();
    CartManager.quickShop(product);
    setTimeout(() => {
      toggleOverlay();
    }, 300);
  };

  render() {
    const { products, activeCategory, navigate } = this.props;
    const filteredProducts =
      activeCategory === "all"
        ? products
        : products.filter(
            (product) => product.category.name === activeCategory
          );

    return (
      <div className="container py-4">
        <h1 className="display-6 mb-4">
          {activeCategory === "all" ? "PRODUCTS" : activeCategory.toUpperCase()}
        </h1>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="row row-cols-1 row-cols-md-3 g-4"
            variants={this.containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {filteredProducts.map((product) => (
              <motion.div
                className="col"
                key={product.id}
                variants={this.itemVariants}
              >
                <ProductCard
                  product={product}
                  onQuickShop={this.handleQuickShop}
                  onClick={() => navigate(`/product/${product.id}`)}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }
}

/**
 * Component PropTypes
 * @property {Function} toggleOverlay - Handler for cart overlay
 * @property {Array} products - List of products to display
 * @property {string} activeCategory - Currently selected category
 * @property {Function} navigate - Router navigation function
 */
CategoryContent.propTypes = {
  toggleOverlay: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  activeCategory: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};

const RoutedCategoryContent = withRouter(CategoryContent);
export default RoutedCategoryContent;
