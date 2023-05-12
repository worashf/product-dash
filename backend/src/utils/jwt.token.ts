import { sign } from "jsonwebtoken";
import { config } from "dotenv";

// load enviroment variables
config();
export const generateJwtToken = (payload: object) => {
  try {
    return sign(payload, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err);
  }
};
