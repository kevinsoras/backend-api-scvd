import "dotenv";
import { adminClient } from "..";
import fs from 'node:fs'
import path from 'node:path'

const dbName = process.env["PGDATABASE"];

adminClient.connect();

const migrationsFileName ="migrations.json";

//Cerrar conexiones 
adminClient.query(`
SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname='${dbName}';
`,(error)=>{
  if (error) {
    console.error("No se pudo cerrar las conexiones", error.stack);
  } else {
    console.log(`Se cerro las conexiones de la base de datos:"${dbName}"`);
  }
})


adminClient.query(`DROP DATABASE "${dbName}"`, (err) => {
  if (err) {
    console.error("Error al eliminar la base de datos", err.stack);
  } else {
    console.log(`Base de datos "${dbName}" eliminada exitosamente`);
    try {
      fs.unlinkSync(
        path.join(__dirname, "..", "migrations", migrationsFileName)
      );
    } catch {
      console.log(
        "No se pudo eliminar el archivo de migraciones o ya no existe.",
        migrationsFileName
      );
    }
  }

  adminClient.end();
});