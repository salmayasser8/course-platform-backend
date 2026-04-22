import { Router } from "express";
import {
  getMyEnrollments,
  deleteEnrollment,
  createEnrollment,
} from "../controllers/enrollmentControllers.js";
import validateResult from "../middlewares/validatorResult.js";
import authMw from "../middlewares/authMw.js";
import { createEnrollmentValidator } from "../middlewares/enrollmentValidators.js";
import upload from "../middlewares/upload.js";
import { idParamsValidator } from "../middlewares/isMongoValidate.js";
const router = Router();
router.get("/", authMw, getMyEnrollments);
router.post(
  "/",
  authMw,
  createEnrollmentValidator,
  validateResult,
  createEnrollment,
);
router.delete("/:id", authMw, idParamsValidator, deleteEnrollment);
export default router;
