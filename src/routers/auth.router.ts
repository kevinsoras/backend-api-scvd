import { NextFunction, Request, Response, Router } from "express";
import { validateSchema } from "../middlewares/ValidateSchema";
import { UserAuth, UsersAuthSchema } from "../models/users.schema";
import { loginAccount } from "../services/users.service";
import { SuccessResponse } from "../utils";

const auth = Router();
// Configura multer para manejar archivos adjuntos

auth.post(
  "/login",
  validateSchema(UsersAuthSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: UserAuth = req.body;
    try {
      const token = await loginAccount(userData);
      res.status(200).json(new SuccessResponse(true, { token: token }));
    } catch (error) {
      next(error);
    }
    } catch (error) {
      next(error);
    }
  }
);
export default auth;
