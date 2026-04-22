import { param } from "express-validator";

export const idParamsValidator = [
  param("id")
    .notEmpty()
    .withMessage("missing param")
    .isMongoId()
    .withMessage("invalid id format"),
];
