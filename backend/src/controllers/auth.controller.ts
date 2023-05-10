import { Request, Response } from "express";
import { registrationValidation } from "../validations/auth.validation";
export const register = (req: Request, res: Response) => {
  const { error } = registrationValidation.validate(req.body);
  if (error) {
    res.status(400).json({
      error: error.details,
      success: false,
    });
  }
  if (req.body.password !== req.body.confirmPassword) {
    res.status(400).json({
      message: "Password do not match!",
      success: false,
    });
  }
  res.status(200).json({
    value: req.body,
  });
};
