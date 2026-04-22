import { Router } from "express";
import {
  getAllLessons,
  getLessonsById,
  createLesson,
  updateLesson,
  deleteLesson,
} from "../controllers/lessonControllers.js";
import validateResult from "../middlewares/validatorResult.js";
import authMw from "../middlewares/authMw.js";
import { idParamsValidator } from "../middlewares/isMongoValidate.js";
import {
  createLessonValidator,
  updateLessonValidator,
} from "../middlewares/lessonValidators.js";
const router = Router();
router.get("/", getAllLessons);
router.get("/:id", getLessonsById, idParamsValidator);
router.post("/", authMw, createLessonValidator, validateResult, createLesson);
router.put(
  "/:id",
  authMw,
  updateLessonValidator,
  validateResult,
  updateLesson,
  idParamsValidator,
);
router.delete("/:id", authMw, deleteLesson, idParamsValidator);
export default router;
