import { plainToInstance } from "class-transformer";
import { LoginDto } from "./../dto/auth.dto";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { NotFoundException } from "@exception/NotFoundException";
import { User } from "@models/user.model";
import * as bcrypt from "bcrypt";
import { generateToken } from "@utils/jwt";

export class AuthController {
  async login(req: Request, res: Response) {
    const LoginDot = plainToInstance(LoginDto, req.body);
    // console.log(LoginDot);

    const error = await validate(LoginDot);
    console.log(error);
    if (error.length > 0) {
      res.status(400).json({
        message: "Validation failed",
        errors: error,
      });
    } else {
      const user = await User.findOne({
        where: {
          email: LoginDot.email,
        },
      });
      if (!user) {
        throw new NotFoundException("User not found");
      }
      const isvalidPassword = await bcrypt.compare(
        LoginDot.password,
        user.password || ""
      );
      if (!isvalidPassword) {
        throw new NotFoundException("Password did not match");
      }
      const token = generateToken({ id: user.id, email: user.email });
      res.send({
        message: "Login successful",
        token,
      });
    }
  }
}

export default new AuthController();
