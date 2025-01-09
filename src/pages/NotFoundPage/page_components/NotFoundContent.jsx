/**
 * NotFoundContent - Content component for 404 error page
 * Displays animated error message and return link
 * Handles both generic 404 and product not found cases
 */
import { Component } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

/**
 * NotFoundContent Component - Displays 404 error content
 * @class
 * @extends {Component}
 */
class NotFoundContent extends Component {
  render() {
    const { isProduct = false } = this.props;

    return (
      <motion.div
        className="vh-100 d-flex align-items-center justify-content-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="d-flex flex-column align-items-center">
          <motion.h1
            className="text-uppercase mb-4"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {isProduct ? "Product not found" : "404 - Page Not Found"}
          </motion.h1>
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/" className="btn btn-success btn-lg text-uppercase">
              Return To Main Page
            </Link>
          </motion.div>
        </div>
      </motion.div>
    );
  }
}

/**
 * Component PropTypes
 * @property {boolean} isProduct - Whether error is for product not found
 */
NotFoundContent.propTypes = {
  isProduct: PropTypes.bool,
};

export default NotFoundContent;
