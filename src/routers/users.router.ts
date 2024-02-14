import { NextFunction, Request, Response, Router } from "express";
import { validateCsv } from "../middlewares/ValidateScv";
import { UsersDataSchema } from "../models/users.schema";
import multer from "multer";
import { jwtValidation } from "../middlewares/JwtValidation";
import { validateUserRole } from "../middlewares/ValidateRoles";
import { insertListUsers } from "../services/users.service";
import { SuccessResponse } from "../utils";

const users = Router();
// Configura multer para manejar archivos adjuntos
const upload = multer();

users.post(
  "/upload",
  jwtValidation(),
  validateUserRole(["admin"]),
  upload.fields([{ name: "file", maxCount: 1 }]),
  validateCsv(UsersDataSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { usersSucces:usersSuccesCsv, usersError:usersErrorCsv } = req.body;
      const {successUsers,errorsUsers} = await insertListUsers(usersSuccesCsv);
      const listErrors=[...usersErrorCsv,...errorsUsers]
      //Ordenar errores
      listErrors.sort((a,b)=>a['row']-b['row'])
      res.status(200).json(
        new SuccessResponse(true, {
          success: successUsers,
          errors: listErrors,
        })
      );
    } catch (error) {
      next(error);
    }
  }
);
export default users;
