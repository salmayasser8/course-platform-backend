import { Router } from "express";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/commentControllers.js";
import authMW from "../middlewares/authMw.js";
import validateResult from "../middlewares/validatorResult.js";
import {
  createCommentValidator,
  updateCommentValidator,
} from "../middlewares/commentValidators.js";
import { idParamsValidator } from "../middlewares/isMongoValidate.js";
const router = Router();
router.get("/:lessonId", getComments, idParamsValidator);
router.post("/", authMW, createCommentValidator, validateResult, createComment);
router.put(
  "/:id",
  authMW,
  updateCommentValidator,
  validateResult,
  idParamsValidator,
  updateComment,
);
router.delete("/:id", authMW, idParamsValidator, deleteComment);
export default router;
