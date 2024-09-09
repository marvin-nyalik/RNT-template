# Inventory Management System API - Stock Mate

A robust inventory management system built with **Express.js**. This API allows you to track, manage, and organize stock levels, ensuring efficient operations and accurate inventory data. Features include CRUD operations for products, real-time stock updates, and user authentication for secure access.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Product Management**: Create, read, update, and delete (CRUD) products in the inventory.
- **Real-Time Stock Updates**: Keep stock levels up to date automatically when products are added, sold, or removed.
- **User Authentication**: Secure the API with JWT (JSON Web Tokens) to ensure that only authenticated users can modify inventory.
- **Role-based Access Control**: Admin users can add, modify, and delete inventory, while standard users can only view stock levels.
- **Search and Filter**: Search products by name, category, or availability status.
- **Error Handling**: Comprehensive error handling with descriptive messages.

---

## Installation

### Prerequisites

- Node.js (v18+)
- MongoDB (as a database)
- npm (Node package manager)

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/marvin-nyalik/StockMate.git
    ```

2. Navigate into the project directory:

    ```bash
    cd StockMate
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and add the following environment variables:

    ```
    PORT=5000
    MONGO_URI=<your-mongo-db-connection-string>
    ```

5. Start the server:

    ```bash
    npm start
    ```

The API should now be running at `http://localhost:5000`.

---

## Usage

### API Endpoints

#### Products

1. **Get all products**  
   `GET /api/products`

   Fetch a list of all products in the inventory.

2. **Get a product by ID**  
   `GET /api/products/:id`

   Retrieve details of a single product using its ID.

3. **Create a new product**  
   `POST /api/products`

   Add a new product to the inventory. (Requires Admin authentication)

4. **Update a product**  
   `PATCH /api/products/:id`

   Update product information (name, stock, category, etc.) by ID. (Requires Admin authentication)

5. **Delete a product**  
   `DELETE /api/products/:id`

   Remove a product from the inventory. (Requires Admin authentication)

#### Stock Management

1. **Update product stock**  
   `PATCH /api/products/:id/stock`

   Modify the stock levels for a specific product.

#### User Authentication

1. **Register a new user**  
   `POST /api/users/register`

   Register a new user for the system.

2. **Login**  
   `POST /api/users/login`

   Authenticate a user and receive a JWT token.

3. **Get user details**  
   `GET /api/users/me`

   Retrieve details of the currently logged-in user.

---

## Technologies

- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for storing product and user information.
- **Mongoose**: ODM for MongoDB, used for schema and data modeling.
- **bcryptjs**: Used for hashing passwords securely.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new feature branch: `git checkout -b my-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin my-feature`.
5. Submit a pull request.

---
## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
