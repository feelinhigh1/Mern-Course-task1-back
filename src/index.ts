import sequelize from "config/config";
import express from "express";
import  {roleRouter } from "routes/role.route";
import { userRouter } from "routes/user.route";
import { categoryRouter } from "routes/category.route";
import swaggerUIExpress from "swagger-ui-express";
import { swaggerDocs } from "config/swagger";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/role", roleRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use('/docs',swaggerUIExpress.serve, swaggerUIExpress.setup(swaggerDocs));


sequelize.sync({ alter: true }).then(() => {
  app.listen(3000, () => {
    console.log("htttp://localhost:3000");
  });
});
