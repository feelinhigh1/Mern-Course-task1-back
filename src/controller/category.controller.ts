import { Category } from "@models/category.model";
import { Request, Response } from "express";

interface ICategoryRequest {
  name: string;
  title: string;
}

export class CategoryController {
  async getAll(req: Request, res: Response) {
    try {
      const categories = await Category.findAll({
        attributes: { exclude: ["created_at", "updated_at"] },
      });
      res.send(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories", error });
    }
  }

  async createCategory(req: Request, res: Response) {
    try {
      const request: ICategoryRequest = req.body;
      const newCategory = new Category();
      newCategory.name = request.name;  
      newCategory.title = request.title;  // ✅ field is 'title' in DB
      await newCategory.save();
      res.send(newCategory);
    } catch (error) {
      res.status(500).json({ message: "Failed to create category", error });
    }
  }

  async getCategoryById(req: Request, res: Response) {
    try {
      const categoryId = req.params.id;
      const category = await Category.findByPk(categoryId, {
        attributes: { exclude: ["created_at", "updated_at"] },
      });
      res.send(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category", error });
    }
  }

  async deleteCategoryById(req: Request, res: Response) {
    try {
      const categoryId = req.params.id;
      const deleted = await Category.destroy({ where: { id: categoryId } });
      res.send({ deleted });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete category", error });
    }
  }

  async updateCategoryById(req: Request, res: Response) {
    try {
      const categoryId = req.params.id;
      const request: ICategoryRequest = req.body;
      const updated = await Category.update(
        {
          name: request.name,
          title: request.title,
        },
        { where: { id: categoryId } }
      );
      res.send({ updated });
    } catch (error) {
      res.status(500).json({ message: "Failed to update category", error });
    }
  }
}

export default new CategoryController();
