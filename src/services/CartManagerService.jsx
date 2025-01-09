/**
 * CartManager Service - Handles shopping cart operations and localStorage management
 * Provides methods for adding, updating, and removing items from cart
 * Implements cart expiration after 10 minutes of inactivity
 */
const STORAGE_KEY = "cart";
const EXPIRATION_KEY = "cartExpiration";
const EXPIRATION_TIME = 10 * 60 * 1000; // 10 minutes in milliseconds

/**
 * CartManager class - Static methods for cart operations
 * @class
 */
class CartManager {
  /**
   * Retrieves current cart from localStorage
   * @returns {Array} Array of cart items or empty array if expired/error
   */
  static getCart() {
    try {
      const cart = localStorage.getItem(STORAGE_KEY);
      const expiration = localStorage.getItem(EXPIRATION_KEY);

      if (!cart || !expiration) return [];

      // Check if expired
      if (Date.now() > parseInt(expiration)) {
        this.clearCart();
        return [];
      }

      return JSON.parse(cart);
    } catch (error) {
      console.error("Error getting cart:", error);
      return [];
    }
  }

  /**
   * Saves cart to localStorage with expiration time
   * @param {Array} cart - Cart items to save
   * @returns {Array} Saved cart items
   */
  static setCart(cart) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      localStorage.setItem(
        EXPIRATION_KEY,
        (Date.now() + EXPIRATION_TIME).toString()
      );
      return cart;
    } catch (error) {
      console.error("Error setting cart:", error);
      return [];
    }
  }

  /**
   * Removes cart and expiration from localStorage
   */
  static clearCart() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(EXPIRATION_KEY);
  }

  /**
   * Adds product to cart with selected attributes
   * @param {Object} product - Product to add
   * @param {Object} selectedAttributes - Selected product attributes
   * @returns {Array} Updated cart items
   */
  static addItem(product, selectedAttributes) {
    const currentCart = this.getCart();

    const itemIdentifier = `${product.id}-${Object.entries(selectedAttributes)
      .sort(([attrA], [attrB]) => attrA.localeCompare(attrB))
      .map(([key, value]) => `${key}:${value}`)
      .join("-")}`;

    const cartItem = {
      id: product.id,
      itemIdentifier,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.gallery[0],
      selectedAttributes: { ...selectedAttributes },
      allAttributes: product.attributes,
    };

    const existingItemIndex = currentCart.findIndex(
      (item) => item.itemIdentifier === itemIdentifier
    );

    let updatedCart;
    if (existingItemIndex !== -1) {
      updatedCart = [...currentCart];
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      updatedCart = [...currentCart, cartItem];
    }

    return this.setCart(updatedCart);
  }

  /**
   * Updates quantity of item at specified index
   * @param {number} index - Cart item index
   * @param {number} delta - Quantity change
   * @returns {Array} Updated cart items
   */
  static updateItemQuantity(index, delta) {
    const cart = this.getCart();
    const updatedCart = [...cart];

    updatedCart[index].quantity += delta;

    if (updatedCart[index].quantity <= 0) {
      updatedCart.splice(index, 1);
    }

    return this.setCart(updatedCart);
  }

  /**
   * Quick adds product with default attributes
   * @param {Object} product - Product to add
   * @returns {Array} Updated cart items
   */
  static quickShop(product) {
    const defaultAttributes = {};
    product.attributes?.forEach((attr) => {
      defaultAttributes[attr.name] = attr.items[0].value;
    });

    return this.addItem(product, defaultAttributes);
  }
}

export default CartManager;
