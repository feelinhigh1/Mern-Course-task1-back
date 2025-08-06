import { User } from "@models/user.model";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";

interface IUserRequest {
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
  password: string;
  address: {
    street: string;
    suite?: string;
    city: string;
    zipcode?: string;
  };
  company: {
    name: string;
  };
}

export class UserController {
  async getAll(req: Request, res: Response) {
    const users = await User.findAll({
      attributes: { exclude: ["created_at", "updated_at"] },
    });
    res.send(users);
  }

  async createUser(req: Request, res: Response) {
    const request: IUserRequest = req.body;
    const newUser = await User.create();
    newUser.name = request.name;
    newUser.email = request.email;
    newUser.username = request.username;
    newUser.phone = request.phone;
    newUser.website = request.website;
    newUser.address = request.address;
    const hashpassword = await bcrypt.hash(request.password, 10);
    newUser.password = hashpassword;
    await newUser.save();
    res.send(newUser);
  }

  async getUserById(req: Request, res: Response) {
    const userId = req.params.id;
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["created_at", "updated_at"] },
    });
    res.send(user);
  }

  async deleteUserById(req: Request, res: Response) {
    const userId = req.params.id;
    const deletedCount = await User.destroy({ where: { id: userId } });
    res.send({ deletedCount });
  }

  async updateUserById(req: Request, res: Response) {
    const userId = req.params.id;
    const request: IUserRequest = req.body;
    const [updatedCount] = await User.update(request, {
      where: { id: userId },
    });
    res.send({ updatedCount });
  }
}

export default new UserController();
