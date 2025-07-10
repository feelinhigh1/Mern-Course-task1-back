// controllers/user.controller.ts
import { Request, Response } from "express";
import { User } from "../models/user.model";

export class UserController {
  static async getAll(req: Request, res: Response) {
    const users = await User.findAll();
    res.json(users);
  }

  static async createUser(req: Request, res: Response) {
    const { name, email, username, phone, website, address, company } = req.body;
    const newUser = await User.create({ name, email, username, phone, website, address, company });
    res.status(201).json(newUser);
  }

  static async getUserById(req: Request, res: Response) {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User not found");
    }
  }

  static async deleteUserById(req:Request, res:Response) {
    const userId = req.params.id;
    const deleteUserById = await User.destroy({ where: { id: userId } });
    res.send({ deleteUserById });
  }

  static async updateUserById(req: Request, res: Response) {
    const userId = req.params.id;
    const { name, email, username, phone, website, address, company } = req.body;
    const [updated] = await User.update(
      { name, email, username, phone, website, address, company },
      { where: { id: userId } }
    );
    if (updated) {
      const updatedUser = await User.findByPk(userId);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).send("User not found");
    }
  }
}
