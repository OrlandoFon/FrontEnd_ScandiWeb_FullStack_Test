/**
 * Header - Main navigation component
 * Handles category navigation and cart overlay
 * Manages cart count updates and routing
 */
import { Component, createRef } from "react";
import PropTypes from "prop-types";
import { withRouter } from "../../hoc/withRouter";
import CartManager from "../../services/CartManagerService";
import CartOverlay from "../CartOverlay/CartOverlay";
import CartIcon from "../../assets/cart.png";
import CategoryButton from "./CategoryButton";

/**
 * Header Component - Main navigation and cart management
 * @class
 * @extends {Component}
 */
class Header extends Component {
  /**
   * @state
   * @property {number} itemsCount - Number of items in cart
   */
  state = {
    itemsCount: 0,
  };

  /** @type {React.RefObject} Reference to cart button element */
  cartButtonRef = createRef();

  /** @type {number|null} Interval ID for cart updates */
  updateInterval = null;

  /**
   * Sets up cart count update interval
   * @lifecycle
   */
  componentDidMount() {
    this.updateCartCount();
    this.updateInterval = setInterval(this.updateCartCount, 1000);
  }

  /**
   * Cleans up update interval
   * @lifecycle
   */
  componentWillUnmount() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  /**
   * Updates cart item count from CartManager
   * @method
   */
  updateCartCount = () => {
    const cart = CartManager.getCart();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    this.setState({ itemsCount: totalItems });
  };

  /**
   * Handles category navigation
   * @param {string} categoryName - Selected category name
   */
  handleCategoryClick = (categoryName) => {
    const { setActiveCategory, navigate } = this.props;
    setActiveCategory(categoryName);
    navigate("/", { state: { category: categoryName } });
  };

  /**
   * Component PropTypes
   * @property {Array} categories - Available product categories
   * @property {string} activeCategory - Currently selected category
   * @property {Function} setActiveCategory - Handler for category selection
   * @property {Function} toggleOverlay - Handler for cart overlay
   * @property {boolean} isOverlayVisible - Controls cart overlay visibility
   * @property {boolean} isLoading - Loading state indicator
   * @property {Function} navigate - Router navigation function
   */
  render() {
    const {
      categories = [],
      activeCategory,
      toggleOverlay,
      isOverlayVisible,
      isLoading = false,
    } = this.props;
    const { itemsCount } = this.state;

    return (
      <header
        className="bg-light py-3 shadow-sm border-bottom"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: "#fff",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <ul className="nav category-nav d-flex">
                {categories?.map((category, index) => (
                  <li className="nav-item" key={index}>
                    <CategoryButton
                      categoryName={category.name}
                      isActive={activeCategory === category.name}
                      onClick={() => this.handleCategoryClick(category.name)}
                      isLoading={isLoading}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-auto position-relative">
              <button
                ref={this.cartButtonRef}
                className="btn btn-light position-relative"
                onClick={toggleOverlay}
                data-testid="cart-btn"
              >
                <img
                  src={CartIcon}
                  alt="Cart"
                  style={{
                    width: 30,
                    height: 30,
                    objectFit: "contain",
                  }}
                />
                {itemsCount > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      background: "black",
                      color: "white",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: "bold",
                      border: "2px solid white",
                      transition: "transform 0.2s ease",
                      transform: "scale(1)",
                    }}
                  >
                    {itemsCount}
                  </div>
                )}
              </button>

              <CartOverlay
                isVisible={isOverlayVisible}
                onClose={toggleOverlay}
                anchorElement={this.cartButtonRef.current}
              />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
  activeCategory: PropTypes.string,
  setActiveCategory: PropTypes.func.isRequired,
  toggleOverlay: PropTypes.func.isRequired,
  isOverlayVisible: PropTypes.bool,
  isLoading: PropTypes.bool,
  navigate: PropTypes.func.isRequired,
};

const HeaderWithRouter = withRouter(Header);
export default HeaderWithRouter;
