import { CsvError, parse } from "csv-parse";
import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";
import { UserData } from "../models/users.schema";
import { ErrorResponse } from "../utils";
import path from "path";

export function validateCsv<T>(schema: ZodSchema<T>) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (!req.files || !("file" in req.files)) {
        return next(new ErrorResponse("No se ha adjuntado ningún archivo CSV.",400))
      }
      // Acceder al archivo adjunto
      const files = req.files as
        | { file: File[] }
        | { [fieldname: string]: Express.Multer.File[] };

      const file = files.file[0] as Express.Multer.File;
      
      if(path.extname(file.originalname) !== ".csv"){
        return next(new ErrorResponse("El archivo debe tener la extension CSV.",415));
      }
      // Función para validar una fila del CSV
      parse(file.buffer, { delimiter: ",", columns: true }, handleRows);
    } catch (error) {
      next(new Error("Error al obtener el archivo."));
    }

    function handleRows(err: CsvError | undefined, listRows: any): void {
      const successUsers: Record<string, any>[] = [];
      const errorUsers: Record<string, any>[] = [];
      if (err) {
        return next(new ErrorResponse("Error al leer el archivo CSV.",404));
      }
      listRows.forEach((row: UserData, index: number) => {
        try {
          //Reescribir age 
          row.age=row.age || undefined
          const user = schema.parse(row) as UserData;
          successUsers.push({...user,order:index+1});
        } catch (error) {
          const detailsError: Record<string, any> = {};
          if (error instanceof ZodError) {
            error.errors.forEach((err) => {
              const fieldName = err.path.join("");
              const errorMessage = err.message;
              detailsError[fieldName] = errorMessage;
            });
          } else {
            detailsError["error"] = "No se pudo leer ningun dato de la fila";
          }
          errorUsers.push({ row: index+1, details: detailsError });
        }
      });
      req.body.usersSucces = successUsers;
      req.body.usersError = errorUsers;
      next();
    }
  };
}
