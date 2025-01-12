/**
 * CategoryPage - Main product listing page component.
 * Handles category navigation and product filtering.
 * Manages overlay state and category selection.
 */
import { Component } from "react";
import PropTypes from "prop-types";
import MainTemplate from "../../templates/MainTemplate/MainTemplate";
import CategoryContent from "./page_components/CategoryContent";
import { withRouter } from "../../hoc/withRouter";

/**
 * CategoryPage Component - Manages the product category view.
 * @class
 * @extends {Component}
 */
class CategoryPage extends Component {
  /**
   * Component state.
   * @property {boolean} isOverlayVisible - Controls the cart overlay visibility.
   * @property {string} activeCategory - The currently selected category.
   */
  state = {
    isOverlayVisible: false,
    activeCategory: this.getInitialCategory(),
  };

  /**
   * Retrieves the initial category from URL params, router state, or props.
   * @returns {string} The initial category.
   */
  getInitialCategory() {
    const { params, location, categories } = this.props;
    return (
      params?.category || // URL parameter
      location?.state?.category || // Router state
      categories[0]?.name || // First category in the array
      "all" // Default category
    );
  }

  /**
   * Updates the active category when the URL or location state changes.
   * @param {Object} prevProps - The previous component props.
   */
  componentDidUpdate(prevProps) {
    const { params, location } = this.props;
    const prevCategory =
      prevProps.params?.category || prevProps.location?.state?.category;
    const newCategory = params?.category || location?.state?.category;

    if (prevCategory !== newCategory && newCategory) {
      this.setState({ activeCategory: newCategory });
    }
  }

  /**
   * Toggles the cart overlay visibility.
   * @method
   */
  handleToggleOverlay = () => {
    this.setState((prevState) => ({
      isOverlayVisible: !prevState.isOverlayVisible,
    }));
  };

  /**
   * Updates the active category.
   * @method
   * @param {string} category - The category to set as active.
   */
  handleSetActiveCategory = (category) => {
    this.setState({ activeCategory: category });
  };

  render() {
    const { products, categories } = this.props;
    const { isOverlayVisible, activeCategory } = this.state;

    return (
      <MainTemplate
        isOverlayVisible={isOverlayVisible}
        toggleOverlay={this.handleToggleOverlay}
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={this.handleSetActiveCategory}
      >
        <CategoryContent
          activeCategory={activeCategory}
          products={products}
          toggleOverlay={this.handleToggleOverlay}
        />
      </MainTemplate>
    );
  }
}

/**
 * Component PropTypes.
 * @property {Object} location - The router location object.
 * @property {Object} location.state - The router state data.
 * @property {string} location.state.category - The selected category from navigation.
 * @property {Array} categories - The available product categories.
 * @property {Array} products - The list of products to display.
 */
CategoryPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      category: PropTypes.string,
    }),
  }),
  params: PropTypes.shape({
    category: PropTypes.string,
  }),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ).isRequired,
  products: PropTypes.array.isRequired,
};

const RoutedCategoryPage = withRouter(CategoryPage);
export default RoutedCategoryPage;
