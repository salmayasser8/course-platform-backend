import { body } from "express-validator";
export const createEnrollmentValidator = [
  body("course")
    .trim()
    .notEmpty()
    .withMessage("course is required")
    .isMongoId()
    .withMessage("invalid course id"),
];
