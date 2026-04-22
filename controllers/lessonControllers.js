import Lesson from "../models/lesson.js";
import HttpError from "../utils/httpError.js";
import Course from "../models/course.js";
export const getAllLessons = async (req, res, next) => {
  try {
    const { course } = req.query;
    const filter = course ? { course } : {};
    const lessons = await Lesson.find(filter).populate("course", "title");
    res.status(200).json({ message: "lessons fetched successfully", lessons });
  } catch (err) {
    next(err);
  }
};

export const getLessonsById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const lesson = await Lesson.findById(id).populate("course", "title");
    if (!lesson) {
      return next(new HttpError(404, "lesson not found"));
    }
    res.status(200).json({ message: "lesson fetched successfully", lesson });
  } catch (err) {
    next(err);
  }
};

export const createLesson = async (req, res, next) => {
  try {
    const { title, content, order, course, videoUrl } = req.body;

    if (req.user.role !== "instructor") {
      return next(new HttpError(403, "only instructors can create lessons"));
    }
    const existingLesson = await Lesson.findOne({
      title: title.trim(),
      course: course,
    });
    if (existingLesson) {
      return next(
        new HttpError(400, `${title}  lesson already exists in this course`),
      );
    }
    const courseExists = await Course.findById(course);
    if (!courseExists) {
      return next(new HttpError(404, "course not found"));
    }

    if (courseExists.instructor.toString() !== req.user._id.toString()) {
      return next(new HttpError(403, "not authorized"));
    }
    const existingOrder = await Lesson.findOne({
      course,
      order,
    });

    if (existingOrder) {
      return next(
        new HttpError(400, `Order ${order} already exists in this course`),
      );
    }
    const lesson = await Lesson.create({
      title,
      content,
      order,
      course,
      videoUrl: videoUrl || null,
    });
    res.status(201).json({ message: "lesson created successfully", lesson });
  } catch (err) {
    next(err);
  }
};
export const updateLesson = async (req, res, next) => {
  try {
    let id = req.params.id;
    const { title, content, order, videoUrl } = req.body;
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return next(new HttpError(404, "Lesson not found"));
    }
    const course = await Course.findById(lesson.course);
    if (course.instructor.toString() !== req.user._id.toString()) {
      return next(new HttpError(403, "not authorized"));
    }
    // const existingOrder = await Lesson.findOne({
    //   course,
    //   order,
    // });

    // if (existingOrder) {
    //   return next(
    //     new HttpError(400, `Order ${order} already exists in this course`),
    //   );
    // }
    lesson.title = title || lesson.title;
    lesson.content = content || lesson.content;
    lesson.order = order || lesson.order;
    lesson.videoUrl = videoUrl || lesson.videoUrl;
    await lesson.save();
    res.status(200).json({ message: "lesson updated successfully", lesson });
  } catch (err) {
    next(err);
  }
};
export const deleteLesson = async (req, res, next) => {
  try {
    let id = req.params.id;
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return next(new HttpError(404, "Lesson not found"));
    }
    const course = await Course.findById(lesson.course);
    if (course.instructor.toString() !== req.user._id.toString()) {
      return next(new HttpError(403, "not authorized"));
    }
    await lesson.deleteOne();
    res.status(200).json({ message: "lesson deleted successfully" });
  } catch (err) {
    next(err);
  }
};
