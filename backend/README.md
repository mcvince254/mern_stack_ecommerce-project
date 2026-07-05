# MERN Stack E-Commerce Platform

A full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Project Status

🚧 **Under Active Development**

This project is currently being developed and tested. Features are being implemented incrementally, and APIs may change as development progresses.

---

## Features

### Authentication & Authorization
- User Registration
- User Login
- JWT Authentication
- Secure Password Hashing with bcrypt
- Role-Based Authorization (Admin/User)
- Password Reset via Email

### Product Management
- Create Products
- Update Products
- Delete Products
- Product Listings
- Product Details

### Order Management
- Place Orders
- Order History
- Order Tracking

### Payments
- Razorpay Integration
- Secure Payment Verification

### Additional Features
- Email Notifications
- Cookie-Based Authentication
- MongoDB Atlas Integration
- RESTful API Architecture

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Nodemailer
- Cookie Parser
- CORS

### Frontend
- React.js
- Axios
- React Router

### Deployment
- Render
- MongoDB Atlas

---

## Project Structure

```text
MERN_STACK_ECOMMERCE/
│
├── backend/
│   │
│   ├── config/
│   │   ├── db.js
│   │   └── config.env
│   │
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── productController.js
│   │   └── orderController.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── catchAsyncErrors.js
│   │   └── error.js
│   │
│   ├── models/
│   │   ├── userModel.js
│   │   ├── productModel.js
│   │   └── orderModel.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   │
│   ├── utils/
│   │   ├── sendEmail.js
│   │   ├── jwtToken.js
│   │   └── errorHandler.js
│   │
│   ├── app.js
│   └── server.js
│
├── frontend/
│
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

## Environment Variables

Create a `.env` file in the project root or configure these variables in your deployment platform.

### Example

```env
PORT=3000

DB_URL=mongodb+srv://username:password@cluster.mongodb.net/onlinestore

JWT_SECRET_KEY=your_jwt_secret_key
JWT_EXPIRE=7d

COOKIE_EXPIRE=7

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SERVICE=gmail

SMTP_MAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password

FRONTEND_URL=http://localhost:5173
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/mern-stack-ecommerce.git
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

---

## API Base URL

### Local Development

```text
http://localhost:3000/api/v1
```

### Production

```text
https://your-render-url.onrender.com/api/v1
```

---

## Deployment

### Backend
- Render

### Database
- MongoDB Atlas

---

## Security Features

- Password Hashing using bcryptjs
- JWT Authentication
- HTTP-Only Cookies
- Protected Routes
- Environment Variable Management
- Input Validation

---

## Current Development Roadmap

- [x] MongoDB Atlas Integration
- [x] User Authentication
- [x] Password Reset Functionality
- [x] Email Service Integration
- [ ] Product CRUD Operations
- [ ] Shopping Cart
- [ ] Order Processing
- [ ] Payment Gateway Integration
- [ ] Admin Dashboard
- [ ] Frontend Development
- [ ] Automated Testing

---

## Author

**Vincent Charagu**

GitHub: https://github.com/mcvince254

---

## License

This project is for educational and portfolio purposes.