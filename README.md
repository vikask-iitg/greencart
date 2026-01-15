# 🛒 Full-Stack Grocery Delivery Website (MERN Stack)

A **production-ready grocery delivery e-commerce platform** built using the **MERN stack (MongoDB, Express, React, Node.js)**.  
This project supports **user shopping**, a **secure seller dashboard**, **online payments with Stripe**, and **cloud deployment on Vercel**.

---

## 🚀 Features Overview

### 👤 User Features
- Browse grocery products by category
- View detailed product pages
- Add, update, and remove items from cart
- Manage multiple delivery addresses
- Place orders using:
  - 💵 Cash on Delivery (COD)
  - 💳 Online Payment (Stripe)
- View order history with full details
- Secure authentication (JWT + HTTP-only cookies)
- Product search by name and category
- Fully responsive UI using Tailwind CSS

---

### 🧑‍💼 Seller Dashboard
- Secure seller login (credentials via environment variables)
- Add products with **multiple image uploads**
- Images stored securely on **Cloudinary**
- Manage product stock (in-stock / out-of-stock)
- View all customer orders with shipping & product details
- Seller logout with session invalidation

---

### 🔐 Authentication & Authorization
- JWT-based authentication
- Tokens stored in **HTTP-only cookies**
- Separate middleware for **users** and **sellers**
- Protected routes for sensitive actions

---

### 💳 Payments
- Stripe Checkout integration
- Secure online payments
- Stripe Webhooks for payment verification
- Automatic order status update on payment success
- Cart cleared after successful payment

---

## 🧱 Tech Stack

### Frontend
- React
- React Router
- Context API
- Tailwind CSS
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt (password hashing)
- Multer (file uploads)

### Third-Party Services
- **Stripe** – Online payments
- **Cloudinary** – Image storage
- **MongoDB Atlas** – Cloud database
- **Vercel** – Frontend & backend deployment

---

## 🧠 Architecture Highlights

| Layer        | Description |
|-------------|-------------|
| Frontend    | React SPA with global state using Context API |
| Backend     | RESTful APIs using Express |
| Database    | MongoDB with Mongoose ORM |
| Auth        | JWT stored in HTTP-only cookies |
| Payments    | Stripe Checkout + Webhooks |
| Images      | Multer + Cloudinary |
| Deployment  | Vercel (frontend & backend) |

---

## 📦 API Endpoints

### User APIs
| Endpoint | Method | Description |
|--------|--------|-------------|
| `/api/user/register` | POST | Register new user |
| `/api/user/login` | POST | User login |
| `/api/user/logout` | GET | Logout user |
| `/api/user/is` | GET | Check user session |

### Seller APIs
| Endpoint | Method | Description |
|--------|--------|-------------|
| `/api/seller/login` | POST | Seller login |
| `/api/seller/logout` | GET | Seller logout |
| `/api/seller/is` | GET | Check seller session |

### Product APIs
| Endpoint | Method | Description |
|--------|--------|-------------|
| `/api/product/add` | POST | Add new product |
| `/api/product/list` | GET | Get all products |
| `/api/product/id` | POST | Get product by ID |
| `/api/product/stock` | POST | Update stock status |

### Cart & Address
| Endpoint | Method | Description |
|--------|--------|-------------|
| `/api/cart/update` | POST | Update user cart |
| `/api/address/add` | POST | Add address |
| `/api/address/get` | GET | Get user addresses |

### Order APIs
| Endpoint | Method | Description |
|--------|--------|-------------|
| `/api/order/cod` | POST | Place COD order |
| `/api/order/stripe` | POST | Place Stripe order |
| `/api/order/user` | GET | Get user orders |
| `/api/order/seller` | GET | Get all seller orders |

### Stripe Webhook
| Endpoint | Method | Description |
|--------|--------|-------------|
| `/stripe` | POST | Handle Stripe events |

---

## 🔐 Security Best Practices
- Passwords hashed using **bcrypt**
- JWT stored in **HTTP-only cookies**
- Strict CORS configuration
- Sensitive data stored in environment variables
- Seller credentials never stored in database
- Stripe keys and webhook secrets secured

---

## 🌍 Deployment
- **Frontend:** Vercel
- **Backend:** Vercel (Serverless functions)
- **Database:** MongoDB Atlas
- **Images:** Cloudinary
- **Payments:** Stripe

---

## 🛠️ Environment Variables

```env
# Backend
MONGO_URI=
JWT_SECRET=
SELLER_EMAIL=
SELLER_PASSWORD=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Frontend
VITE_BACKEND_URL=
VITE_STRIPE_PUBLISHABLE_KEY=
