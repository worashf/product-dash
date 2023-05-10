import express, { Request, Response } from "express";
import cors from "cors";
import authRoute from "./routes/auth.route";
const app = express();
const options: Object = {
  origin: "http://localhost:3000",
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(options));

//Enable routes fro the application
app.use("/api", authRoute);

export default app;
