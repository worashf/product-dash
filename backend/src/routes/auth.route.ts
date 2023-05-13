import { Router } from "express";
import {
  authenticatedUser,
  login,
  logout,
  register,
} from "../controllers/auth.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router: Router = Router();

router.route("/signup").post(register);
router.route("/login").post(login);
router.route("/me").get(isAuthenticated, authenticatedUser);
router.route(`/logout`).post(isAuthenticated, logout);

export default router;
