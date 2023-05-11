import { Request, Response } from "express";
import * as bcrypt from "bcryptjs";
import { registrationValidation } from "../validations/auth.validation";
import { saveUser, findUser } from "../repositories/user.repository";

export const register = async (req: Request, res: Response) => {
  const { error } = registrationValidation.validate(req.body);
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    if (password !== confirmPassword) {
      res.status(400).json({
        message: "Password do not match!",
        success: false,
      });
    }
    const existingUser = await findUser(email);
    if (existingUser) {
      res.status(400).json({
        message: "Email already taken",
      });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await saveUser({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPassword,
      });

      res.status(201).json({
        user,
        success: true,
      });
    }

    if (error) {
      res.status(400).json({
        error: error.details,
        success: false,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};
