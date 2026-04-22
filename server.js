import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
dotenv.config();
const MONGO_URL = process.env.MONGO_URL;
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("connection error");
    console.log(error);
  });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
