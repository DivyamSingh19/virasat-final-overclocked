import express from "express";
import { createComment, getCommentsByPost, updateComment, deleteComment } from "../controllers/commentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const commentRouter = express.Router();

commentRouter.post("/", protect, createComment);
commentRouter.get("/:postId", getCommentsByPost);
commentRouter.put("/:id", protect, updateComment);
commentRouter.delete("/:id", protect, deleteComment); 

export default commentRouter;
 