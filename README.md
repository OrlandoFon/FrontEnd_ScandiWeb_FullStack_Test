# ScandiWeb Junior Full Stack Test - Front End

<div align="center">
  <img src="public/Front_End.gif" alt="Demo GIF" width="500">
</div>

## Overview

This project is a front-end application built as part of the ScandiWeb Junior Full Stack Dev test. It is developed using React and Vite, designed to interact seamlessly with a GraphQL-based back-end.

## Features

- **Category Navigation**: Browse products by categories.
- **Product Listing and Details**: View product information and attributes.
- **Shopping Cart Management**: Add, remove, and manage items in the cart.
- **GraphQL Integration**: Fetch and manage data from the back-end API.
- **Responsive Design**: Optimized for various devices.

## Technologies Used

- **React**: For building UI components.
- **Vite**: A fast development build tool.
- **GraphQL**: For querying and managing back-end data.
- **CSS**: For styling components and pages.
- **Framer Motion**: A production-ready motion library for React.
- **HTML-Parser**: A library for parsing and rendering HTML in React components.

---

## Project Structure

- **src/components**: Includes shared components like `LoadingSpinner`, `ModalOverlay`, and `CartOverlay` for building the application UI.
- **src/pages**: Contains main pages such as `CategoryPage` and `ProductDetailPage` for handling specific routes and displaying content.
- **src/pages/components**: Contains components specific to the pages, like `ProductCard` and `GallerySection`, for handling the display of content unique to each page.
- **src/services**: Provides utility services like `GraphQLService` for API interactions and `CartManagerService` for managing cart data in local storage.
- **src/hoc**: Contains Higher-Order Components (HOCs) like `withRouter` to enhance components with routing functionalities.
- **src/templates**: Includes the `MainTemplate`, which serves as the layout structure for rendering multiple pages and components consistently.

---

## How the Code Works

This application is structured as a Single Page Application (SPA) with two main pages, each built using a `MainTemplate`. The `MainTemplate` includes a shared header where users can navigate between category pages, interact with the cart, and manage products.

### Category Page

- Displays a list of products within a selected category.
- Products are dynamically fetched from the back end using `GraphQLService`.
- Products are displayed in a card-style layout with interactive features like a "Quick Shop" button, using components such as `ProductCard`.

### Product Detail Page

- The product is dynamically fetched using its ID from the back end via `GraphQLService`.
- Shows comprehensive information about a specific product, including attributes, an image gallery, and pricing.
- Includes interactive functionality through `AddToCartButton` to allow users to add products to the cart.
- Modular design leverages components like `GallerySection` and `ProductContent` for clarity and reusability.

### Header

- Integrated into the `MainTemplate`, the header allows users to navigate between pages, categories, and interact with the cart.
- Includes:
  - **CategoryButton**: Enables navigation between product categories and pages.
  - **CartOverlay**: Provides an overview of items in the cart.
  - **CartItem**: Represents individual products within the cart, with detailed item management options.

### Component Overview

The pages utilize shared and reusable components to enhance functionality and maintain consistency throughout the application.

#### Key Components

1. **LoadingSpinner**: Displays a loading animation while fetching data from the server.
2. **ModalOverlay**: Handles modal pop-ups with animations and backdrop effects for user notifications or interactions.
3. **HTMLContentWrapper**: Safely renders sanitized HTML content within the app for enhanced flexibility and security.

---

## Installation

### Prerequisites

Ensure the following tools are installed on your system:

- Node.js (>=14)
- npm or Yarn

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/OrlandoFon/FrontEnd_ScandiWeb_FullStack_Test.git
   cd FrontEnd_ScandiWeb_FullStack_Test
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables**

   Create a `.env` file at the root of the project and configure the following:

   ```env
   VITE_GRAPHQL_API='<backend-localhost>'
   ```

4. **Run the Application**

   Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

---

Thank you for using this application!
