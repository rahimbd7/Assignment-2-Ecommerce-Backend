# Simple E-Commerce Backend Application

Welcome to the backend of my cutting-edge e-commerce platform! This meticulously crafted Express application, powered by TypeScript, seamlessly integrates with MongoDB using Mongoose (ODM), ensuring efficient and scalable data management. With a keen focus on data integrity, my backend employs robust validation techniques utilizing Joi/Zod, guaranteeing that every piece of data is accurate and secure.

## Description

Developed with meticulous attention to detail, my Express application utilizes TypeScript as the programming language of choice, leveraging its strong typing capabilities for enhanced code quality and reliability. The integration with MongoDB via Mongoose facilitates seamless data management, enabling efficient storage and retrieval of crucial information vital to my e-commerce platform's operations.

Data integrity is paramount to me, and to ensure the utmost accuracy and security, I've implemented rigorous validation mechanisms using industry-leading tools like Joi/Zod. This ensures that every piece of data entering my system meets stringent criteria, safeguarding against potential inconsistencies or security vulnerabilities.

Embracing best practices in code formatting and organization, I've employed Prettier and ESLint to maintain clean, consistent, and easily maintainable code. My codebase is meticulously structured, following a modular pattern that separates concerns into services, controllers, and routes, enhancing readability, scalability, and maintainability.

## Endpoints

### Products

- **GET /api/products**
  - Retrieve all products or filter by search term.
- **GET /api/products?searchTerm=iphone**
  - Retrieve all products match with the provide query params
- **POST /api/products**
  - Add a new product.
- **GET /api/products/:productId**
  - Retrieve a single product by its ID.
- **PUT /api/products/:productId**
  - Update details of a single product.
- **DELETE /api/products/:productId**
  - Delete a single product.

### Orders

- **GET /api/orders**
  - Retrieve all orders
- **GET /api/orders?email=level2@programming-hero.com**
  - Retrieve all orders match with the provided email query params
- **POST /api/orders**
  - Add a new order.

## How to Use

1. Clone the repository.
2. Install dependencies: `npm install`
3. Run the server: `npm start`
4. Utilize the provided endpoints to interact with the application.


## [GitHub Repository Link](https://github.com/rahimbd7/Assignment-2-Ecommerce-Backend)!
Explore the codebase and contribute to my project on 


## [Live Deployment Link: ](https://assignment-02-beta.vercel.app/)
Experience my e-commerce platform in action on the live deployment 


