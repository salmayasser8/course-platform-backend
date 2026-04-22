import { Router } from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseControllers.js";
import validateResult from "../middlewares/validatorResult.js";
import authMw from "../middlewares/authMw.js";
import {
  createCourseValidator,
  updateCourseValidator,
} from "../middlewares/courseValidators.js";
import upload from "../middlewares/upload.js";
import { idParamsValidator } from "../middlewares/isMongoValidate.js";
const router = Router();
router.get("/", getAllCourses);
router.get("/:id", getCourseById, idParamsValidator);
router.post(
  "/",
  authMw,
  upload.single("thumbnail"),
  createCourseValidator,
  validateResult,
  createCourse,
);
router.put(
  "/:id",
  authMw,
  upload.single("thumbnail"),
  updateCourseValidator,
  validateResult,
  updateCourse,
  idParamsValidator,
);
router.delete("/:id", authMw, deleteCourse, idParamsValidator);

export default router;
