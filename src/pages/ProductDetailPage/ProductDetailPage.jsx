/**
 * ProductDetailPage - Product details view component
 * Displays detailed product information and handles product interactions
 * Manages category state and overlay visibility for cart operations
 */
import { Component } from "react";
import PropTypes from "prop-types";
import MainTemplate from "../../templates/MainTemplate/MainTemplate";
import ProductContent from "./page_components/ProductContent";
import { withRouter } from "../../hoc/withRouter";

/**
 * ProductDetailPage Component - Handles product detail view
 * @class
 * @extends {Component}
 */
class ProductDetailPage extends Component {
  /**
   * @state
   * @property {boolean} isOverlayVisible - Controls cart overlay visibility
   * @property {string} activeCategory - Currently selected category
   * @property {boolean} isLoading - Loading state indicator
   */
  state = {
    isOverlayVisible: false,
    activeCategory: this.props.location?.state?.previousCategory || undefined,
    isLoading: true,
  };

  /**
   * Updates active category if not in loading state
   * @param {string} category - Category to set as active
   */
  handleProductCategory = (category) => {
    if (this.state.isLoading) return;
    if (this.state.activeCategory !== category) {
      this.setState({
        activeCategory: category || "all",
        isLoading: false,
      });
    }
  };

  /**
   * Toggles cart overlay visibility
   */
  handleToggleOverlay = () => {
    this.setState((prevState) => ({
      isOverlayVisible: !prevState.isOverlayVisible,
    }));
  };

  /**
   * Updates category and loading state
   * @param {string} category - New category to set
   */
  handleCategoryChange = (category) => {
    this.setState({
      isLoading: false,
      activeCategory: category,
    });
  };

  render() {
    const { categories } = this.props;
    const { isOverlayVisible, activeCategory, isLoading } = this.state;

    return (
      <MainTemplate
        isOverlayVisible={isOverlayVisible}
        toggleOverlay={this.handleToggleOverlay}
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={this.handleProductCategory}
        isLoading={isLoading}
      >
        <ProductContent
          onCategoryChange={this.handleCategoryChange}
          toggleOverlay={this.handleToggleOverlay}
        />
      </MainTemplate>
    );
  }
}

/**
 * Component PropTypes
 * @property {Array} categories - Available product categories
 * @property {Object} location - Router location object with state
 */
ProductDetailPage.propTypes = {
  categories: PropTypes.array,
  location: PropTypes.shape({
    state: PropTypes.shape({
      previousCategory: PropTypes.string,
    }),
  }),
};

const WrappedProductDetailPage = withRouter(ProductDetailPage);
export default WrappedProductDetailPage;
