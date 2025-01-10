/**
 * GraphQLService - Handles all GraphQL API communications
 * Provides methods for fetching products, categories and handling orders
 * Implements error handling and authentication for API requests
 */
import axios from "axios";

/**
 * GraphQLService class - Static methods for GraphQL operations
 * @class
 */
class GraphQLService {
  /** @constant {string} API_URL - GraphQL endpoint URL */
  static API_URL = import.meta.env.VITE_GRAPHQL_API;

  /**
   * Makes GraphQL request to the API
   * @param {string} query - GraphQL query or mutation
   * @param {Object} variables - Query variables
   * @param {boolean} auth - Whether to include auth token
   * @returns {Promise<Object>} API response data
   * @throws {Error} On API or network errors
   */
  static async request(query, variables = {}, auth = false) {
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      if (auth) {
        headers.Authorization = `Bearer ${
          document.cookie.split("token=")[1]?.split(";")[0]
        }`;
      }

      const response = await axios.post(
        this.API_URL,
        { query, variables },
        { headers }
      );

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      return response.data.data;
    } catch (error) {
      console.error("GraphQL Error:", error);
      throw error;
    }
  }

  /**
   * @typedef {Object} GraphQLQueries
   * @property {string} GET_CATEGORIES_AND_PRODUCTS - Query for fetching initial data
   * @property {Function} GET_PRODUCT_BY_ID - Query for fetching single product
   */
  static queries = {
    GET_CATEGORIES_AND_PRODUCTS: `
      query {
        categories { name }
        products {
          id name inStock
          attributes {
            name
            items { value displayValue }
          }
          category { name }
          gallery
          price {
            amount
            currency { symbol }
          }
        }
      }
    `,

    GET_PRODUCT_BY_ID: (id) => `
      query {
        product(id: ${id}) {
          id name brand inStock description gallery
          category { name }
          attributes {
            name
            items { value displayValue }
          }
          price {
            amount
            currency { label symbol }
          }
        }
      }
    `,
  };

  /**
   * @typedef {Object} GraphQLMutations
   * @property {Function} CREATE_ORDER - Mutation for creating new order
   */
  static mutations = {
    CREATE_ORDER: (orders) => ({
      query: `
            mutation CreateOrder($products: [OrderProductInput!]!) {
                createOrder(products: $products) {
                    id
                    orderedProducts {
                        product {
                            name
                        }
                        quantity
                        unitPrice
                        total
                        selectedAttributes {
                            name
                            value
                        }
                    }
                    total
                    createdAt
                }
            }
        `,
      variables: {
        products: orders.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          selectedAttributes: Object.entries(item.selectedAttributes || {}).map(
            ([name, value]) => ({
              name,
              value: String(value),
            })
          ),
        })),
      },
    }),
  };

  /**
   * Fetches categories and products data
   * @returns {Promise<Object>} Categories and products data
   */
  static async getInitialData() {
    return this.request(this.queries.GET_CATEGORIES_AND_PRODUCTS);
  }

  /**
   * Fetches single product by ID
   * @param {string} id - Product ID
   * @returns {Promise<Object>} Product data
   */
  static async getProductById(id) {
    return this.request(this.queries.GET_PRODUCT_BY_ID(id));
  }

  /**
   * Creates new order from cart items
   * @param {Array} cartItems - Array of cart items
   * @returns {Promise<Object>} Created order data
   */
  static async createOrder(cartItems) {
    const mutation = this.mutations.CREATE_ORDER(cartItems);
    return this.request(mutation.query, mutation.variables, true);
  }
}

export default GraphQLService;
