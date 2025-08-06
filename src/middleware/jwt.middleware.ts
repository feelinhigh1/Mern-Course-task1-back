import { verifyToken } from "@utils/jwt";
import { NextFunction, Request, Response } from "express";

export const jwtMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("..........................................", req.path);
  const publicPath = ["/api/auth/login"];

  if (publicPath.includes(req.path)) {
    next();
  }

  console.log(req.headers.authorization);
  const token = req.headers.authorization?.split(" ")[1] as string;
  try {
    const verifiedToken = verifyToken(token);
    //@ts-ignore
    req.user = verifiedToken;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized access",
      status: false,
    });
  }
};
