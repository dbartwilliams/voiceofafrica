import express from "express";
import { sendMessage } from "../controllers/contactController.js";

const router = express.Router();

// Public route for contact form
router.post("/", sendMessage);

export default router;