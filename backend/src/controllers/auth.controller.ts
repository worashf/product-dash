import { Request, Response } from "express";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { registrationValidation } from "../validations/auth.validation";
import {
  saveUser,
  findUser,
  getUserById,
  updateUser,
} from "../repositories/user.repository";
import { generateJwtToken } from "../utils/jwt.token";
export const register = async (req: Request, res: Response) => {
  let { firstName, lastName, email, password, confirmPassword } = req.body;
  password = password.toString();
  confirmPassword = confirmPassword.toString();
  console.log(
    typeof password,
    typeof confirmPassword,
    password === confirmPassword
  );

  try {
    const { error } = registrationValidation.validate({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });
    if (error) {
      res.status(400).json({
        error: error.details,
        success: false,
      });
    } else {
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
    }
  } catch (err) {
    res.status(400).json({
      error: err,
      success: false,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await findUser(email);
  if (!user) {
    res.status(400).json({
      success: false,
      message: "Invalid credentials, user not found",
    });
  } else {
    bcrypt
      .compare(password, user.password)
      .then((result: any) => {
        if (result) {
          const token = generateJwtToken({ id: user.id });
          res
            .status(200)
            .cookie("token", token, {
              maxAge: 24 * 60 * 60 * 1000, // 1day
            })
            .json({
              success: true,
              user,
              token,
            });
        } else {
          res.status(400).json({
            success: false,
            message: "Invalid credentials, password not matched!",
          });
        }
      })
      .catch((err: any) => {
        throw new Error(err);
      });
  }
};

export const authenticatedUser = async (req: Request, res: Response) => {
  res.status(200).json({
    user: req["user"],
    success: true,
  });
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("token", null, { maxAge: 0 });
  res.status(200).json({
    message: "Logout successfully!",
    seccuss: true,
  });
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req["user"];
    const { firstName, lastName, email } = req.body;
    await updateUser(id, { firstName, lastName, email });

    const { password, ...user } = await getUserById(id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    throw new Error(err);
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { id } = req["user"];
    let { password, oldPassword, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      res.status(400).json({
        message: "Password do not match!",
        success: false,
      });
    } else {
      const user = await getUserById(id);

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        res.status(400).json({
          success: false,
          message: "Old password is incorect",
        });
      } else {
        await updateUser(id, { password: await bcrypt.hash(password, 10) });
        res.status(200).json({
          success: true,
          user,
        });
      }
    }
  } catch (err) {
    throw new Error(err);
  }
};
