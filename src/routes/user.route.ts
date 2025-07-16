import { Router } from "express";
import UserController from "@controller/user.controller";

const router = Router();

router.get("/", UserController.getAll);
router.post("/", UserController.createUser);
router.get("/:id", UserController.getUserById);
router.delete("/:id", UserController.deleteUserById);
router.put("/:id", UserController.updateUserById);

export { router as userRouter };
