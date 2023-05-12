import app from "./app";
import connectDB from "./configs/orm.config";
import { config } from "dotenv";

// load configuration environment variable
config();
// Create connection with database
connectDB
  .initialize()
  .then(() => {
    console.log(
      `Datasource  has been initialied at  host ${process.env.DB_HOST} on database port ${process.env.DB_PORT}`
    );
  })
  .catch((err) => {
    console.error(`Data Source initialization error`, err);
  });
app.listen(process.env.APP_PORT, () => {
  console.log(
    `Application started on ${process.env.APP_HOST} at port ${process.env.APP_PORT}`
  );
});
