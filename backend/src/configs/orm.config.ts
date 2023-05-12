import { DataSource } from "typeorm";
import dotenv from "dotenv";

import User from "../entities/user.entity";
dotenv.config();
console.log(
  process.env.DB_HOST,
  process.env.DB_PORT,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  process.env.DB_NAME
);
const connectDB = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  synchronize: true,
  entities: [User],
});

export default connectDB;
