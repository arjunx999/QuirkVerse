import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";  
import postRoutes from "./routes/postRoutes.js";  
import userRoutes from "./routes/userRoutes.js";  
import { PORT } from "./config.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Blog application under construction");
});

// Authentication routes
app.use("/auth", authRoutes);  

// Post routes
app.use("/posts", postRoutes); 

// User routes
app.use("/users", userRoutes); 

mongoose
  .connect("mongodb://localhost:27017/quirkverse")
  .then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  })
  .catch((err) => {
    console.log("Error connecting to database ->", err);
  });
