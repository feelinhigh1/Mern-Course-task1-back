import { NextFunction, Request, Response } from "express";

export const exceptionHandler= (error:any,req:Request,res:Response,next:NextFunction) => {
  res.status(error.status || 500).send({
    message: error.message || "internal server error",
    status: false,
  });
}


