import { Role } from "@models/role.model";
import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  username: "",
  password: "",
  database: "demo",
  logging: true,
  models:[Role]
});

export default sequelize;
