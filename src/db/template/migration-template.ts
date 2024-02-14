import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  return params.context.query(`
  
  `);
};
export const down: Migration = async (params) => {
  return params.context.query(`
  
  `
  );
};
