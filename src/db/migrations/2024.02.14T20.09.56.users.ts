import { Migration } from "../scripts/dbMigrate";
import bycript from "bcrypt";

export const up: Migration = async (params) => {
  const password = await bycript.hash(
    'supersecret',
    Number(process.env["BYCRIPT-SALT"]) ?? ""
  );
  return params.context.query(`
  CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(300) DEFAULT('${password}') NOT NULL CHECK(LENGTH(password)>=6),
    age INT CHECK(age>0),
    role VARCHAR(50) NOT NULL DEFAULT('user') CHECK(role='user' or role='admin')
  );
  `);
};
export const down: Migration = async (params) => {
  return params.context.query(`
  DROP TABLE users;
  `
  );
};
