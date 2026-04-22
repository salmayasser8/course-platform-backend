import { body } from "express-validator";
export const createCourseValidator = [
  body("title").trim().notEmpty().withMessage("title is required").escape(),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("description is required")
    .escape(),
  body("price")
    .notEmpty()
    .withMessage("price is required")
    .isFloat({ min: 0 })
    .withMessage("price must be a positive number"),
  body("category")
    .trim()
    .notEmpty()
    .withMessage("category is required")
    .escape(),
];
export const updateCourseValidator = [
  body("title").optional().trim().escape(),
  body("description").optional().trim().escape(),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("price must be a positive number"),
  body("category").optional().trim().escape(),
];
