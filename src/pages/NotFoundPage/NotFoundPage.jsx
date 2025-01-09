/**
 * NotFoundPage - 404 error page component
 * Displays error message when route is not found
 * Maintains category state and overlay visibility
 */
import { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "../../hoc/withRouter";
import MainTemplate from "../../templates/MainTemplate/MainTemplate";
import NotFoundContent from "./page_components/NotFoundContent";

/**
 * NotFoundPage Component - Handles 404 error view
 * @class
 * @extends {Component}
 */
class NotFoundPage extends Component {
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
   * Toggles cart overlay visibility
   */
  handleToggleOverlay = () => {
    this.setState((prevState) => ({
      isOverlayVisible: !prevState.isOverlayVisible,
    }));
  };

  /**
   * Updates active category if not in loading state
   * @param {string} category - Category to set as active
   */
  handleProductCategory = (category) => {
    if (this.state.isLoading) return;
    this.setState({ activeCategory: category });
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
        <NotFoundContent onCategoryChange={this.handleCategoryChange} />
      </MainTemplate>
    );
  }
}

/**
 * Component PropTypes
 * @property {string[]} categories - Available product categories
 * @property {Object} location - Router location object with state
 */
NotFoundPage.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  location: PropTypes.object,
};

const RoutedNotFoundPage = withRouter(NotFoundPage);
export default RoutedNotFoundPage;
