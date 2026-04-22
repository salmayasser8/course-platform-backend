import User from "../models/user.js";
import jwt from "jsonwebtoken";
import HttpError from "../utils/httpError.js";
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new HttpError(401, "invalid credentials"));
    if (!(await user.comparePassword(password)))
      return next(new HttpError(401, "invalid credentials"));
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXP,
      },
    );
    res.status(200).json({ message: "user authenticated", accessToken });
  } catch (error) {
    next(error);
  }
};
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (user) return next(new HttpError(401, "user already exists"));
    const newUser = await User.create({ name, email, password, role });
    res
      .status(201)
      .json({ message: "user created successfully move to login" });
  } catch (error) {
    next(error);
  }
};
