/**
 * HTMLContentWrapper - Safely renders HTML content as React components
 * Parses HTML strings and converts them to React elements
 * Handles text nodes, element nodes, and attributes
 */
import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * HTMLContentWrapper Component - Converts HTML to React elements
 * @class
 * @extends {Component}
 */
class HTMLContentWrapper extends Component {
  /**
   * Converts DOM node to React element
   * @param {Node} node - DOM node to convert
   * @returns {React.Element|string|null} Converted React element
   */
  domToReact = (node) => {
    // Text node
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }

    // Element node
    if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = node.tagName.toLowerCase();
      const props = {
        key: Math.random().toString(36).substr(2, 9),
      };

      // Copy attributes
      Array.from(node.attributes).forEach((attr) => {
        props[attr.name] = attr.value;
      });

      // Convert children recursively
      const children = Array.from(node.childNodes).map(this.domToReact);

      return React.createElement(tagName, props, ...children);
    }

    return null;
  };

  /**
   * Parses HTML string to React elements
   * @param {string} content - HTML content to parse
   * @returns {Array|string} Array of React elements or original content
   */
  parseContent = (content) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      return Array.from(doc.body.childNodes).map(this.domToReact);
    } catch (error) {
      console.error("Error parsing HTML:", error);
      return content;
    }
  };

  render() {
    const { content } = this.props;

    if (!content) return null;

    const parsedContent = this.parseContent(content);

    return (
      <div className="product-description" data-testid="product-description">
        {Array.isArray(parsedContent) ? parsedContent : content}
      </div>
    );
  }
}

/**
 * Component PropTypes
 * @property {string} content - HTML content to render
 */
HTMLContentWrapper.propTypes = {
  content: PropTypes.string,
};

export default HTMLContentWrapper;
