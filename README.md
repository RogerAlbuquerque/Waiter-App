# Waiter App

## Overview

Waiter App is a fullstack project that connects three application layers in a single repository:

- `api`: backend in Node.js/Express with MongoDB and WebSocket
- `fe`: web application in React for the kitchen team
- `app`: mobile application in React Native / Expo for waiter use

The main goal is to provide a restaurant service flow: the waiter registers orders in the mobile app, the backend stores and distributes those orders, and the kitchen monitors and updates order statuses in real time.

## System architecture

### General structure

- `api/`: REST + WebSocket service responsible for managing categories, products and orders
- `fe/`: web dashboard to view orders by status and control the production flow
- `app/`: mobile app to create orders from available categories and products

### Data flow

1. The `app` queries categories and products from the backend.
2. The waiter selects a table, products, and confirms the order.
3. The backend stores the order in MongoDB and emits an event via `socket.io`.
4. The `fe` receives the event in real time and updates the orders dashboard.
5. The kitchen team changes the order status in `fe` or cancels it, and the backend persists that change.

## Backend (`api`)

### Main responsibilities

- Connect to MongoDB using `mongoose`
- Expose REST routes for categories, products, and orders
- Receive image uploads for products with `multer`
- Serve static image files through `/uploads`
- Emit real-time events with `socket.io`

### Important endpoints

- `GET /categories` — lists all categories
- `POST /categories` — creates a new category
- `GET /products` — lists all products
- `POST /products` — creates a product with image upload
- `DELETE /products/:productId` — removes a product
- `GET /categories/:categoryId/products` — lists products by category
- `GET /orders` — lists all orders
- `POST /orders` — creates a new order
- `PATCH /orders/:orderId` — updates the order status
- `DELETE /orders/:orderId` — cancels an order

### Domain models

- `Category`: name and icon
- `Product`: name, description, image, price, ingredients and category reference
- `Order`: table, status, creation date and list of products with quantities

### Technical notes

- The MongoDB connection is defined by `process.env.MONGODB_URI`.

---

## Web app (`fe`)

### Purpose

Administrative dashboard for the kitchen to monitor and manage orders.

### Core behavior

- Queries orders via API and keeps a local orders list
- Connects to the backend through WebSocket to receive new orders in real time
- Displays orders grouped by status: `WAITING`, `IN_PRODUCTION`, `DONE`
- Allows opening the order modal, changing status, and canceling orders
- Updates the local UI state without reloading the page

### Important notes

- The frontend uses `import.meta.env.VITE_API_URI` to configure the API endpoint.
- In `OrderModal`, there is a hardcoded image URL: `https://waiterapp-api.onrender.com/uploads/...`, which may cause environment inconsistencies.
- The application uses `react-toastify` for visual feedback on completed actions.

---

## Mobile app (`app`)

### Purpose

Application for the waiter to create orders and send them to the backend.

### Core behavior

- Loads categories and products in parallel on startup
- Filters products by selected category
- Allows selecting a table and building a cart of items
- Displays the order total and item quantities
- Sends the order to the backend via `POST /orders`
- Shows a confirmation modal after submission

### Important notes

- The mobile app uses `process.env.URI_API` to configure the API base URL.
- Product images are loaded via a URL based on the returned `imagePath` field.

## Technologies used

### Backend

- Node.js
- Express
- TypeScript
- Mongoose
- MongoDB
- Multer
- Socket.io
- dotenv
- nodemon

### Web frontend

- React
- TypeScript
- Vite
- Axios
- Styled-components
- react-toastify
- socket.io-client

### Mobile

- React Native
- Expo
- Axios
- Styled-components
- Expo Font

## Directory organization

- `api/`
  
  - `src/index.ts`: entry point, initializes Express, MongoDB and Socket.io
  - `src/router.ts`: defines routes and upload middleware
  - `src/app/models`: data models
  - `src/app/useCases`: domain CRUD logic
  - `uploads/`: folder for images uploaded via API

- `fe/`
  
  - `src/App.tsx`: entry point of the web UI
  - `src/components`: UI components and orders dashboard
  - `src/utils/api.ts`: configured Axios client
  - `src/types`: TypeScript types

- `app/`
  
  - `App.tsx`: Expo entry point
  - `src/Main`: main waiter screen
  - `src/components`: mobile interface components
  - `src/utils/api.ts`: mobile Axios client
  - `src/types`: mobile data types

## Installation and execution

### Prerequisites

- Node.js
- Yarn or npm
- MongoDB running locally or with Docker
- Expo CLI for the mobile application

### Backend

```bash
cd api
yarn install
# or npm install
```

Configure environment variable:

```env
MONGODB_URI=mongodb://localhost:27017/waiterapp
```

Start:

```bash
yarn dev
# or npm run dev
```

### Web frontend

```bash
cd fe
yarn install
# or npm install
```

Configure environment variable in `fe/.env` or equivalent:

```env
VITE_API_URI=http://localhost:3001
```

Start:

```bash
yarn dev
# or npm run dev
```

### Mobile

```bash
cd app
yarn install
# or npm install
```

Configure environment variable in `app/.env` or Expo environment file:

```env
URI_API=http://localhost:3001
```

Start:

```bash
yarn start
# or npm run start
```

## Usage examples

- The waiter opens the mobile app, chooses a table, adds items to the cart, and confirms the order.
- The kitchen views the order on the web dashboard in `Waiting queue`.
- When starting production, the kitchen changes the order to `In preparation`.
- When the order is ready, the kitchen changes it to `Done` or cancels the order.

## Possible future improvements

- Centralize environment variables and remove hardcoded URLs from the frontend.
- Add authentication to separate waiter and kitchen credentials.
- Implement more robust error handling in API calls.
- Add OpenAPI/Swagger documentation for the backend.
- Use cloud file storage instead of the local `uploads` folder.
- Standardize how clients consume the API to ensure environment compatibility.

## Final notes

This is an MVP of a restaurant order system, focused on waiter and kitchen integration. The architecture is simple and modular, allowing the backend, web dashboard, and mobile app to evolve independently.
