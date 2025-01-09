/**
 * CartOverlay - Shopping cart overlay component
 * Displays cart contents in a floating overlay
 * Features:
 * - Animated transitions
 * - Position tracking relative to anchor
 * - Order placement functionality
 * - Responsive layout
 */
import { Component } from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import CartManager from "../../services/CartManagerService";
import GraphQLService from "../../services/GraphQLService";
import CartItem from "./CartItem";

/**
 * CartOverlay Component - Manages cart display and interactions
 * @class
 * @extends {Component}
 */
class CartOverlay extends Component {
  /**
   * Component PropTypes
   * @property {boolean} isVisible - Controls overlay visibility
   * @property {Object} anchorElement - Element to position overlay against
   * @property {Function} onClose - Handler for closing overlay
   */
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    anchorElement: PropTypes.object,
    onClose: PropTypes.func.isRequired,
  };
  /**
   * @state
   * @property {Object} position - Overlay position coordinates
   * @property {Array} cartItems - Items in shopping cart
   */
  state = {
    position: { top: 0, left: 0 },
    cartItems: [],
  };

  /**
   * Animation variants for overlay transitions
   * @property {Object} hidden - Initial hidden state
   * @property {Object} visible - Visible state
   * @property {Object} exit - Exit animation state
   */
  overlayVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -5 },
  };

  /**
   * Updates overlay position relative to anchor element
   * @method
   */
  updatePosition = () => {
    if (this.props.isVisible && this.props.anchorElement) {
      const rect = this.props.anchorElement.getBoundingClientRect();
      this.setState({
        position: {
          top: rect.bottom + 17,
          left: rect.left - 250,
        },
      });
    }
  };

  /**
   * Adds event listeners for position updates
   * @lifecycle
   */
  componentDidMount() {
    window.addEventListener("scroll", this.updatePosition);
    window.addEventListener("resize", this.updatePosition);
  }

  /**
   * Removes event listeners
   * @lifecycle
   */
  componentWillUnmount() {
    window.removeEventListener("scroll", this.updatePosition);
    window.removeEventListener("resize", this.updatePosition);
  }

  /**
   * Updates cart items when overlay becomes visible
   * @param {Object} prevProps - Previous component props
   */
  componentDidUpdate(prevProps) {
    if (!prevProps.isVisible && this.props.isVisible) {
      const cart = CartManager.getCart();
      this.setState({ cartItems: cart });
      this.updatePosition();
    }
  }

  /**
   * Handles item quantity updates
   * @param {number} index - Item index
   * @param {number} delta - Quantity change
   */
  handleQuantityChange = (index, delta) => {
    const updatedCart = CartManager.updateItemQuantity(index, delta);
    this.setState({ cartItems: updatedCart });
  };

  /**
   * Places order and clears cart
   * @async
   */
  handlePlaceOrder = async () => {
    const { cartItems } = this.state;
    if (cartItems.length === 0) return;

    try {
      await GraphQLService.createOrder(cartItems);
      CartManager.clearCart();
      this.setState({
        cartItems: [],
      });
    } catch (error) {
      console.error("Error placing order:", error);
      alert(`Failed to place order: ${error.message}`);
    }
  };

  /**
   * Converts string to kebab case for testing IDs
   * @param {string} str - String to convert
   * @returns {string} Kebab case string
   */
  toKebabCase = (str) => str.toLowerCase().replace(/\s+/g, "-");

  render() {
    const { isVisible, onClose } = this.props;
    const { position, cartItems } = this.state;

    if (!isVisible) return null;

    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price.amount * item.quantity,
      0
    );
    const itemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const itemsLabel = itemsCount === 1 ? "1 Item" : `${itemsCount} Items`;

    return (
      <AnimatePresence>
        {isVisible && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "fixed",
                top: "80px",
                left: 0,
                width: "100vw",
                height: "calc(100vh - 80px)",
                background: "rgba(0, 0, 0, 0.5)",
                zIndex: 1000,
                backdropFilter: "blur(2px)",
              }}
              onClick={onClose}
            />
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={this.overlayVariants}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{
                position: "fixed",
                top: `${position.top}px`,
                left: `${position.left}px`,
                width: "325px",
                background: "#fff",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                overflow: "hidden",
                zIndex: 1010,
                maxHeight: "80vh",
                borderRadius: "8px",
              }}
            >
              <div style={{ padding: "15px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h5
                    style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}
                  >
                    My Bag, {itemsLabel}
                  </h5>
                  <button
                    style={{
                      background: "transparent",
                      border: "none",
                      fontSize: "20px",
                      cursor: "pointer",
                      lineHeight: "1",
                      fontWeight: "bold",
                    }}
                    onClick={onClose}
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>

                {cartItems.length === 0 ? (
                  <p style={{ fontSize: "14px", margin: "10px 0" }}>
                    Your cart is empty
                  </p>
                ) : (
                  <div
                    style={{
                      overflowY: "auto",
                      marginTop: "10px",
                      maxHeight: "calc(80vh - 150px)",
                    }}
                  >
                    {cartItems.map((item, index) => (
                      <CartItem
                        key={index}
                        item={item}
                        index={index}
                        handleQuantityChange={this.handleQuantityChange}
                        toKebabCase={this.toKebabCase}
                      />
                    ))}
                  </div>
                )}

                <div style={{ marginTop: "10px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>Total:</span>
                    <span
                      style={{ fontWeight: "bold" }}
                      data-testid="cart-total"
                    >
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <button
                    style={{
                      background: cartItems.length === 0 ? "gray" : "#4CAF50",
                      color: "#fff",
                      border: "none",
                      padding: "10px 15px",
                      borderRadius: "5px",
                      cursor:
                        cartItems.length === 0 ? "not-allowed" : "pointer",
                      opacity: cartItems.length === 0 ? 0.6 : 1,
                      width: "100%",
                    }}
                    onClick={this.handlePlaceOrder}
                    disabled={cartItems.length === 0}
                  >
                    PLACE ORDER
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }
}

export default CartOverlay;
