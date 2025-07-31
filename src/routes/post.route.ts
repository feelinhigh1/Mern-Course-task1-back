import { upload } from "@config/multer";
import postController from "@controller/post.controller";
import express from "express";

const router = express.Router();

router.get("/", postController.getAll);
router.get("/:id", postController.getPostById);
router.delete("/:id", postController.deletePostById);

router.post("/", upload.array("files", 10), postController.savePost);

export { router as postRouter };