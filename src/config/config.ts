import { Role } from "@models/role.model";
import { User } from "@models/user.model";
import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  username: "",
  password: "",
  database: "demo",
  logging: true,
  models:[Role, User]
});

export default sequelize;
