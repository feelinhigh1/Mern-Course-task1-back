import { Router } from "express";
import RoleController  from "../controller/role.controller";

const router = Router();

router.get("/", RoleController.getAll);
router.post("/", RoleController.createRole);
router.get("/:id", RoleController.getRoleById);
router.delete("/:id", RoleController.deleteRoleById);
router.put("/:id", RoleController.updateRoleById);  

export {router as roleRouter};