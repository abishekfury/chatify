import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllContacts , getMessageByUserId, sendMessage, getChatPartners} from "../controllers/message.controller.js";
import { arcjetProtection } from './../middleware/arcjet.middleware.js';

const router = express.Router();

// Apply Arcjet protection and authentication middleware to all routes
router.use(arcjetProtection, protectRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessageByUserId);
router.post("/send/:id", sendMessage);

export default router;