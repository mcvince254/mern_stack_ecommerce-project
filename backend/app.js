import express from "express";
import product from './routes/productRoutes.js'
import user from './routes/userRoutes.js'
import errorHandleMiddleware from "./middleWare/error.js";
import cookieParser from 'cookie-parser';
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5000",
  process.env.CLIENT_URL,
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

app.use(errorHandleMiddleware);

export default app;