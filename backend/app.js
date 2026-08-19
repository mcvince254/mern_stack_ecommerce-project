import express from "express";
import product from './routes/productRoutes.js'
import user from './routes/userRoutes.js'
import order from './routes/orderRoutes.js'
import errorHandleMiddleware from "./middleWare/error.js";
import cookieParser from 'cookie-parser';
import cors from "cors";
import fileUpload from 'express-fileupload'
import {v2 as cloudinary} from 'cloudinary'

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload())

const allowedOrigins = [
  "http://localhost:4300",
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "https://mern-stack-ecommerce-project-wine.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: false,
  })
);

app.get("/", (req, res) => {
  res.send("E-commerce API is running");
});

app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1',order)

app.use(errorHandleMiddleware);

export default app;