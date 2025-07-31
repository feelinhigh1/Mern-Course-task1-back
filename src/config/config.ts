import { Role } from "@models/role.model";
import { User } from "@models/user.model";
import { Category } from "@models/category.model";
import { Sequelize } from "sequelize-typescript";
import { DocumentModel } from "@models/document.model";
import { Post } from "@models/post.model";
import { PostImage } from "@models/post-image.model";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  username: "",
  password: "",
  database: "demo",
  logging: true,
  models:[Role, User, Category, DocumentModel, Post, PostImage]
});

export default sequelize;
