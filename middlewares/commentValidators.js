import { body } from "express-validator";
export const createCommentValidator = [
  body("text").trim().notEmpty().withMessage("comment is required").escape(),
  body("lesson")
    .trim()
    .notEmpty()
    .withMessage("lesson is required")
    .isMongoId()
    .withMessage("invalid lesson id"),
];
export const updateCommentValidator = [body("text").trim().optional().escape()];
