import { Request, Response } from "express";
import { Blog } from "@models/blog.model";

interface IBlogRequest {
  title: string;
  description: string;
  hashtag: string;
  categoryId: number;
  postedBy: number;
}

// 👇 Utility function to auto-generate slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")   // remove special characters
    .replace(/\s+/g, "-");          // replace spaces with hyphens
}
export class BlogController {
  async getAll(req: Request, res: Response) {
    try {
      const blogs = await Blog.findAll({
        attributes: { exclude: ["created_at", "updated_at"] },
      });
      res.send(blogs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blogs", error });
    }
  }

  async createBlog(req: Request, res: Response) {
    try {
      const request: IBlogRequest = req.body;

      const newBlog = new Blog();
      newBlog.title = request.title;
      newBlog.slug = generateSlug(request.title); // auto-generate slug
      newBlog.description = request.description;
      newBlog.hashtag = request.hashtag;
      newBlog.categoryId = request.categoryId;
      newBlog.postedBy = request.postedBy;

      await newBlog.save();
      res.send(newBlog);
    } catch (error) {
      res.status(500).json({ message: "Failed to create blog", error });
    }
  }

  async getBlogById(req: Request, res: Response) {
    try {
      const blog = await Blog.findByPk(req.params.id, {
        attributes: { exclude: ["created_at", "updated_at"] },
      });
      res.send(blog);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog", error });
    }
  }

  async deleteBlogById(req: Request, res: Response) {
    try {
      const deleted = await Blog.destroy({ where: { id: req.params.id } });
      res.send({ deleted });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete blog", error });
    }
  }

  async updateBlogById(req: Request, res: Response) {
    try {
      const request: IBlogRequest = req.body;

      const updated = await Blog.update(
        {
          title: request.title,
          slug: generateSlug(request.title), // re-generate slug on update
          description: request.description,
          hashtag: request.hashtag,
          categoryId: request.categoryId,
          postedBy: request.postedBy,
        },
        { where: { id: req.params.id } }
      );

      res.send({ updated });
    } catch (error) {
      res.status(500).json({ message: "Failed to update blog", error });
    }
  }
}

export default new BlogController();
