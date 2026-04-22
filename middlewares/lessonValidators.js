import { body } from "express-validator";

export const createLessonValidator = [
  body("title").trim().notEmpty().withMessage("title is required").escape(),
  body("content").trim().notEmpty().withMessage("content is required").escape(),
  body("order")
    .notEmpty()
    .withMessage("order is required")
    .isInt({ min: 1 })
    .withMessage("order must be a positive number"),
  body("course")
    .notEmpty()
    .withMessage("course is required")
    .isMongoId()
    .withMessage("course must be a valid id"),
  body("videoUrl")
    .optional()
    .isURL()
    .withMessage("videoUrl must be a valid URL"),
];
export const updateLessonValidator = [
  body("title").optional().trim().escape(),
  body("content").optional().trim().escape(),
  body("order")
    .optional()
    .isInt({ min: 1 })
    .withMessage("order must be a positive number"),
  body("videoUrl")
    .optional()
    .isURL()
    .withMessage("videoUrl must be a valid URL"),
];
