import { query } from "../db";
import { UserData } from "../models/users.schema";

export const insertListUsers = async (
  users: UserData[]
): Promise<any | undefined> => {
  const parameters = ["name", "email", "age"];
  const values: any[] = [];
  let placeholders: any[] = [];
  let index = 1;
  for (const user of users) {
    values.push(user.name, user.email, user.age || null);
    placeholders.push(`($${index}, $${index + 1}, $${index + 2})`) ;
    index += 3;
  }
  //Se construye el query
  let queryT = `
  INSERT INTO 
  users(${parameters.join(",")}) 
  VALUES ${placeholders.join(",")}
  RETURNING id,name,email,age
  `;
  return (await query(queryT, values)).rows;
};
export const insertUser = async (user: UserData): Promise<any | undefined> => {
  const parameters = ["name", "email", "age"];
  const values: any[] = [user.name, user.email, user.age || null];
  
  //Se construye el query
  let queryT = `
    INSERT INTO 
    users(${parameters.join(",")}) 
    VALUES ($1, $2, $3)
    RETURNING id,name,email,age
  `;
  
  return (await query(queryT, values)).rows;
};
export const getUserForLogin = async (email: string) => {
  let queryT = `SELECT id,password,role FROM users where email=$1`;
  const result = await query(queryT, [email]);
  return result.rows[0];
};