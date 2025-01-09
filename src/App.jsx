/**
 * Main App component for ScandiWeb Junior Developer Test
 * An e-commerce Single Page Application that handles product listing and details
 * Uses GraphQL for data fetching and React Router for navigation
 */
import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import LoadingSpinner from "./components/Loading/LoadingSpinner";
import GraphQLService from "./services/GraphQLService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

/**
 * App Component - Root component of the application
 * @class
 * @extends {Component}
 */
class App extends Component {
  /**
   * @state
   * @property {Array} products - List of products from GraphQL
   * @property {Array} categories - List of categories of products from GraphQL
   * @property {boolean} loading - Loading state indicator
   * @property {string|null} error - Error message if data fetch fails
   */
  state = {
    products: [],
    categories: [],
    loading: true,
    error: null,
  };

  /**
   * Fetches initial data when component mounts
   * @method
   */
  componentDidMount() {
    GraphQLService.getInitialData()
      .then((data) => {
        this.setState({
          products: data.products,
          categories: data.categories,
          loading: false,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          loading: false,
          error: "Failed to load data",
        });
      });
  }

  render() {
    const { loading, error, products, categories } = this.state;

    if (loading) return <LoadingSpinner />;
    if (error) return <div>Error: {error}</div>;

    return (
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <CategoryPage products={products} categories={categories} />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetailPage products={products} categories={categories} />
            }
          />
          <Route path="*" element={<NotFoundPage categories={categories} />} />
        </Routes>
      </div>
    );
  }
}

export default App;
