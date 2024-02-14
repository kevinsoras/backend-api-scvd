import express from "express";
import "dotenv/config";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env["PORT_API"] || 3000;

app.listen(port, () => {
  console.log(`Inicio en el puerto ${port}`);
});