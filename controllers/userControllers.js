import User from "../models/user.js";
import HttpError from "../utils/httpError.js";
import Course from "../models/course.js";
import Lesson from "../models/lesson.js";
import Enrollment from "../models/enrollment.js";
import Comment from "../models/comment.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const deleteImage = (thumbnail) => {
  if (!thumbnail) return;
  const imagePath = path.join(__dirname, "..", thumbnail);
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }
};
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return next(new HttpError(404, "user not found"));
    }
    res.status(200).json({ message: "user fetched successfully", user });
  } catch (err) {
    next(err);
  }
};
export const updateMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return next(new HttpError(404, "user not found"));
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    await user.save();
    res.status(200).json({ message: "user updated successfully", user });
  } catch (err) {
    next(err);
  }
};
export const deleteMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new HttpError(404, "user not found"));
    }
    if (user.role === "instructor") {
      const courses = await Course.find({ instructor: req.user._id });
      for (const course of courses) {
        deleteImage(course.thumbnail);
        await Lesson.deleteMany({ course: course._id });

        await Enrollment.deleteMany({ course: course._id });
      }
      await Course.deleteMany({ instructor: req.user._id });
    }

    if (user.role === "student") {
      await Enrollment.deleteMany({ student: req.user._id });
      await Comment.deleteMany({ user: req.user._id });
    }
    await user.deleteOne();
    res.status(200).json({ message: "user deleted successfully" });
  } catch (err) {
    next(err);
  }
};
