import { sign, verify, JwtPayload } from "jsonwebtoken";
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

export const verifyToken = (token: string) => {
  try {
    return verify(token, process.env.JWT_SECRET) as JwtPayload;
  } catch (err) {
    console.log(err);
  }
};
