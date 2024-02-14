import { NextFunction, Request, Response } from "express"
import { ErrorResponse } from "../utils";


export default function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next:NextFunction
){
  if (error instanceof ErrorResponse) {
    res.status(error.status).json({
      ok: false,
      error: {
        message: error.message,
        details: error.details,
      },
    });
  } else {
    console.log(error)
    res.status(500).json({
      ok: false,
      error: {
        message: "Error of server",
      },
    });
  }
}