/**
 * ProductInfo - Product information display component
 * Renders product details including brand, name, price and attributes
 * Handles attribute selection and cart interaction through props
 */
import { Component } from "react";
import PropTypes from "prop-types";
import ProductAttributes from "./ProductAttributes";
import AddToCartButton from "./AddToCartButton";
import HTMLContentWrapper from "../../../components/HTMLContentWrapper/HTMLContentWrapper";

/**
 * ProductInfo Component - Displays product details and purchase options
 * @class
 * @extends {Component}
 */
class ProductInfo extends Component {
  render() {
    const {
      product,
      selectedAttributes,
      handleAttributeSelect,
      allAttributesSelected,
      addToCart,
    } = this.props;

    return (
      <div className="col-md-6 ps-md-5">
        <h2 className="mb-4 fw-bold">{product.brand}</h2>
        <h3 className="mb-4">{product.name}</h3>

        <ProductAttributes
          attributes={product.attributes}
          selectedAttributes={selectedAttributes}
          productInStock={product.inStock}
          handleAttributeSelect={handleAttributeSelect}
        />

        <div className="mb-4">
          <h4 className="text-uppercase fs-6">PRICE:</h4>
          <p className="h3 fw-bold">
            {product.price.currency.symbol}
            {product.price.amount}
          </p>
        </div>

        <AddToCartButton
          inStock={product.inStock}
          allAttributesSelected={allAttributesSelected}
          onClickAddToCart={addToCart}
        />

        <HTMLContentWrapper content={product.description} />
      </div>
    );
  }
}

/**
 * Component PropTypes
 * @property {Object} product - Product information object
 * @property {string} product.brand - Product brand name
 * @property {string} product.name - Product name
 * @property {Array} product.attributes - Product attributes configuration
 * @property {boolean} product.inStock - Product stock status
 * @property {Object} product.price - Product price information
 * @property {string} product.description - Product HTML description
 * @property {Object} selectedAttributes - Currently selected attribute values
 * @property {Function} handleAttributeSelect - Handler for attribute selection
 * @property {boolean} allAttributesSelected - Whether all attributes are selected
 * @property {Function} addToCart - Handler for add to cart action
 */
ProductInfo.propTypes = {
  product: PropTypes.shape({
    brand: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    attributes: PropTypes.array.isRequired,
    inStock: PropTypes.bool.isRequired,
    price: PropTypes.shape({
      currency: PropTypes.shape({
        symbol: PropTypes.string.isRequired,
      }),
      amount: PropTypes.number.isRequired,
    }).isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  selectedAttributes: PropTypes.object.isRequired,
  handleAttributeSelect: PropTypes.func.isRequired,
  allAttributesSelected: PropTypes.bool.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductInfo;
