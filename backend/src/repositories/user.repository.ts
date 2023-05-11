import connectDB from "../configs/orm.config";
import User from "../entities/user.entity";
type userType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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
