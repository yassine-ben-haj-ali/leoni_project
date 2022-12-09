import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import LoginRoute from "./Routes/Login.js";
import AccountRoute from "./Routes/Account.js";
import ServicesRoute from "./Routes/Services.js";
import FunctionsRoute from "./Routes/Functions.js";
import StagesRoute from "./Routes/Stages.js";
import SortiesRoute from "./Routes/Sorties.js";
import UsersRoute from "./Routes/Users.js";
import RebutRoute from "./Routes/AutorisationRebut.js";
import PersonelRoute from "./Routes/AutorisationPersonel.js";
import SocieteRoute from "./Routes/AutorisationSociete.js";
import MaterielleRoute from "./Routes/Materielles.js";

const app = express();

dotenv.config();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", AccountRoute);
app.use("/", LoginRoute);
app.use("/", ServicesRoute);
app.use("/", FunctionsRoute);
app.use("/", StagesRoute);
app.use("/", SortiesRoute);
app.use("/", UsersRoute);
app.use("/", RebutRoute);
app.use("/", PersonelRoute);
app.use("/", SocieteRoute);
app.use("/", MaterielleRoute);

app.listen(process.env.PORT, () => {
  console.log("serveur start");
});
