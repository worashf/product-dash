import { Request, Response } from "express";
import * as bcrypt from "bcryptjs";

import {
  saveUser,
  findUser,
  getUserById,
  updateUser,
  findUsers,
  deleteUser,
} from "../repositories/user.repository";

// get all user  => /api/v1/users => get
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await findUsers();
    res.status(200).json({
      users: users.map((u) => {
        const { password, ...user } = u;
        return user;
      }),
      success: true,
    });
  } catch (err) {
    throw new Error("Something went wrong,can not retrive users!");
  }
};

//Admin create regular user => /api/v1/users => post
export const createUser = async (req: Request, res: Response) => {
  try {
    const { role_id, ...userInfo } = req.body;
    let { firstName, lastName, email } = userInfo;
    const hashPassword = await bcrypt.hash("user", 10);

    const existingUser = await findUser(email);
    if (existingUser) {
      res.status(400).json({
        message: `User already created with email ${email}`,
        existing_user: existingUser,
      });
    } else {
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
  } catch (err) {
    throw new Error("Something went wrong, user can not created!");
  }
};

//Admin  get user details  =>  /api/v1/users/:id => get
export const getUser = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    const user = await getUserById(Number(id));
    if (!user) {
      res.status(400).json({
        message: `User not found  with id:  ${id}`,
        success: false,
      });
    } else {
      res.status(200).json({
        user,
        success: true,
      });
    }
  } catch (err) {
    throw new Error("Something went wrong, user can not created!");
  }
};

// Admin update user information  =>  /api/v1/users => put
export const editUser = async (req: Request, res: Response) => {
  try {
    let { role_id, ...userInfo } = req.body;
    let { firstName, lastName, email } = userInfo;
    let { id } = req.params;
    const user = await getUserById(Number(id));
    if (!user) {
      res.status(400).json({
        message: `User not found with id: ${id}, and not updated`,
        success: false,
      });
    } else {
      await updateUser(Number(id), { firstName, lastName, email });

      const { password, ...user } = await getUserById(Number(id));
      res.status(202).json({
        success: true,
        user,
      });
    }
  } catch (err) {
    throw new Error("Something went wrong, user can not updated!");
  }
};

//Admin delete user  => /api/v1/users => delete
export const removeUser = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    const user = await getUserById(Number(id));
    if (!user) {
      res.status(400).json({
        message: `User not found with id: ${id}, and not deleted`,
        success: false,
      });
    } else {
      const user = await deleteUser(Number(id));
      res.status(200).json({
        success: true,
        user,
      });
    }
  } catch (err) {
    throw new Error("Something went wrong, user can not deleted!");
  }
};
