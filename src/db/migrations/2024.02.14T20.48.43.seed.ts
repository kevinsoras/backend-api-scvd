import { Migration } from "../scripts/dbMigrate";
import bycript from "bcrypt";

export const up: Migration = async (params) => {
  const password = await bycript.hash(
    'admin',
    Number(process.env["BYCRIPT-SALT"]) ?? ""
  );
  return params.context.query(`
  INSERT INTO users(name, email, password, age, role)
    VALUES ('admin','admin@gmail.com','${password}',99,'admin')
  `);
};
export const down: Migration = async (params) => {
  return params.context.query(`
  DELETE * FROM USERS
  `
  );
};
