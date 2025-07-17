import { Router } from "express";
import CategoryController from "../controller/category.controller";

const router = Router();

router.get("/", CategoryController.getAll);
router.post("/", CategoryController.createCategory);
router.get("/:id", CategoryController.getCategoryById);
router.delete("/:id", CategoryController.deleteCategoryById);
router.put("/:id", CategoryController.updateCategoryById);

export { router as categoryRouter };
