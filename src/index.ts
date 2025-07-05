import sequelize from "config/config";
import express from "express";
import  {roleRouter } from "routes/role.route";
import { userRouter } from "routes/user.route";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/role", roleRouter);
app.use("/api/users", userRouter);


sequelize.sync({ alter: true }).then(() => {
  app.listen(3000, () => {
    console.log("htttp://localhost:3000");
  });
});
