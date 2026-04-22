import mongoose from "mongoose";
const lessonSchema = new mongoose.Schema(
  {
    videoUrl: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Lesson", lessonSchema);
