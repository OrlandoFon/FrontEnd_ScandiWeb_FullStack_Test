/**
 * MainTemplate component - Layout wrapper for all pages
 * Provides consistent layout structure with header and main content area
 * Handles overlay effects and animations for page transitions
 */
import { Component } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import Header from "../../components/Header/Header";

/**
 * MainTemplate Component - Provides the main layout structure
 * @class
 * @extends {Component}
 */
class MainTemplate extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isOverlayVisible: PropTypes.bool.isRequired,
    toggleOverlay: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    activeCategory: PropTypes.string.isRequired,
    setActiveCategory: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  /**
   * Renders the template with header and animated main content
   * @returns {JSX.Element} The rendered template
   */
  render() {
    const {
      children,
      isOverlayVisible,
      toggleOverlay,
      categories,
      activeCategory,
      setActiveCategory,
      isLoading,
    } = this.props;

    return (
      <div className="container-fluid p-0">
        <div style={{ height: "72px" }}>
          <Header
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            toggleOverlay={toggleOverlay}
            isOverlayVisible={isOverlayVisible}
            isLoading={isLoading}
          />
        </div>
        <motion.main
          className="container mt-4"
          style={{
            filter: isOverlayVisible ? "blur(5px)" : "none",
            transition: "filter 0.3s ease",
            marginTop: "1rem",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.main>
      </div>
    );
  }
}

export default MainTemplate;
