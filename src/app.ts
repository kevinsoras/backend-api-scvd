import express from "express";
import "dotenv/config";
import cors from "cors";
import users from "./routers/users.router";
import errorHandler from "./middlewares/Error";
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cors());

const port = process.env["PORT_API"] || 3000;
app.use(users)
app.use(errorHandler)
app.listen(port, () => {
  console.log(`Inicio en el puerto ${port}`);
});
