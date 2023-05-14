import { Router } from "express";
import {
  authenticatedUser,
  login,
  logout,
  register,
  updatePassword,
  updateUserProfile,
} from "../controllers/auth.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
import {
  getUsers,
  createUser,
  getUser,
  editUser,
  removeUser,
} from "../controllers/user.controller";

const router: Router = Router();
// authentication routes
router.route("/signup").post(register);
router.route("/login").post(login);
router.route("/me").get(isAuthenticated, authenticatedUser);
router.route(`/logout`).post(isAuthenticated, logout);
router.route(`/me`).put(isAuthenticated, updateUserProfile);
router.route(`/password`).put(isAuthenticated, updatePassword);

// Admin user crud routes
router.route(`/`).get(isAuthenticated, getUsers);
router.route(`/`).post(isAuthenticated, createUser);
router.route(`/:id`).get(isAuthenticated, getUser);
router.route(`/:id`).put(isAuthenticated, editUser);
router.route(`/:id`).delete(isAuthenticated, removeUser);
export default router;
