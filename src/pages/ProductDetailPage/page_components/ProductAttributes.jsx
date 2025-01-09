/**
 * ProductAttributes - Product attributes selection component
 * Handles rendering and selection of product attributes (colors, sizes, etc)
 * Manages different attribute types with specific button styles
 */
import { Component } from "react";
import PropTypes from "prop-types";

/**
 * ProductAttributes Component - Manages product attribute selection
 * @class
 * @extends {Component}
 */
class ProductAttributes extends Component {
  /**
   * Renders color attribute selection button
   * @param {Object} attr - Attribute object
   * @param {Object} item - Attribute item
   * @param {number} index - Item index
   * @returns {JSX.Element} Color selection button
   */
  renderColorButton = (attr, item, index) => {
    const { selectedAttributes, productInStock, handleAttributeSelect } =
      this.props;

    return (
      <button
        key={index}
        className={`btn p-3 ${
          selectedAttributes[attr.name] === item.value
            ? "ring-2 ring-green-500"
            : ""
        }`}
        style={{
          backgroundColor: item.value,
          border:
            selectedAttributes[attr.name] === item.value
              ? "2px solid #5ECE7B"
              : "1px solid black",
          width: "32px",
          height: "30px",
          transition: "all 0.2s ease",
          cursor: productInStock ? "pointer" : "not-allowed",
          opacity: productInStock ? 1 : 0.5,
        }}
        onClick={() => handleAttributeSelect(attr.name, item.value)}
        title={item.displayValue}
        disabled={!productInStock}
      />
    );
  };

  /**
   * Renders size attribute selection button
   * @param {Object} attr - Attribute object
   * @param {Object} item - Attribute item
   * @param {number} index - Item index
   * @returns {JSX.Element} Size selection button
   */
  renderSizeButton = (attr, item, index) => {
    const { selectedAttributes, productInStock, handleAttributeSelect } =
      this.props;

    return (
      <button
        key={index}
        className={`btn ${
          selectedAttributes[attr.name] === item.value
            ? "btn-dark"
            : "btn-outline-dark"
        }`}
        onClick={() => handleAttributeSelect(attr.name, item.value)}
        disabled={!productInStock}
        style={{
          cursor: productInStock ? "pointer" : "not-allowed",
          opacity: productInStock ? 1 : 0.5,
        }}
      >
        {item.value}
      </button>
    );
  };

  /**
   * Converts string to kebab case for testing IDs
   * @param {string} str - String to convert
   * @returns {string} Kebab case string
   */
  toKebabCase = (str) => str.toLowerCase().replace(/\s+/g, "-");

  render() {
    const { attributes } = this.props;

    return (
      <>
        {attributes.map((attr, index) => (
          <div
            key={index}
            className="mb-4"
            data-testid={`product-attribute-${this.toKebabCase(attr.name)}`}
          >
            <h4 className="mb-3 text-uppercase fs-6">{attr.name}:</h4>
            <div className="d-flex gap-2">
              {attr.items.map((item, i) =>
                attr.name.toLowerCase() === "color"
                  ? this.renderColorButton(attr, item, i)
                  : this.renderSizeButton(attr, item, i)
              )}
            </div>
          </div>
        ))}
      </>
    );
  }
}

/**
 * Component PropTypes
 * @property {Object} selectedAttributes - Currently selected attribute values
 * @property {boolean} productInStock - Whether product is in stock
 * @property {Function} handleAttributeSelect - Handler for attribute selection
 * @property {Array} attributes - Product attributes configuration
 */
ProductAttributes.propTypes = {
  selectedAttributes: PropTypes.object.isRequired,
  productInStock: PropTypes.bool.isRequired,
  handleAttributeSelect: PropTypes.func.isRequired,
  attributes: PropTypes.array.isRequired,
};

export default ProductAttributes;
