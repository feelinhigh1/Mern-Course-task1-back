import { NextFunction, Request, Response } from "express";

export const exceptionHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Exception caught:", error);
  res.status(error?.statusCode || 500).json({
    message: error?.message || "internal server error",
    status: false,
  });
};
