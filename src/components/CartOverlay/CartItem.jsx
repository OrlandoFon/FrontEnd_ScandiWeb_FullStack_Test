/**
 * CartItem - Shopping cart item component
 * Displays product details with attribute selection
 * Handles quantity updates and attribute display
 */
import { Component } from "react";
import PropTypes from "prop-types";

/**
 * CartItem Component - Renders individual cart item
 * @class
 * @extends {Component}
 */
class CartItem extends Component {
  render() {
    /* Props:
     * - item: Complete product data object
     * - index: Position in cart array
     * - handleQuantityChange: Updates item quantity
     * - toKebabCase: Formats strings for test IDs
     */
    const { item, index, handleQuantityChange, toKebabCase } = this.props;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "15px",
        }}
      >
        <div style={{ flex: 1, marginRight: "15px" }}>
          <h3 style={{ margin: 0, fontSize: "16px" }}>{item.name}</h3>
          <p style={{ margin: "5px 0" }}>
            {item.price.currency.symbol}
            {item.price.amount}
          </p>
          {item.allAttributes?.map((attr) => {
            const attrKebab = toKebabCase(attr.name);
            const selectedValue =
              item.selectedAttributes && item.selectedAttributes[attr.name];

            return (
              <div
                key={attr.name}
                style={{ marginBottom: "6px" }}
                data-testid={`cart-item-attribute-${attrKebab}`}
              >
                <h4
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "14px",
                    fontWeight: "normal",
                  }}
                >
                  {attr.name.toUpperCase()}:
                </h4>
                <div style={{ display: "flex", gap: "4px" }}>
                  {attr.items.map((option) => {
                    const optKebab = toKebabCase(option.value);
                    const isSelected = selectedValue === option.value;

                    if (attr.name.toLowerCase() === "color") {
                      return (
                        <div
                          key={option.value}
                          style={{
                            backgroundColor: option.value,
                            width: "24px",
                            height: "24px",
                            border: isSelected
                              ? "2px solid #5ECE7B"
                              : "1px solid #1D1F22",
                            cursor: "default",
                          }}
                          data-testid={`cart-color-${attrKebab}-${optKebab}${
                            isSelected ? "-selected" : ""
                          }`}
                        />
                      );
                    }

                    return (
                      <div
                        key={option.value}
                        style={{
                          border: "1px solid #1D1F22",
                          padding: "2px 6px",
                          cursor: "default",
                          fontSize: "12px",
                          background: isSelected ? "#1D1F22" : "transparent",
                          color: isSelected ? "#FFFFFF" : "#1D1F22",
                          minWidth: "24px",
                          textAlign: "center",
                        }}
                        data-testid={`cart-item-attribute-${attrKebab}-${optKebab}${
                          isSelected ? "-selected" : ""
                        }`}
                      >
                        {option.value}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            <button
              style={{
                width: "24px",
                height: "24px",
                background: "#FFFFFF",
                color: "#1D1F22",
                border: "1px solid #1D1F22",
                cursor: "pointer",
                marginBottom: "2px",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => handleQuantityChange(index, +1)}
              data-testid="cart-item-amount-increase"
            >
              +
            </button>
            <span style={{ fontSize: "14px" }} data-testid="cart-item-amount">
              {item.quantity}
            </span>
            <button
              style={{
                width: "24px",
                height: "24px",
                background: "#FFFFFF",
                color: "#1D1F22",
                border: "1px solid #1D1F22",
                cursor: "pointer",
                marginTop: "2px",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => handleQuantityChange(index, -1)}
              data-testid="cart-item-amount-decrease"
            >
              -
            </button>
          </div>
          <img
            src={item.image}
            alt={item.name}
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    );
  }
}

/**
 * Component PropTypes
 * @property {Object} item - Cart item data
 * @property {number} index - Item index in cart
 * @property {Function} handleQuantityChange - Quantity update handler
 * @property {Function} toKebabCase - String formatter function
 */
CartItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.shape({
      currency: PropTypes.shape({
        symbol: PropTypes.string.isRequired,
      }).isRequired,
      amount: PropTypes.number.isRequired,
    }).isRequired,
    allAttributes: PropTypes.array,
    selectedAttributes: PropTypes.object,
    quantity: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleQuantityChange: PropTypes.func.isRequired,
  toKebabCase: PropTypes.func.isRequired,
};

export default CartItem;
