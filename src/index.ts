import path from "path";
import sequelize from "config/config";
import express from "express";
import { roleRouter } from "routes/role.route";
import { userRouter } from "routes/user.route";
import { categoryRouter } from "routes/category.route";
import swaggerUIExpress from "swagger-ui-express";
import { swaggerDocs } from "config/swagger";
import cors from "cors";
import { exceptionHandler } from "config/exception-filter";
import { postRouter } from "@routes/post.route";
// import { upload } from "config/multer";

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/role", roleRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/post", postRouter);
app.use("/docs", swaggerUIExpress.serve, swaggerUIExpress.setup(swaggerDocs));
app.use(express.static(path.join(__dirname, "public")));

// app.post(
//   "/api/upload",
//   upload.fields([
//     {
//       name: "file",
//       maxCount: 1,
//     },
//     {
//       name: "image",
//       maxCount: 1,
//     },
//   ]),
//   function (req, res, next) {
//     console.log(req.file);
//   }
// );

app.use(exceptionHandler);

sequelize.sync({ alter: true }).then(() => {
  app.listen(3000, () => {
    console.log("htttp://localhost:3000");
  });
});
