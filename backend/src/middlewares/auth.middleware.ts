import { Request, Response, NextFunction } from "express";

import { verifyToken } from "../utils/jwt.token";
import { getUserById } from "../repositories/user.repository";
export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["token"];
    if (token) {
      const { id } = verifyToken(token);
      const { password, ...user } = await getUserById(id);
      req["user"] = user;
      next();
    } else {
      res.status(401).json({
        message: "unauthenticated user, token not found!",
        success: false,
      });
    }
  } catch (err) {
    res.status(401).json({
      message: "unauthenticated user",
      success: false,
      err,
    });
  }
};
