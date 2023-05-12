import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.route";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

//Enable routes fro the application
app.use("/api/v1/users", authRoute);

export default app;
