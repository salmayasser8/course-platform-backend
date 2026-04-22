import Course from "../models/course.js";
import HttpError from "../utils/httpError.js";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const deleteImage = (thumbnail) => {
  if (!thumbnail) return;
  const imagePath = path.join(__dirname, "..", thumbnail);
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }
};
export const createCourse = async (req, res, next) => {
  try {
    if (req.user.role !== "instructor") {
      return next(new HttpError(403, "only instructors can create courses"));
    }
    const { title, description, price, category } = req.body;
    const existingCourse = await Course.findOne({
      title: title.trim(),
      instructor: req.user._id,
    });
    if (existingCourse) {
      return next(new HttpError(400, ` ${title} course already exists `));
    }
    const thumbnail = req.file ? `/uploads/${req.file.filename}` : null;
    const course = await Course.create({
      title,
      description,
      instructor: req.user._id,
      price,
      category,
      thumbnail,
    });
    res.status(201).json({ message: "course created successfully", course });
  } catch (error) {
    next(error);
  }
};
export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    res.status(200).json({ message: "courses fetched successfully", courses });
  } catch (err) {
    next(err);
  }
};
export const getCourseById = async (req, res, next) => {
  try {
    let id = req.params.id;
    const course = await Course.findById(id).populate(
      "instructor",
      "name email",
    );
    if (!course) {
      return next(new HttpError(404, "course not found"));
    }
    res.status(200).json({ message: "course fetched successfully", course });
  } catch (err) {
    next(err);
  }
};
export const updateCourse = async (req, res, next) => {
  try {
    let id = req.params.id;
    const { title, description, price, category } = req.body;
    const course = await Course.findById(id);
    if (!course) {
      return next(new HttpError(404, "course not found"));
    }
    //check authorization
    if (course.instructor.toString() !== req.user._id.toString()) {
      return next(new HttpError(403, "not authorized"));
    }
    if (req.file && course.thumbnail) {
      deleteImage(course.thumbnail);
    }
    if (req.file) {
      course.thumbnail = `/uploads/${req.file.filename}`;
    }
    course.title = title || course.title;
    course.description = description || course.description;
    course.price = price || course.price;
    course.category = category || course.category;
    await course.save();
    res.status(200).json({ message: "course updated successfully", course });
  } catch (err) {
    next(err);
  }
};
export const deleteCourse = async (req, res, next) => {
  try {
    let id = req.params.id;
    const course = await Course.findById(id);
    if (!course) {
      return next(new HttpError(404, "course not found"));
    }
    if (course.instructor.toString() !== req.user._id.toString()) {
      return next(new HttpError(403, "not authorized"));
    }
    deleteImage(course.thumbnail);
    await course.deleteOne();
    res.status(200).json({ message: "course deleted successfully" });
  } catch (err) {
    next(err);
  }
};
