import { body } from "express-validator";
export const updateMeValidator = [
  body("name").trim().optional().escape(),
  body("email").trim().optional().isEmail().withMessage("invalid email"),
  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),
];
