import Comment from "../models/comment.js";
import HttpError from "../utils/httpError.js";
import Lesson from "../models/lesson.js";
export const getComments = async (req, res, next) => {
  try {
    const { lessonId } = req.params;
    const comments = await Comment.find({ lesson: lessonId })
      .populate("user", "name")
      .populate("lesson", "title");
    res
      .status(200)
      .json({ message: "comments fetched successfully", comments });
  } catch (err) {
    next(err);
  }
};
export const createComment = async (req, res, next) => {
  try {
    const { text, lesson } = req.body;
    if (req.user.role !== "student") {
      return next(new HttpError(403, "only students can comment"));
    }
    const lessonExists = await Lesson.findById(lesson);
    if (!lessonExists) {
      return next(new HttpError(404, "lesson not found"));
    }
    const comment = await Comment.create({
      text,
      lesson,
      user: req.user._id,
    });
    await comment.populate("user", "name");
    res.status(201).json({ message: "comment created successfully", comment });
  } catch (err) {
    next(err);
  }
};
export const updateComment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { text } = req.body;
    const comment = await Comment.findById(id);
    if (!comment) {
      return next(new HttpError(404, "comment not found"));
    }
    if (comment.user.toString() !== req.user._id.toString()) {
      return next(new HttpError(403, "not authorized"));
    }
    comment.text = text || comment.text;
    await comment.save();
    await comment.populate("user", "name");
    res.status(200).json({ message: "comment updated successfully", comment });
  } catch (err) {
    next(err);
  }
};
export const deleteComment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findById(id);
    if (!comment) {
      return next(new HttpError(404, "comment not found"));
    }
    if (comment.user.toString() !== req.user._id.toString()) {
      return next(new HttpError(403, "not authorized"));
    }
    await comment.deleteOne();
    res.status(200).json({ message: "comment deleted successfully" });
  } catch (err) {
    next(err);
  }
};
