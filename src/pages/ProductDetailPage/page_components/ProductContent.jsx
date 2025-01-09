/**
 * ProductContent - Main content component for product detail view
 * Handles product data fetching, attribute selection, and cart operations
 * Manages product gallery and information display with animations
 */
import { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "../../../hoc/withRouter";
import { motion } from "framer-motion";
import GraphQLService from "../../../services/GraphQLService";
import CartManager from "../../../services/CartManagerService";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import NotFoundContent from "../../NotFoundPage/page_components/NotFoundContent";
import GallerySection from "./GalleySection";
import ProductInfo from "./ProductInfo";

/**
 * ProductContent Component - Manages product detail view content
 * @class
 * @extends {Component}
 */
class ProductContent extends Component {
  /**
   * @state
   * @property {Object|null} product - Current product data
   * @property {boolean} loading - Loading state indicator
   * @property {number} selectedImage - Index of selected gallery image
   * @property {Object} selectedAttributes - Selected product attributes
   */ state = {
    product: null,
    loading: true,
    selectedImage: 0,
    selectedAttributes: {},
  };

  /**
   * Fetches product data on component mount
   * @async
   */
  async componentDidMount() {
    await this.fetchProduct();
  }

  /**
   * Updates category when product data changes
   * @param {Object} prevProps - Previous props
   * @param {Object} prevState - Previous state
   */
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.product?.category?.name !== this.state.product?.category?.name
    ) {
      const newCategory = this.state.product?.category?.name;
      if (newCategory) {
        this.props.onCategoryChange(newCategory);
      }
    }
  }

  /**
   * Fetches product data from GraphQL service
   * @async
   */
  fetchProduct = async () => {
    try {
      const data = await GraphQLService.getProductById(this.props.params.id);
      this.setState({ product: data.product });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  /**
   * Handles attribute selection for product
   * @param {string} attrName - Attribute name
   * @param {string} value - Selected value
   */
  handleAttributeSelect = (attrName, value) => {
    if (!this.state.product?.inStock) return;
    this.setState((prev) => ({
      selectedAttributes: {
        ...prev.selectedAttributes,
        [attrName]:
          prev.selectedAttributes[attrName] === value ? undefined : value,
      },
    }));
  };

  /**
   * Checks if all required attributes are selected
   * @returns {boolean} Whether all attributes are selected
   */
  allAttributesSelected = () => {
    const { product, selectedAttributes } = this.state;
    if (!product?.attributes?.length) return true;
    return product.attributes.every((attr) =>
      Boolean(selectedAttributes[attr.name])
    );
  };

  /**
   * Adds product to cart with selected attributes
   */
  addToCart = () => {
    const { product, selectedAttributes } = this.state;
    const { toggleOverlay } = this.props;
    if (!product.inStock || !this.allAttributesSelected()) return;
    CartManager.addItem(product, selectedAttributes);
    toggleOverlay();
    this.setState({ selectedAttributes: {} });
  };

  render() {
    const { product, loading, selectedImage, selectedAttributes } = this.state;

    if (loading) return <LoadingSpinner />;
    if (!product) return <NotFoundContent isProduct={true} />;

    return (
      <div className="container-fluid p-0">
        <main className="container mt-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="row justify-content-center"
          >
            <div className="col-11">
              <div className="bg-white rounded-3 shadow-sm p-4 mb-5">
                <div className="d-flex flex-column flex-md-row">
                  <GallerySection
                    gallery={product.gallery}
                    selectedImage={selectedImage}
                    setSelectedImage={(index) =>
                      this.setState({ selectedImage: index })
                    }
                    productName={product.name}
                  />
                  <ProductInfo
                    product={product}
                    selectedAttributes={selectedAttributes}
                    handleAttributeSelect={this.handleAttributeSelect}
                    allAttributesSelected={this.allAttributesSelected()}
                    addToCart={this.addToCart}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }
}

/**
 * Component PropTypes
 * @property {Function} onCategoryChange - Handler for category changes
 * @property {Function} toggleOverlay - Handler for overlay visibility
 * @property {Object} params - URL parameters containing product ID
 */
ProductContent.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
  toggleOverlay: PropTypes.func.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const WrappedProductContent = withRouter(ProductContent);
export default WrappedProductContent;
