# MinimalStore - Full-Stack E-Commerce Platform

A complete, responsive e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js). It features secure user authentication, a dynamic shopping cart, and a dedicated admin dashboard for managing inventory and tracking customer orders.

**Live Demo:** [https://minimall-ecom.onrender.com](https://minimall-ecom.onrender.com)

## Features

**For Customers:**
* **Modern Storefront:** Responsive product catalog built with Tailwind CSS.
* **Shopping Cart:** Dynamic cart with quantity adjustments and total calculation.
* **User Authentication:** Secure login and registration using JSON Web Tokens (JWT) and bcrypt.
* **Order History:** Dedicated portal for customers to track their past purchases and delivery status.

**For Administrators:**
* **Role-Based Access:** Protected routes that only users with `isAdmin` privileges can access.
* **Inventory Management:** Full CRUD (Create, Read, Update, Delete) capabilities for products.
* **Order Tracking:** Centralized dashboard to view all customer orders, monitor payment status, and track deliveries.

## Tech Stack

* **Frontend:** React (Vite), Tailwind CSS, Lucide React (Icons), Axios, React Router v6.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB, Mongoose ODM.
* **Security & Auth:** JSON Web Tokens (JWT), bcryptjs.
* **Deployment:** Render (Monorepo setup: Express serves the static React build).

## Local Development Setup

### Prerequisites
Make sure you have Node.js and MongoDB installed on your local machine.

### 1. Clone the repository
`git clone https://github.com/Farhan-Shaikh-25/Ecommerce.git`
`cd ECommerce`

### 2. Install Dependencies
Because this is a monorepo, you need to install dependencies for both the frontend and backend.

**Backend:**
`cd backend`
`npm install`

**Frontend:**
`cd ../frontend`
`npm install`

### 3. Environment Variables
Create a `.env` file in the `backend` folder and add the following variables:

`NODE_ENV=development`
`PORT=5000`
`MONGO_URI=your_mongodb_connection_string`
`JWT_SECRET=your_secret_key`

### 4. Run the Application
Open two terminal windows to run both servers concurrently:

**Terminal 1 (Backend):**
`cd backend`
`npm run server`

**Terminal 2 (Frontend):**
`cd frontend`
`npm run dev`

The app will be running at `http://localhost:5173`.

## Deployment (Render)

This application is configured to be deployed as a single Web Service on Render. The Express server is set up to serve the static frontend build in production.

**Build Command:**
`cd backend && npm install && cd ../frontend && npm install && npm run build`

**Start Command:**
`cd backend && node server.js`

## Roadmap & Future Enhancements

* Integration of a payment gateway (Razorpay/Stripe) for real-time checkout.
* Implementation of image file uploads using Multer and Cloudinary.
* Product review and rating system.

---
**Author:** Farhan Shaikh
