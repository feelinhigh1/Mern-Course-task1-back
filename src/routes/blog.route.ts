import { Router } from "express";
import BlogController from "../controller/blog.controller";

const router = Router();

router.get("/", BlogController.getAll);
router.post("/", BlogController.createBlog);
router.get("/:id", BlogController.getBlogById);
router.delete("/:id", BlogController.deleteBlogById);
router.put("/:id", BlogController.updateBlogById);

export { router as blogRouter };
