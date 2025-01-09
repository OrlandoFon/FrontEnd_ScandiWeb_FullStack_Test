/**
 * GallerySection - Product image gallery component
 * Displays product images with navigation controls
 * Handles image selection and carousel functionality
 */
import { Component } from "react";
import PropTypes from "prop-types";

/**
 * GallerySection Component - Manages product image gallery
 * @class
 * @extends {Component}
 */
class GallerySection extends Component {
  /**
   * Handles navigation to previous image
   * @method
   */
  handlePrev = () => {
    const { gallery, selectedImage, setSelectedImage } = this.props;
    setSelectedImage(
      selectedImage === 0 ? gallery.length - 1 : selectedImage - 1
    );
  };

  /**
   * Handles navigation to next image
   * @method
   */
  handleNext = () => {
    const { gallery, selectedImage, setSelectedImage } = this.props;
    setSelectedImage(
      selectedImage === gallery.length - 1 ? 0 : selectedImage + 1
    );
  };

  /**
   * Handles mouse enter event for navigation buttons
   * @param {Event} e - Mouse event
   */
  handleMouseEnter = (e) => {
    e.currentTarget.style.opacity = 1;
  };

  /**
   * Handles mouse leave event for navigation buttons
   * @param {Event} e - Mouse event
   */
  handleMouseLeave = (e) => {
    e.currentTarget.style.opacity = 0.7;
  };

  /**
   * Renders gallery with thumbnail list and main image view
   * @returns {JSX.Element} Gallery layout with navigation
   */
  render() {
    const { gallery, selectedImage, setSelectedImage, productName } =
      this.props;

    if (!gallery?.length) return null;

    return (
      <>
        <div className="row" data-testid="product-gallery">
          <div
            className="col-md-2"
            style={{ maxHeight: "600px", overflowY: "auto" }}
          >
            {gallery.map((image, index) => (
              <div
                key={index}
                className="mb-3"
                onClick={() => setSelectedImage(index)}
                style={{
                  cursor: "pointer",
                  opacity: selectedImage === index ? 1 : 0.6,
                  transition: "all 0.3s ease",
                }}
              >
                <img
                  src={image}
                  alt={`${productName} - view ${index + 1}`}
                  className="img-fluid rounded-2"
                  style={{
                    border:
                      selectedImage === index ? "2px solid #5ECE7B" : "none",
                    transition: "all 0.3s ease",
                  }}
                />
              </div>
            ))}
          </div>

          <div className="col-md-9 position-relative offset-md-1">
            <div
              style={{
                maxHeight: "600px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <img
                src={gallery[selectedImage]}
                alt={productName}
                className="img-fluid rounded-3"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />

              {gallery.length > 1 && (
                <>
                  <button
                    className="position-absolute top-50 start-0 translate-middle-y bg-black border-0 p-2 ms-2"
                    onClick={this.handlePrev}
                    style={{
                      width: "40px",
                      height: "40px",
                      cursor: "pointer",
                      opacity: 0.7,
                      color: "white",
                      transition: "opacity 0.3s ease",
                      zIndex: 2,
                    }}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                  >
                    &lt;
                  </button>

                  <button
                    className="position-absolute top-50 end-0 translate-middle-y bg-black border-0 p-2 me-2"
                    onClick={this.handleNext}
                    style={{
                      width: "40px",
                      height: "40px",
                      cursor: "pointer",
                      opacity: 0.7,
                      color: "white",
                      transition: "opacity 0.3s ease",
                      zIndex: 2,
                    }}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                  >
                    &gt;
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

/**
 * Component PropTypes
 * @property {string[]} gallery - Array of image URLs
 * @property {number} selectedImage - Index of currently selected image
 * @property {Function} setSelectedImage - Handler for image selection
 * @property {string} productName - Name of the product for alt texts
 */
GallerySection.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedImage: PropTypes.number.isRequired,
  setSelectedImage: PropTypes.func.isRequired,
  productName: PropTypes.string.isRequired,
};

export default GallerySection;
