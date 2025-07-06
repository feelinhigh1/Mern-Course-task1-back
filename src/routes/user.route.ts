// src/routes/user.route.ts

import { Router } from "express";
import { UserController } from "../controller/user.controller"; 

const router = Router();

router.get("/", UserController.getAll);
router.post("/", UserController.createUser);
router.delete("/:id", UserController.deleteUserById);  

export { router as userRouter };
