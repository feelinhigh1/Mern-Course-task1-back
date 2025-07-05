
// controllers/user.controller.ts
import { Request, Response } from "express";
import { User } from "../models/user.model";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};


export const createUser = async (req: Request, res: Response) => {
  try {
    console.log("POST /api/users body:", req.body);

    const { name, email, username, phone, website, address, company } = req.body;

    const newUser = await User.create({
      name,
      email,
      username,
      phone,
      website,
      address,
      company,
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Server Error" });
  }
}


