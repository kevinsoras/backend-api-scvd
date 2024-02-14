import * as dbUsers from "../data/users.data";
import { UserAuth, UserData } from "../models/users.schema";
import { ErrorResponse } from "../utils";
import { Jwt } from "../utils/Jwt";
import bycript from "bcrypt";

export const insertListUsers = async (users: UserData[]) => {
  try {
    const successUsers: any[] = [];
    const errorsUsers: any[] = [];

    // Creando listas de promesas
    const promises = users.map((user) => {
      return dbUsers
        .insertUser(user)
        .then((result) => successUsers.push(...result))
        .catch((error: any) =>
          errorsUsers.push({
            row: user.order,
            details: {
              insertion:
                error.code === "23505"
                  ? "Hay un valor unico que se esta duplicando."
                  : "Error en la fila de inserción.",
            },
          })
        );
    });
    // Espera a que todas las promesas se completen
    await Promise.allSettled(promises);
    
    return {successUsers,errorsUsers};
  } catch (error: any) {
    if (error instanceof ErrorResponse) throw error;
    console.log(error);
    console.log(error["details"]);
    throw new ErrorResponse("Error inserting list of users", 400);
  }
};
export const loginAccount = async (data: UserAuth) => {
  try {
    const dataUser = await dbUsers.getUserForLogin(data.email);
    const matchPassword = await bycript.compare(
      data.password,
      dataUser["password"]
    );
    if (!matchPassword) throw new ErrorResponse("Credencials Incorrect", 400);
    
    const jwt = new Jwt(process.env["JWT-KEY"] ?? "");
    const token = jwt.generateToken({
      id: dataUser["id"],
      role: dataUser["role"],
    });
    
    return token;
  } catch (error) {
    throw new ErrorResponse("Credencials Incorrect", 401);
  }
};