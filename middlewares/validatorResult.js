import { validationResult } from "express-validator";
import HttpError from "../utils/httpError.js";

export default (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // ✅ CHANGE THIS: Get the specific messages, don't write "validation error"
    const messages = errors
      .array()
      .map((err) => err.msg)
      .join(". ");
    return next(new HttpError(422, messages));
  }
  next();
};
