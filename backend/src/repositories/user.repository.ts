import { UpdateResult } from "typeorm";
import connectDB from "../configs/orm.config";
import User from "../entities/user.entity";
type userType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
};
const userRepository = connectDB.getRepository(User);
export const saveUser = async (user: userType) => {
  try {
    const us = await userRepository.create(user);
    console.log(us, "fdf");
    return await userRepository.save(user);
  } catch (err) {
    throw new Error(err);
  }
};

export const findUser = async (email: string) => {
  try {
    return await userRepository.findOneBy({ email: email });
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserById = async (id: number) => {
  try {
    return await userRepository.findOneBy({ id: id });
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUser = async (
  userId: number,
  userInfo: userType
): Promise<UpdateResult> => {
  const updateData: any = {};
  if (typeof userInfo.firstName !== "undefined") {
    updateData.firstName = userInfo.firstName;
  }
  if (typeof userInfo.lastName !== "undefined") {
    updateData.lastName = userInfo.lastName;
  }
  if (typeof userInfo.email !== "undefined") {
    updateData.email = userInfo.email;
  }
  if (typeof userInfo.password !== "undefined") {
    updateData.password = userInfo.password;
  }
  return await userRepository.update({ id: userId }, updateData);
};
