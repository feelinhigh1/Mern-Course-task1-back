import { Router } from "express";
import RoleController from "../controller/role.controller";

const router = Router();

router.get("/", RoleController.getAll);
/**
 * @openapi
 * /role:
 *   get:
 *     summary: Get all roles
 *     tags:
 *       - Role
 *     responses:
 *       200:
 *         description: List of roles
 */

router.post("/", RoleController.createRole);
/**
 * @openapi
 * /role:
 *   post:
 *     summary: Create a new role
 *     tags:
 *       - Role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Role created successfully
 */

router.get("/:id", RoleController.getRoleById);
/**
 * @openapi
 * /role/{id}:
 *   get:
 *     summary: Get a role by ID
 *     tags:
 *       - Role
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Role details
 */


router.delete("/:id", RoleController.deleteRoleById);

/**
 * @openapi
 * /role/{id}:
 *   delete:
 *     summary: Delete a role by ID
 *     tags:
 *       - Role
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Role deleted successfully
 */

router.put("/:id", RoleController.updateRoleById);

/**
 * @openapi
 * /role/{id}:
 *   put:
 *     summary: Update a role by ID
 *     tags:
 *       - Role
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Role updated successfully
 */




export { router as roleRouter };
