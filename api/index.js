import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// to serve images inside public folder
app.use(express.static("public"));
app.use("/images", express.static("images"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB!!");
  })
  .catch((err) => {
    console.log("Error is: ", err);
  });

app.listen(5000, () => {
  console.log("Server is running on port 5000!!!");
});

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import postRouter from "./routes/posts.route.js";
import draftRouter from "./routes/drafts.route.js";

app.use("/iii/user", userRouter);
app.use("/iii/auth", authRouter);
app.use("/iii/posts", postRouter);
app.use("/iii/drafts", draftRouter);

app.use(function (err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    message,
    statusCode,
    success: false,
  });
});
