// import userController from "@controller/user.controller";
// import { Router } from "express";

// const router = Router();

// router.get("/", userController.getUser);

// export { router as userRouter };

// routes/user.route.ts

// import { Router } from "express";
// import { getAllUsers } from "@controller/user.controller";

// const router = Router();

// router.get("/", getAllUsers);

// export { router as userRouter };

import { Router } from "express";
import { getAllUsers, createUser } from "../controller/user.controller"; 

const router = Router();

router.get("/", getAllUsers);
router.post("/", createUser);

export { router as userRouter };
