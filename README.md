# x-code-test

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## Table of Contents

- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Seeding the Database](#seeding-the-database)
- [API Overview](#api-overview)

---

## Setup

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Configure environment variables:**

   - Copy `.env.example` to `.env` (if provided) and fill in required values.
   - At minimum, ensure your MongoDB connection string is set:

     ```
     MONGODB_URI=your_mongodb_connection_string
     MONGO_DB_NAME=Dbname

     and make sure that MONGODB_URI without dbname
     ```

3. **Run the development server:**

   ```sh
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

- `MONGODB_URI` – MongoDB connection string (required) without db name.
- `MONGO_DB_NAME` - Db Name (required)

---

## Available Scripts

- `npm run dev` – Start the development server.
- `npm run build` – Build the application for production.
- `npm start` – Start the production server.

---

## Seeding the Database

To seed the database with mock data, use the seeder API endpoint:

- **Endpoint:** `POST /api/seeder`

**Example using `curl`:**

```sh
curl -X POST http://localhost:3000/api/seeder
```

This will:

- Clear all previous data from the `CATEGORY`, `STATUS`, and `PRODUCTS` collections.
- Insert mock data for categories, statuses, and products.

---

## API Overview

### 1. List Products

- **Endpoint:** `GET /api/products`
- **Description:** Returns a list of all products.
- **Sample Request:**
  ```
  GET http://localhost:3000/api/products
  ```
- **Response:**  
  `200 OK`
  ```json
  [
    {
      "_id": "productId",
      "name": "Product Name",
      "category": "CategoryId",
      "status": "StatusId",
      "price": 100
    }
  ]
  ```

### 2. Get Product by ID

- **Endpoint:** `GET /api/products/[id]`
- **Description:** Returns a single product by its ID.
- **Sample Request:**
  ```
  GET http://localhost:3000/api/products/PRODUCT_ID
  ```
- **Response:**  
  `200 OK`
  ```json
  {
    "_id": "productId",
    "name": "Product Name",
    "category": "CategoryId",
    "status": "StatusId",
    "price": 100
  }
  ```

### 3. Create Product

- **Endpoint:** `POST /api/products/create`
- **Request Body:** (JSON)
  ```json
  {
    "name": "Product Name",
    "category": "CategoryId",
    "status": "StatusId",
    "price": 100
  }
  ```
- **Response:**
  - `201 Created` on success
  - `400 Bad Request` if validation fails

### 4. Update Product

- **Endpoint:** `PUT /api/products/[id]`
- **Request Body:** (JSON)
  ```json
  {
    "name": "Updated Name",
    "category": "CategoryId",
    "status": "StatusId",
    "price": 120
  }
  ```
- **Response:**
  - `200 OK` on success
  - `404 Not Found` if product does not exist

### 5. Delete Product

- **Endpoint:** `DELETE /api/products/[id]`
- **Description:** Deletes a product by its ID.
- **Sample Request:**
  ```
  DELETE http://localhost:3000/api/products/PRODUCT_ID
  ```
- **Response:**
  - `200 OK` on success
  - `404 Not Found` if product does not exist

### 6. Seed Data

- **Endpoint:** `POST /api/seeder`
- **Description:** Clears and seeds the database with mock data.
- **Response:**
  - `201 Created` with success message
  - `500 Internal Server Error` on failure

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

---

## Deploy

Deploy easily on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).
