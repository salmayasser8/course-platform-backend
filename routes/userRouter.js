import { Router } from "express";
import authMW from "../middlewares/authMw.js";
import { getMe, updateMe, deleteMe } from "../controllers/userControllers.js";
import validateResult from "../middlewares/validatorResult.js";
import { updateMeValidator } from "../middlewares/userMiddlewares/userValidators.js";
import { idParamsValidator } from "../middlewares/isMongoValidate.js";
const router = Router();
router.get("/me", authMW, getMe);
router.put(
  "/me",
  authMW,
  updateMeValidator,
  validateResult,
  updateMe,
  idParamsValidator,
);
router.delete("/me", authMW, deleteMe);
export default router;
