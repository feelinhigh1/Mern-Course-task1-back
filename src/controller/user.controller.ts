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

  static async deleteUserById(req:Request, res:Response) {
    const userId = req.params.id;
    const deleteUserById = await User.destroy({ where: { id: userId } });
    res.send({ deleteUserById });
  }
}
