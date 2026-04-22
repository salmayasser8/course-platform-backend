import Enrollment from "../models/enrollment.js";
import HttpError from "../utils/httpError.js";
import Course from "../models/course.js";

export const createEnrollment = async (req, res, next) => {
  try {
    if (req.user.role !== "student") {
      return next(new HttpError(403, "only students can enroll in courses"));
    }
    const { course } = req.body;
    const courseExists = await Course.findById(course);
    if (!courseExists) {
      return next(new HttpError(404, "course not found"));
    }
    const existing = await Enrollment.findOne({
      student: req.user._id,
      course,
    });
    if (existing) {
      return next(new HttpError(400, "already enrolled in this course"));
    }
    const enrollment = await Enrollment.create({
      student: req.user._id,
      course,
    });

    res
      .status(201)
      .json({ message: "enrollment created successfully", enrollment });
  } catch (error) {
    next(error);
  }
};
export const getMyEnrollments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({
      student: req.user._id,
    })
      .populate({
        path: "course",
        select: "title instructor thumbnail",
        populate: {
          path: "instructor",
          select: "name email",
        },
      })
      .populate("student", "name");
    res
      .status(200)
      .json({ message: "enrollments fetched successfully", enrollments });
  } catch (error) {
    next(error);
  }
};
export const deleteEnrollment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const enrollment = await Enrollment.findById(id);
    if (!enrollment) {
      return next(new HttpError(404, "enrollment not found"));
    }
    if (enrollment.student.toString() !== req.user._id.toString()) {
      return next(new HttpError(403, "not authorized"));
    }
    await enrollment.deleteOne();
    res.status(200).json({ message: "enrollment deleted successfully" });
  } catch (err) {
    next(err);
  }
};
