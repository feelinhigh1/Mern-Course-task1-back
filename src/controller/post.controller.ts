import { Post } from "@models/post.model";
import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
import { DocumentModel } from "@models/document.model";
import { PostImage } from "@models/post-image.model";

class Postcontroller {
  async savePost(req: Request, res: Response) {
    const payload = req.body;

    let slug = payload.title.toLowerCase().split(" ").join("-");
    const alreadyExist: any = await Post.sequelize?.query(
      `select count(slug) from posts b where b.slug like :slug`,
      {
        replacements: { slug: slug + "%" },
        type: QueryTypes.SELECT,
      }
    );
    console.log(alreadyExist);
    const counts = parseInt(alreadyExist[0].count);
    if (counts > 0) {
      slug = slug.concat(`-${+counts + 1}`);
    }
    //saving post
    const post = new Post();
    post.categoryId = payload.categoryId;
    post.title = payload.title;
    post.slug = slug;
    post.description = payload.description;
    post.userId = payload.userId;

    await post.save();

    //mapping document
    const files = req.files as Express.Multer.File[];

    for (let i = 0; i < files.length; i++) {
      const document = new DocumentModel();
      document.size = files[i].size;
      document.mimeType = files[i].mimetype;
      document.originalName = files[i].originalname;
      document.path = files[i].path;
      document.fileName = files[i].filename;

      await document.save();

      const postImage = new PostImage();
      postImage.postId = post.id;
      postImage.documentId = document.docGuid;
      await postImage.save();
    }

    res.send({
      message: "Post has been saved successfully",
      status: true,
      data: post,
    });
  }

  async getAll(req: Request, res: Response) {
    const posts = await Post.findAll({
      attributes: { exclude: ["created_at", "updated_at"] },
    });
    res.send(posts);
  }

  async getPostById(req: Request, res: Response) {
    const postId = req.params.id;
    const post = await Post.findByPk(postId, {
      attributes: { exclude: ["created_at", "updated_at"] },
    });
    res.send(post);
  }

  async deletePostById(req: Request, res: Response) {
    const postId = req.params.id;
    const deletedCount = await Post.destroy({ where: { id: postId } });
    res.send({ deletedCount });
  }

  async getAllPost(req: Request, res: Response) {
    try {
      const path = "http://localhost:3000/uploads/";
      const posts = await Post.sequelize?.query(
        `
      SELECT 
        p.id,
        p.title,
        p.slug,
        p.description,
        c."name" AS category,
        u.email AS userEmail,
        u.username AS user,
        json_agg(CONCAT(:path, d.file_name)) AS images
      FROM posts p
      INNER JOIN categories c ON c.id = p.category_id
      INNER JOIN users u ON u.id = p.posted_by
      LEFT JOIN post_image pi ON pi.post_id = p.id
      LEFT JOIN documents d ON d.doc_guid = pi.document_id::uuid
      GROUP BY p.id, p.title, p.slug, p.description, c."name", u.email, u.username;
      `,
        {
          type: QueryTypes.SELECT,
          replacements: { path },
        }
      );

      res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new Postcontroller();
