// models/user.model.ts
import { DataTypes } from "sequelize";
import sequelize from "../config/config";

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  username: DataTypes.STRING,
  phone: DataTypes.STRING,
  website: DataTypes.STRING,
  address: DataTypes.JSON,   // address as JSON object
  company: DataTypes.JSON,   // company as JSON object
},{
  timestamps: true, // adds createdAt and updatedAt fields
});


