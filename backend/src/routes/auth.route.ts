import { Router } from "express";
import {
  authenticatedUser,
  login,
  logout,
  register,
} from "../controllers/auth.controller";

const router: Router = Router();

router.route("/signup").post(register);
router.route("/login").post(login);
router.route("/me").get(authenticatedUser);
router.route(`/logout`).post(logout);

export default router;
