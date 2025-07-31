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
      document.originalName = files[i].originalname
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
      data: post
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

}

export default new Postcontroller();