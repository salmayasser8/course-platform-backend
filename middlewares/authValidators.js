import { body } from "express-validator";
export const registerValidator = [
  body("name").notEmpty().withMessage("name is required"),
  body("email").notEmpty().withMessage("email is required"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters")
    .matches(/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*+\-_])/)
    .withMessage(
      "password must include a letter, a number, and a special character",
    ),
  body("role")
    .notEmpty()
    .withMessage("role is required")
    .isIn(["student", "instructor"])
    .withMessage("role must be student or instructor"),
];
export const loginValidator = [
  body("email").notEmpty().withMessage("email is required"),
  body("password").notEmpty().withMessage("password is required"),
];
