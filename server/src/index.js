//package import
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRouter from "./routers/auth.route.js";

const app = express();

//middleware

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

//health check route
app.get("/api", (_req, res) => {
  return res.status(200).json({ message: "Server is running" });
});

//routers
app.use("/api/auth", authRouter);

//not found middleware
app.use((_req, res, _next) => {
  res.status(404).json({ message: "Not Found" });
});

//port
const port = process.env.PORT || 4500;

app.listen(port, async () => {
  console.log("Server is started at: ", port);
  connectDB();
});
