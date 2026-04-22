import { Router } from "express";
import { login, register } from "../controllers/authControllers.js";
import {
  loginValidator,
  registerValidator,
} from "../middlewares/authValidators.js";
import validateResult from "../middlewares/validatorResult.js";
const router = Router();

router.post("/login", loginValidator, validateResult, login);
router.post("/register", registerValidator, validateResult, register);
export default router;
