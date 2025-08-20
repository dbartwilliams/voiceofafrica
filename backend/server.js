import dotenv from "dotenv";
dotenv.config();

import express from "express"
import path from 'path';  
import cors from "cors";
import { fileURLToPath } from 'url'; 
import connectDB from "./config/db.js";
import {
  errorResponserHandler,
  invalidPathHandler,
} from "./middleware/errorHandler.js";



// API Routes JS Files
import userRoutes from "./routes/userRoutes.js";
import contactUsRoutes from "./routes/contactUsRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import postCategoriesRoutes from "./routes/postCategoriesRoutes.js";

// ES Modules fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();
const app = express();


// =======================
// Essential Middleware
// =======================
app.use(express.json()); // Parse JSON bodies
app.use(cors());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Static files configuration
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "public/images")));

// =======================
// API Routes
// =======================
app.use("/api/users", userRoutes);
app.use("/api/contact", contactUsRoutes);
app.use("/api/post-categories", postCategoriesRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/posts", postRoutes);



// =======================
// Custom Error Handlers
// =======================
app.use(invalidPathHandler);
app.use(errorResponserHandler);



// =======================
// Dev Server Start
// =======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT: ${PORT}`
  );
});