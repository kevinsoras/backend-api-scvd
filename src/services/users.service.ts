import * as dbUsers from "../data/users.data";
import { UserData } from "../models/users.schema";
import { ErrorResponse } from "../utils";

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
