import { Umzug, JSONStorage } from "umzug";
import { pool, query } from "..";
import path from "node:path";
import fs from "node:fs";


const migrator = new Umzug({
  migrations: {
    glob: path.join(__dirname, "..", "migrations", "*.ts"),
  },
  context: { query },
  storage: new JSONStorage({
    path: path.join(__dirname, "..", "migrations", "migrations.json"),
  }),
  logger: console,
  create: {
    template: (filepath) => [
      [filepath, fs.readFileSync(path.join(__dirname, "..", "template", "migration-template.ts")).toString()],
    ],
    folder:path.join(__dirname, "..", "migrations")
  },
});

export type Migration = typeof migrator._types.migration;

migrator
  .runAsCLI()
  .then(() => {
    pool.end();
  })
  .catch((error) => {
    console.log(error);
  });
