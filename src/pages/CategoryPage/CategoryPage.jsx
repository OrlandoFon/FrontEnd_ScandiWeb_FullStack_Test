/**
 * CategoryPage - Main product listing page component
 * Handles category navigation and product filtering
 * Manages overlay state and category selection
 */
import { Component } from "react";
import PropTypes from "prop-types";
import MainTemplate from "../../templates/MainTemplate/MainTemplate";
import CategoryContent from "./page_components/CategoryContent";
import { withRouter } from "../../hoc/withRouter";

/**
 * CategoryPage Component - Manages product category view
 * @class
 * @extends {Component}
 */
class CategoryPage extends Component {
  /**
   * @state
   * @property {boolean} isOverlayVisible - Controls cart overlay visibility
   * @property {string} activeCategory - Currently selected category
   */
  state = {
    isOverlayVisible: false,
    activeCategory:
      this.props.location?.state?.category ||
      this.props.categories[0]?.name ||
      "all",
  };

  /**
   * Updates category when location state changes
   * @param {Object} prevProps - Previous component props
   */
  componentDidUpdate(prevProps) {
    if (
      prevProps.location?.state?.category !==
      this.props.location?.state?.category
    ) {
      if (this.props.location?.state?.category) {
        this.setState({ activeCategory: this.props.location.state.category });
      }
    }
  }

  /**
   * Toggles cart overlay visibility
   * @method
   */
  handleToggleOverlay = () => {
    this.setState((prevState) => ({
      isOverlayVisible: !prevState.isOverlayVisible,
    }));
  };

  /**
   * Updates active category
   * @method
   * @param {string} category - Category to set as active
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
 * Component PropTypes
 * @property {Object} location - Router location object
 * @property {Object} location.state - Router state data
 * @property {string} location.state.category - Selected category from navigation
 * @property {Array} categories - Available product categories
 * @property {Array} products - Product list to display
 */
CategoryPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      category: PropTypes.string,
    }),
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
